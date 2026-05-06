import WebSocket from "ws";

const DOUBAO_REALTIME_URL = "wss://openspeech.bytedance.com/api/v3/realtime/dialogue";

function doubaoConfig() {
  return {
    appId: process.env.DOUBAO_APP_ID || "",
    accessKey: process.env.DOUBAO_ACCESS_KEY || process.env.DOUBAO_ACCESS_TOKEN || "",
    appKey: process.env.DOUBAO_APP_KEY || process.env.DOUBAO_SECRET_KEY || "",
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
      clearTimeout(timer);
      socket.close();
      resolve({
        ok: true,
        stage: "websocket",
        latencyMs: Date.now() - startedAt,
        message: "服务端已能连接豆包实时语音 WebSocket，下一步可接入双向音频代理。",
        ...status
      });
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
