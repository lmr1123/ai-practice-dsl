import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("../../", import.meta.url));

function formatTime(ms) {
  return new Date(ms).toLocaleString("zh-CN", { hour12: false });
}

function reportToMarkdown(report) {
  const lines = [
    `# AI陪练记录 - ${report.scenarioName}`,
    "",
    `- 会话ID：${report.id}`,
    `- 场景：${report.scenarioName}`,
    `- 顾客角色：${report.role}`,
    `- 得分：${report.score}`,
    `- 是否通过：${report.pass ? "通过" : "待重练"}`,
    `- 开始时间：${formatTime(report.startedAt)}`,
    `- 结束时间：${formatTime(report.finishedAt)}`,
    "",
    "## 命中要点",
    report.hitPoints?.length ? report.hitPoints.map((item) => `- ${item}`).join("\n") : "- 暂无",
    "",
    "## 风险提醒",
    report.riskPoints?.length ? report.riskPoints.map((item) => `- ${item}`).join("\n") : "- 暂无",
    "",
    "## 改进建议",
    report.suggestion || "暂无",
    "",
    "## 对话记录",
    ...(report.transcript || []).map((item) => `- **${item.speaker}**：${item.text}`)
  ];
  return lines.join("\n");
}

function runLarkCli(args, input) {
  return new Promise((resolve, reject) => {
    const child = spawn("lark-cli", args, {
      stdio: ["pipe", "pipe", "pipe"],
      env: {
        ...process.env,
        FEISHU_APP_ID: process.env.FEISHU_APP_ID || "",
        FEISHU_APP_SECRET: process.env.FEISHU_APP_SECRET || "",
        FEISHU_DOMAIN: process.env.FEISHU_DOMAIN || "feishu"
      }
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(stderr || stdout || `lark-cli exited ${code}`));
    });
    if (input) child.stdin.write(input);
    child.stdin.end();
  });
}

async function recordLocal(report, reason = "") {
  const dir = join(rootDir, "tmp", "practice-reports");
  await mkdir(dir, { recursive: true });
  const filePath = join(dir, `${report.id}.md`);
  await writeFile(filePath, `${reportToMarkdown(report)}\n${reason ? `\n<!-- 飞书写入失败：${reason} -->\n` : ""}`, "utf8");
  return { mode: "local", path: filePath, reason };
}

export async function recordPracticeReport(report) {
  const mode = process.env.FEISHU_RECORD_MODE || "local";
  if (mode !== "feishu") {
    return recordLocal(report);
  }

  const markdown = reportToMarkdown(report);
  try {
    if (process.env.FEISHU_DOC_TOKEN) {
      const output = await runLarkCli([
        "docs",
        "+update",
        "--as",
        "bot",
        "--doc",
        process.env.FEISHU_DOC_TOKEN,
        "--mode",
        "append",
        "--markdown",
        "-"
      ], `\n---\n\n${markdown}`);
      return { mode: "feishu", action: "append", output: output.slice(0, 500) };
    }

    const output = await runLarkCli([
      "docs",
      "+create",
      "--as",
      "bot",
      "--title",
      `AI陪练记录-${report.scenarioName}-${formatTime(report.finishedAt)}`,
      "--markdown",
      "-"
    ], markdown);
    return { mode: "feishu", action: "create", output: output.slice(0, 500) };
  } catch (error) {
    return recordLocal(report, error instanceof Error ? error.message.slice(0, 300) : "unknown");
  }
}
