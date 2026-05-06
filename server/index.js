import { config as loadEnv } from "dotenv";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { WebSocketServer } from "ws";
import { createXunfeiAsrBridge } from "./services/xunfeiAsr.js";
import { createPracticeSession, handlePracticeMessage, finishPracticeSession } from "./services/glmCoach.js";
import { recordPracticeReport } from "./services/feishuRecorder.js";
import { doubaoRealtimeStatus, checkDoubaoRealtimeConnection } from "./services/doubaoRealtime.js";

const rootDir = fileURLToPath(new URL("../", import.meta.url));
loadEnv({ path: join(rootDir, ".env.local") });
loadEnv();
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type"
  });
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/mobile/";
  if (pathname.endsWith("/")) pathname += "index.html";
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(rootDir, safePath);
  if (!filePath.startsWith(rootDir) || !existsSync(filePath)) {
    sendJson(res, 404, { error: "NOT_FOUND" });
    return;
  }
  const fileStat = await stat(filePath);
  if (!fileStat.isFile()) {
    sendJson(res, 404, { error: "NOT_FOUND" });
    return;
  }
  const ext = extname(filePath);
  res.writeHead(200, {
    "content-type": mimeTypes[ext] || "application/octet-stream",
    "cache-control": ext === ".html" ? "no-store" : "public, max-age=60"
  });
  createReadStream(filePath).pipe(res);
}

async function routeApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (req.method === "GET" && url.pathname === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      asr: Boolean(process.env.XFYUN_APP_ID && process.env.XFYUN_API_KEY && process.env.XFYUN_API_SECRET),
      glm: Boolean(process.env.GLM_API_KEY),
      doubaoRealtime: doubaoRealtimeStatus().configured,
      feishuMode: process.env.FEISHU_RECORD_MODE || "local"
    });
    return true;
  }
  if (req.method === "GET" && url.pathname === "/api/doubao/realtime/status") {
    sendJson(res, 200, doubaoRealtimeStatus());
    return true;
  }
  if (req.method === "POST" && url.pathname === "/api/doubao/realtime/check") {
    const result = await checkDoubaoRealtimeConnection();
    sendJson(res, result.ok ? 200 : 502, result);
    return true;
  }
  if (req.method === "POST" && url.pathname === "/api/practice/session") {
    const body = await readJson(req);
    sendJson(res, 200, createPracticeSession(body));
    return true;
  }
  if (req.method === "POST" && url.pathname === "/api/practice/message") {
    const body = await readJson(req);
    const result = await handlePracticeMessage(body);
    sendJson(res, 200, result);
    return true;
  }
  if (req.method === "POST" && url.pathname === "/api/practice/finish") {
    const body = await readJson(req);
    const result = await finishPracticeSession(body);
    const record = await recordPracticeReport(result.report);
    sendJson(res, 200, { ...result, record });
    return true;
  }
  return false;
}

const server = createServer(async (req, res) => {
  try {
    if (req.method === "OPTIONS") {
      sendJson(res, 204, {});
      return;
    }
    if (req.url?.startsWith("/api/") && await routeApi(req, res)) return;
    await serveStatic(req, res);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    sendJson(res, 500, { error: "SERVER_ERROR", message });
  }
});

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req, socket, head) => {
  const url = new URL(req.url || "", `http://${req.headers.host || "localhost"}`);
  if (url.pathname !== "/api/asr/stream") {
    socket.destroy();
    return;
  }
  wss.handleUpgrade(req, socket, head, (client) => {
    createXunfeiAsrBridge(client);
  });
});

server.listen(port, () => {
  console.log(`AI practice server running at http://localhost:${port}/mobile/`);
});
