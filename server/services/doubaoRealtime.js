import WebSocket from "ws";
import zlib from "node:zlib";
import crypto from "node:crypto";

const DOUBAO_REALTIME_URL = "wss://openspeech.bytedance.com/api/v3/realtime/dialogue";
const MSG_WITH_EVENT = 0b0100;
const CLIENT_FULL_REQUEST = 0b0001;
const CLIENT_AUDIO_ONLY_REQUEST = 0b0010;
const JSON_SERIALIZATION = 0b0001;
const NO_SERIALIZATION = 0b0000;
const GZIP = 0b0001;
const NO_COMPRESSION = 0b0000;

const events = {
  START_CONNECTION: 1,
  FINISH_CONNECTION: 2,
  START_SESSION: 100,
  FINISH_SESSION: 102,
  AUDIO: 200,
  SAY_HELLO: 300,
  CHAT_TTS_TEXT: 500,
  TTS_RESPONSE: 352,
  TTS_ENDED: 359,
  ASR_RESPONSE: 451,
  CHAT_RESPONSE: 550,
  CHAT_ENDED: 559
};

function doubaoConfig() {
  return {
    appId: process.env.DOUBAO_APP_ID || "",
    accessKey: process.env.DOUBAO_ACCESS_KEY || process.env.DOUBAO_ACCESS_TOKEN || "",
    appKey: process.env.DOUBAO_APP_KEY || "PlgvMymc7f3tQnJ6",
    resourceId: process.env.DOUBAO_RESOURCE_ID || "volc.speech.dialog",
    url: process.env.DOUBAO_REALTIME_URL || DOUBAO_REALTIME_URL
  };
}

export function doubaoRealtimeStatus() {
  const config = doubaoConfig();
  const missing = [];
  if (!config.appId) missing.push("DOUBAO_APP_ID");
  if (!config.accessKey) missing.push("DOUBAO_ACCESS_KEY");
  if (!config.appKey) missing.push("DOUBAO_APP_KEY");
  return {
    configured: missing.length === 0,
    missing,
    resourceId: config.resourceId,
    url: config.url
  };
}

export function checkDoubaoRealtimeConnection() {
  const config = doubaoConfig();
  const status = doubaoRealtimeStatus();
  if (!status.configured) {
    return Promise.resolve({
      ok: false,
      stage: "config",
      message: `缺少配置：${status.missing.join("、")}`,
      ...status
    });
  }

  return new Promise((resolve) => {
    const startedAt = Date.now();
    const requestId = `ai-practice-${Date.now()}`;
    const socket = new WebSocket(config.url, {
      headers: {
        "X-Api-App-ID": config.appId,
        "X-Api-Access-Key": config.accessKey,
        "X-Api-App-Key": config.appKey,
        "X-Api-Resource-Id": config.resourceId,
        "X-Api-Connect-Id": requestId
      }
    });
    const timer = setTimeout(() => {
      socket.terminate();
      resolve({
        ok: false,
        stage: "timeout",
        message: "连接超时，请检查豆包实时语音权限、网络或资源 ID。",
        ...status
      });
    }, 6000);

    socket.once("open", () => {
      const sessionId = crypto.randomUUID();
      socket.send(frame({ event: events.START_CONNECTION }));
      socket.send(frame({ event: events.START_SESSION, sessionId, payload: { dialog: { bot_name: process.env.DOUBAO_BOT_NAME || "小参" } } }));
    });

    socket.on("message", (raw) => {
      let parsed;
      try {
        parsed = parseFrame(raw);
      } catch (error) {
        clearTimeout(timer);
        socket.close();
        resolve({ ok: false, stage: "protocol", message: error.message || "解析豆包响应失败", ...status });
        return;
      }
      if (parsed?.error) {
        clearTimeout(timer);
        socket.close();
        resolve({ ok: false, stage: "session", message: parsed.error, ...status });
        return;
      }
      if (parsed?.event === 150) {
        clearTimeout(timer);
        socket.close();
        resolve({
          ok: true,
          stage: "session",
          latencyMs: Date.now() - startedAt,
          message: "服务端已能完成豆包实时语音 StartConnection + StartSession。",
          ...status
        });
      }
    });

    socket.once("error", (error) => {
      clearTimeout(timer);
      resolve({
        ok: false,
        stage: "websocket",
        message: error.message || "豆包实时语音连接失败",
        ...status
      });
    });
  });
}

