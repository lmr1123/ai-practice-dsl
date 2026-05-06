# 连锁药店 AI 陪练

本项目已完成 2 个门店陪练场景的方案与脚本：

- `docs/00_陪练场景建设方案.md`
- `docs/02_大参林AI陪练产品解决方案.md`
- `scenarios/01_新品推荐_AI陪练场景.md`
- `scenarios/02_收银台引导办卡_AI陪练场景.md`
- `scenarios/ai_practice_scenarios.json`
- `cards/index.html`
- `mobile/index.html`

场景参考北森 AI 陪练公开产品思路，落地为连锁药店“新品推荐”和“收银台引导办卡”两个训练任务，包含 AI 客户角色、难度分层、关键动作、评分表、挑战话术、优秀话术和风险话术。

`cards/` 目录提供 AI 对练前使用的可编辑微学习卡片源文件，文字在 `cards/cards-data.js` 中维护，可用浏览器打开并打印导出 PDF。

`mobile/` 目录提供手机端网页，已跑通“资料学习 → 训前小测 → 对练准备 → AI 顾客对话 → 实时点评 → 练后报告”的验证链路。

## 正式接口版启动

本项目已新增 Node 后端，负责托管前端、讯飞 ASR 代理、GLM 对话点评和飞书记录。

```bash
npm install
npm start
```

访问：

```text
http://localhost:4173/mobile/
```

本地密钥放在 `.env.local`，该文件已加入 `.gitignore`，不要提交到代码仓库。可参考 `.env.example` 配置。

## 当前正式链路

- 前端：采集麦克风音频，转换为 16k PCM，WebSocket 发给后端。
- ASR：后端代理讯飞语音听写 WebSocket，返回实时转写。
- AI 对话：后端调用 GLM OpenAI-compatible API，生成顾客追问、点评、润色和训练目标。
- 评分：GLM 结果叠加业务关键点规则校准，避免模型误判。
- 记录：对练结束后通过飞书 CLI 写入飞书文档；失败时落本地 `tmp/practice-reports/` 兜底。

自测：

```bash
npm run check
```

## 多人体验部署

项目支持两种体验方式：

1. GitHub Pages 静态体验版：用于多人快速查看手机端 UI、学习、小测、对练流程和本地评分 fallback。该模式不连接后端，不写入真实飞书记录。
2. Node 后端正式版：用于完整验证讯飞 ASR、GLM 对练、飞书记录。需要部署 `server/index.js` 并配置服务端环境变量。

如果静态页面需要连接正式后端，可在页面加载前注入：

```html
<script>
  window.AI_PRACTICE_API_BASE_URL = "https://your-api-domain.example";
</script>
```
