import { readFileSync } from "node:fs";

const files = {
  index: readFileSync(new URL("../server/index.js", import.meta.url), "utf8"),
  asr: readFileSync(new URL("../server/services/xunfeiAsr.js", import.meta.url), "utf8"),
  glm: readFileSync(new URL("../server/services/glmCoach.js", import.meta.url), "utf8"),
  feishu: readFileSync(new URL("../server/services/feishuRecorder.js", import.meta.url), "utf8"),
  doubao: readFileSync(new URL("../server/services/doubaoRealtime.js", import.meta.url), "utf8"),
  client: readFileSync(new URL("../mobile/app.js", import.meta.url), "utf8")
};

const checks = [
  ["后端静态服务", files.index.includes("serveStatic") && files.index.includes("mobile")],
  ["ASR WebSocket 路由", files.index.includes("/api/asr/stream") && files.index.includes("createXunfeiAsrBridge")],
  ["讯飞签名", files.asr.includes("hmac-sha256") && files.asr.includes("iat-api.xfyun.cn")],
  ["GLM 结构化接口", files.glm.includes("chat/completions") && files.glm.includes("response_format")],
  ["飞书记录兜底", files.feishu.includes("lark-cli") && files.feishu.includes("local")],
  ["前端连接后端 ASR", files.client.includes("connectBackendAsr") && files.client.includes("downsampleTo16k")],
  ["前端调用 GLM 会话", files.client.includes("sendPracticeMessageToServer")],
  ["前端提交报告", files.client.includes("finishPracticeOnServer")],
  ["豆包实时语音后端", files.index.includes("/api/doubao/realtime/check") && files.index.includes("/api/doubao/realtime/stream") && files.doubao.includes("X-Api-App-ID") && files.doubao.includes("volc.speech.dialog")]
];

for (const [name, pass] of checks) {
  console.log(`${pass ? "PASS" : "FAIL"} ${name}`);
  if (!pass) process.exitCode = 1;
}
