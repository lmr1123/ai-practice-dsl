import crypto from "node:crypto";
import WebSocket from "ws";

const XFYUN_HOST = "iat-api.xfyun.cn";
const XFYUN_PATH = "/v2/iat";
const XFYUN_URL = `wss://${XFYUN_HOST}${XFYUN_PATH}`;

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env ${name}`);
  return value;
}

function buildAuthUrl() {
  const apiKey = requireEnv("XFYUN_API_KEY");
  const apiSecret = requireEnv("XFYUN_API_SECRET");
  const date = new Date().toUTCString();
  const signatureOrigin = `host: ${XFYUN_HOST}\ndate: ${date}\nGET ${XFYUN_PATH} HTTP/1.1`;
  const signatureSha = crypto.createHmac("sha256", apiSecret).update(signatureOrigin).digest("base64");
  const authorizationOrigin = `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signatureSha}"`;
  const authorization = Buffer.from(authorizationOrigin).toString("base64");
  const search = new URLSearchParams({ authorization, date, host: XFYUN_HOST });
  return `${XFYUN_URL}?${search.toString()}`;
}

function sendClient(client, payload) {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(payload));
  }
}

function normalizeXunfeiText(data) {
  const words = data?.data?.result?.ws || [];
  return words.map((item) => item.cw?.map((cw) => cw.w).join("") || "").join("");
}

function currentTextFromSegments(segments) {
  return Array.from(segments.entries())
    .sort(([left], [right]) => Number(left) - Number(right))
    .map(([, text]) => text)
    .join("");
}

export function createXunfeiAsrBridge(client) {
  let xfyun = null;
  let started = false;
  let closedByClient = false;
  let accumulatedText = "";
  const segments = new Map();

  try {
    xfyun = new WebSocket(buildAuthUrl());
  } catch (error) {
    sendClient(client, { type: "error", message: error.message });
    client.close();
    return;
  }

  xfyun.on("open", () => {
    sendClient(client, { type: "ready" });
  });

  xfyun.on("message", (raw) => {
    let payload;
    try {
      payload = JSON.parse(raw.toString());
    } catch {
      return;
    }
    if (payload.code !== 0) {
      sendClient(client, { type: "error", message: payload.message || "讯飞识别失败", code: payload.code });
      return;
    }
    const result = payload.data?.result;
    const text = normalizeXunfeiText(payload);
    if (text) {
      const sn = Number(result?.sn);
      const pgs = result?.pgs;
      const rg = result?.rg;
      if (Number.isFinite(sn)) {
        if (pgs === "rpl" && Array.isArray(rg) && rg.length === 2) {
          const [start, end] = rg.map(Number);
          for (let index = start; index <= end; index += 1) segments.delete(index);
        }
        segments.set(sn, text);
        accumulatedText = currentTextFromSegments(segments);
      } else {
        accumulatedText += text;
      }
      sendClient(client, { type: "partial", text: accumulatedText, delta: text });
    }
    if (payload.data?.status === 2) {
      sendClient(client, { type: "final", text: accumulatedText });
      xfyun.close();
    }
  });

  xfyun.on("error", (error) => {
    sendClient(client, { type: "error", message: error.message || "讯飞连接异常" });
  });

  xfyun.on("close", () => {
    sendClient(client, { type: closedByClient ? "closed" : "final", text: accumulatedText });
    if (client.readyState === WebSocket.OPEN) client.close();
  });

  client.on("message", (raw, isBinary) => {
    if (!xfyun || xfyun.readyState !== WebSocket.OPEN) return;
    if (!isBinary) {
      let event;
      try {
        event = JSON.parse(raw.toString());
      } catch {
        return;
      }
      if (event.type === "end") {
        closedByClient = true;
        xfyun.send(JSON.stringify({
          data: {
            status: 2,
            format: "audio/L16;rate=16000",
            encoding: "raw",
            audio: ""
          }
        }));
      }
      return;
    }

    const audio = Buffer.from(raw).toString("base64");
    const frame = started
      ? {
          data: {
            status: 1,
            format: "audio/L16;rate=16000",
            encoding: "raw",
            audio
          }
        }
      : {
          common: { app_id: requireEnv("XFYUN_APP_ID") },
          business: {
            language: "zh_cn",
            domain: "iat",
            accent: "mandarin",
            dwa: "wpgs",
            vad_eos: 10000
          },
          data: {
            status: 0,
            format: "audio/L16;rate=16000",
            encoding: "raw",
            audio
          }
        };
    started = true;
    xfyun.send(JSON.stringify(frame));
  });

  client.on("close", () => {
    closedByClient = true;
    if (xfyun && xfyun.readyState === WebSocket.OPEN) xfyun.close();
  });
}