function header({ messageType = CLIENT_FULL_REQUEST, serialization = JSON_SERIALIZATION, compression = GZIP } = {}) {
  return Buffer.from([
    (1 << 4) | 1,
    (messageType << 4) | MSG_WITH_EVENT,
    (serialization << 4) | compression,
    0
  ]);
}

function frame({ event, sessionId = "", payload = {}, audio = null, messageType = CLIENT_FULL_REQUEST }) {
  const isAudio = audio instanceof Buffer;
  const payloadBytes = isAudio
    ? zlib.gzipSync(audio)
    : zlib.gzipSync(Buffer.from(JSON.stringify(payload), "utf8"));
  const session = Buffer.from(sessionId, "utf8");
  return Buffer.concat([
    header({
      messageType,
      serialization: isAudio ? NO_SERIALIZATION : JSON_SERIALIZATION,
      compression: GZIP
    }),
    u32(event),
    session.length ? u32(session.length) : Buffer.alloc(0),
    session,
    u32(payloadBytes.length),
    payloadBytes
  ]);
}

function u32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32BE(value >>> 0, 0);
  return buffer;
}

function parseFrame(raw) {
  const buffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);
  if (buffer.length < 4) return null;
  const headerSize = (buffer[0] & 0x0f) * 4;
  const messageType = buffer[1] >> 4;
  const flags = buffer[1] & 0x0f;
  const serialization = buffer[2] >> 4;
  const compression = buffer[2] & 0x0f;
  let offset = headerSize;
  if (messageType === 0b1111) {
    const code = buffer.length >= offset + 4 ? buffer.readUInt32BE(offset) : 0;
    offset += 4;
    const errorLength = buffer.length >= offset + 4 ? buffer.readUInt32BE(offset) : 0;
    offset += 4;
    const errorPayload = buffer.subarray(offset, offset + errorLength).toString("utf8");
    let error = errorPayload;
    try {
      error = JSON.parse(errorPayload).error || errorPayload;
    } catch {
      // keep raw error text
    }
    return { messageType, errorCode: code, error };
  }
  const event = flags & MSG_WITH_EVENT ? buffer.readUInt32BE(offset) : 0;
  if (flags & MSG_WITH_EVENT) offset += 4;

  let sessionId = "";
  if (buffer.length >= offset + 4) {
    const sessionLength = buffer.readUInt32BE(offset);
    offset += 4;
    if (sessionLength > 0 && buffer.length >= offset + sessionLength) {
      sessionId = buffer.subarray(offset, offset + sessionLength).toString("utf8");
      offset += sessionLength;
    }
  }
  if (buffer.length < offset + 4) return { event, sessionId, messageType, payload: null };
  const payloadLength = buffer.readUInt32BE(offset);
  offset += 4;
  let payload = buffer.subarray(offset, offset + payloadLength);
  if (event === events.TTS_RESPONSE) {
    return { event, sessionId, messageType, audio: payload };
  }
  if (compression === GZIP && payload.length) payload = zlib.gunzipSync(payload);
  if (serialization === JSON_SERIALIZATION && payload.length) {
    try {
      return { event, sessionId, messageType, payload: JSON.parse(payload.toString("utf8")) };
    } catch {
      return { event, sessionId, messageType, payload: payload.toString("utf8") };
    }
  }
  return { event, sessionId, messageType, payload };
}

function sendClient(client, payload) {
  if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(payload));
}

