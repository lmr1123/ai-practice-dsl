import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../mobile/index.html", import.meta.url), "utf8");
const app = readFileSync(new URL("../mobile/app.js", import.meta.url), "utf8");
const css = readFileSync(new URL("../mobile/styles.css", import.meta.url), "utf8");

const checks = [
  ["页面入口存在", html.includes('id="practiceView"') && html.includes('id="startPractice"')],
  ["资源版本已更新", html.includes("app.js?v=20260503-voice") && html.includes("styles.css?v=20260503-voice")],
  ["微信式会话输入", html.includes('id="replyInput"') && html.includes('id="voiceCapture"') && html.includes('id="voiceLive"') && html.includes("提交点评")],
  ["点击录音闭环", app.includes("toggleVoiceRecording") && app.includes("startVoiceRecording") && app.includes("stopVoiceRecording")],
  ["语音实时转写", app.includes("SpeechRecognition") && app.includes("interimResults = true") && app.includes("正在录音并实时转写")],
  ["语音失败不阻断", app.includes("switchToManualSpeech") && app.includes("不影响提交点评")],
  ["真实员工话术评分", app.includes("replyInput.value.trim()") && app.includes("scoreReply(text)")],
  ["多轮顾客追问", app.includes("nextCustomerUtterance") && app.includes("turnIndex") && app.includes("maxTurns")],
  ["实时点评和润色", app.includes("showLiveReview(result)") && app.includes("polishReply(text, result)")],
  ["训练目标展示", app.includes("训练目标：") && app.includes("scenario.prep.goals")],
  ["练后报告", app.includes("renderReport(result)") && app.includes("维度得分") && app.includes("对话记录")],
  ["会话视觉样式", css.includes(".chat-card") && css.includes(".message.customer") && css.includes(".message.user")],
  ["语音输入状态样式", css.includes(".reply-box.is-recording") && css.includes(".voice-live") && css.includes("@keyframes voiceBar")]
];

const failed = checks.filter(([, pass]) => !pass);
for (const [name, pass] of checks) {
  console.log(`${pass ? "PASS" : "FAIL"} ${name}`);
}

if (failed.length) {
  process.exitCode = 1;
}