function clientPayloadFromServerFrame(data) {
  if (!data) return null;
  if (data.event === events.TTS_RESPONSE && data.audio) {
    return { type: "audio", event: data.event, audio: data.audio.toString("base64"), mime: "audio/ogg" };
  }
  const text = data.payload?.content || data.payload?.text || data.payload?.response || "";
  const eventName = ({
    50: "connection_started",
    51: "connection_failed",
    52: "connection_finished",
    150: "session_started",
    152: "session_finished",
    153: "session_failed",
    350: "tts_sentence_start",
    351: "tts_sentence_end",
    359: "tts_ended",
    450: "asr_info",
    451: "asr_response",
    550: "chat_response",
    559: "chat_ended"
  })[data.event] || `event_${data.event}`;
  return { type: "event", event: data.event, name: eventName, text, payload: data.payload || null };
}

export function createDoubaoRealtimeBridge(client) {
  const config = doubaoConfig();
  const status = doubaoRealtimeStatus();
  if (!status.configured) {
    sendClient(client, { type: "error", message: `缺少配置：${status.missing.join("、")}` });
    client.close();
    return;
  }

  const sessionId = crypto.randomUUID();
  let doubao = null;
  let started = false;
  let audioChunks = [];
  let currentPrompt = "";

  function connect() {
    doubao = new WebSocket(config.url, {
      headers: {
        "X-Api-App-ID": config.appId,
        "X-Api-Access-Key": config.accessKey,
        "X-Api-App-Key": config.appKey,
        "X-Api-Resource-Id": config.resourceId,
        "X-Api-Connect-Id": `ai-practice-${Date.now()}`
      }
    });
    doubao.on("open", () => {
      doubao.send(frame({ event: events.START_CONNECTION }));
      doubao.send(frame({
        event: events.START_SESSION,
        sessionId,
        payload: {
          dialog: {
            bot_name: process.env.DOUBAO_BOT_NAME || "小参",
            system_role: currentPrompt || undefined
          }
        }
      }));
      started = true;
      sendClient(client, { type: "ready", sessionId });
    });
    doubao.on("message", (raw) => {
      let parsed;
      try {
        parsed = parseFrame(raw);
      } catch (error) {
        sendClient(client, { type: "error", message: error.message || "解析豆包响应失败" });
        return;
      }
      const payload = clientPayloadFromServerFrame(parsed);
      if (!payload) return;
      if (payload.type === "audio") {
        audioChunks.push(payload.audio);
        sendClient(client, payload);
        return;
      }
      if (payload.event === events.TTS_ENDED && audioChunks.length) {
        sendClient(client, { type: "audio_end", mime: "audio/ogg", chunks: audioChunks });
        audioChunks = [];
      }
      sendClient(client, payload);
    });
    doubao.on("error", (error) => sendClient(client, { type: "error", message: error.message || "豆包实时语音连接异常" }));
    doubao.on("close", () => sendClient(client, { type: "closed" }));
  }

  client.on("message", (raw, isBinary) => {
    if (isBinary) {
      if (doubao?.readyState === WebSocket.OPEN && started) {
        doubao.send(frame({ event: events.AUDIO, sessionId, audio: Buffer.from(raw), messageType: CLIENT_AUDIO_ONLY_REQUEST }));
      }
      return;
    }
    let event;
    try {
      event = JSON.parse(raw.toString());
    } catch {
      return;
    }
    if (event.type === "start") {
      currentPrompt = String(event.prompt || "");
      connect();
      return;
    }
    if (event.type === "say" && doubao?.readyState === WebSocket.OPEN) {
      doubao.send(frame({ event: events.SAY_HELLO, sessionId, payload: { content: String(event.content || "") } }));
      return;
    }
    if (event.type === "tts" && doubao?.readyState === WebSocket.OPEN) {
      doubao.send(frame({ event: events.CHAT_TTS_TEXT, sessionId, payload: { start: true, end: true, content: String(event.content || "") } }));
      return;
    }
    if (event.type === "end" && doubao?.readyState === WebSocket.OPEN) {
      doubao.send(frame({ event: events.FINISH_SESSION, sessionId }));
      doubao.send(frame({ event: events.FINISH_CONNECTION }));
      doubao.close();
    }
  });

  client.on("close", () => {
    if (doubao?.readyState === WebSocket.OPEN) doubao.close();
  });
}
