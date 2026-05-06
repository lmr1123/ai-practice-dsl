import crypto from "node:crypto";

const sessions = new Map();

const scenarioConfig = {
  member: {
    name: "收银台引导办卡",
    role: "李先生，45岁，首次到店，赶时间，对留手机号敏感，担心后续电话短信打扰。",
    initialUtterance: "快点结账吧，我赶时间。又是办会员？我不想留手机号。",
    goals: ["自然开口", "讲清本单权益", "回应手机号隐私顾虑", "拒绝后礼貌收尾"],
    required: ["免费办理", "会员价或新人券", "积分或会员日", "手机号用途", "不强迫", "正常结账"],
    requiredChecks: [
      { key: "免费办理", terms: ["免费", "免费办理", "不收费"], points: 15 },
      { key: "本单权益", terms: ["本单", "这单", "会员价", "新人券", "优惠", "立减"], points: 25 },
      { key: "长期权益", terms: ["积分", "会员日", "生日", "星级礼", "全国"], points: 15 },
      { key: "手机号用途", terms: ["手机号", "账户", "积分", "优惠券", "通知"], points: 20 },
      { key: "不强迫", terms: ["不是强制", "不是必须", "不强制", "不办也可以"], points: 15 },
      { key: "正常结账", terms: ["正常结账", "马上给您结账", "先给您结账"], points: 10 }
    ],
    risk: ["不办会员就不能买", "绝对不会联系", "不涉及个人信息", "手机号随便填", "公用会员卡"]
  },
  "new-product": {
    name: "益智营养类新品推荐",
    role: "赵女士，41岁，看到2盒158活动，想给家里老人和孩子一起看营养品，担心夸大效果。",
    initialUtterance: "这个2盒158是什么产品？家里老人小孩都能吃吗？",
    goals: ["先问给谁用和年龄", "识别用脑用眼睡眠需求", "匹配DHA/牛磺酸/GABA多维", "讲清活动", "守住合规红线"],
    required: ["给谁用", "年龄", "具体需求", "DHA或牛磺酸或GABA", "营养补充", "药师或医生"],
    requiredChecks: [
      { key: "对象年龄", terms: ["给谁", "谁用", "年龄", "孩子", "老人", "成人"], points: 20 },
      { key: "需求探询", terms: ["用脑", "用眼", "睡眠", "饮食", "学习", "长期用药", "慢病"], points: 20 },
      { key: "商品匹配", terms: ["DHA", "牛磺酸", "GABA", "多维", "钙", "铁", "锌"], points: 20 },
      { key: "活动表达", terms: ["1盒98", "2盒158", "活动", "组合", "先试"], points: 15 },
      { key: "合规边界", terms: ["营养补充", "不是药", "不能承诺", "药师", "医生", "不替代"], points: 25 }
    ],
    risk: ["肯定长高", "成绩一定提高", "改善近视", "不用看医生", "全家都能吃", "慢病也可以直接吃"]
  }
};

function activeScenario(id = "member") {
  return scenarioConfig[id] || scenarioConfig.member;
}

function fallbackScore(text, scenarioId) {
  const config = activeScenario(scenarioId);
  const hitChecks = (config.requiredChecks || []).filter((check) => check.terms.some((term) => text.includes(term)));
  const hitPoints = hitChecks.map((item) => item.key);
  const riskPoints = config.risk.filter((item) => text.includes(item));
  const rawScore = hitChecks.reduce((sum, item) => sum + item.points, 0);
  const score = riskPoints.length ? Math.min(59, rawScore) : Math.min(100, rawScore);
  return {
    customer_reply: score >= 80
      ? (scenarioId === "member" ? "那如果我今天先不办，下次来还能免费办吗？" : "如果只想先试试，是买一盒还是两盒更合适？")
      : (scenarioId === "member" ? "你还没说清楚现在办到底能省多少？手机号会怎么用？" : "你还没问我家里人的情况，老人有高血压也能一起买吗？"),
    score,
    hit_points: hitPoints,
    risk_points: riskPoints,
    polished_reply: scenarioId === "member"
      ? "建议表达为：理解您赶时间，不是必须办理。会员免费开通后，这单符合条件可以享会员价或新人券；手机号主要用于会员账户、积分和优惠券通知。如果不方便，我先给您正常结账。"
      : "建议表达为：我先确认给谁用、年龄和主要需求。它属于营养补充，不能替代药品或医生判断；老人有慢病或长期用药建议让药师把关。",
    next_goal: score >= 80 ? "处理顾客追问，保持选择权和合规边界。" : "补齐漏掉的关键动作，再回应顾客顾虑。"
  };
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  }
}

async function callGlm(messages) {
  if (!process.env.GLM_API_KEY) return null;
  const baseUrl = process.env.GLM_BASE_URL || "https://api.z.ai/api/paas/v4";
  const model = process.env.GLM_MODEL || "glm-4.6";
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.GLM_API_KEY}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages
    })
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`GLM request failed: ${response.status} ${message.slice(0, 200)}`);
  }
  const data = await response.json();
  return safeJsonParse(data.choices?.[0]?.message?.content || "");
}

export function createPracticeSession(body = {}) {
  const scenarioId = body.scenarioId || "member";
  const config = activeScenario(scenarioId);
  const session = {
    id: crypto.randomUUID(),
    scenarioId,
    scenarioName: config.name,
    role: config.role,
    startedAt: Date.now(),
    transcript: [{ speaker: "AI顾客", text: config.initialUtterance }],
    turns: [],
    initialUtterance: config.initialUtterance
  };
  sessions.set(session.id, session);
  return { session };
}

export async function handlePracticeMessage(body = {}) {
  const session = sessions.get(body.sessionId) || createPracticeSession({ scenarioId: body.scenarioId }).session;
  const scenario = activeScenario(session.scenarioId);
  const employeeText = String(body.text || "").trim();
  if (!employeeText) throw new Error("员工话术不能为空");

  const messages = [
    {
      role: "system",
      content: [
        "你是连锁药店AI陪练系统，同时扮演顾客、销售教练和评分员。",
        "必须严格输出JSON，不要输出Markdown。",
        "评分必须围绕训练目标、命中点、风险话术和合规边界。",
        "customer_reply要像真实顾客追问，不能替员工说话。"
      ].join("\n")
    },
    {
      role: "user",
      content: JSON.stringify({
        scenario,
        transcript: session.transcript,
        employee_reply: employeeText,
        output_schema: {
          customer_reply: "string",
          score: "number 0-100",
          hit_points: ["string"],
          risk_points: ["string"],
          polished_reply: "string",
          next_goal: "string"
        }
      })
    }
  ];

  let result;
  try {
    result = await callGlm(messages);
  } catch (error) {
    result = null;
  }
  if (!result) result = fallbackScore(employeeText, session.scenarioId);

  const ruleResult = fallbackScore(employeeText, session.scenarioId);
  result.score = Math.max(ruleResult.score, Math.max(0, Math.min(100, Number(result.score) || 0)));
  result.hit_points = Array.from(new Set([...(Array.isArray(result.hit_points) ? result.hit_points : []), ...ruleResult.hit_points]));
  result.risk_points = Array.from(new Set([...(Array.isArray(result.risk_points) ? result.risk_points : []), ...ruleResult.risk_points]));
  result.customer_reply = String(result.customer_reply || fallbackScore(employeeText, session.scenarioId).customer_reply);
  result.polished_reply = String(result.polished_reply || "");
  result.next_goal = String(result.next_goal || "");

  session.transcript.push({ speaker: "店员", text: employeeText });
  session.transcript.push({ speaker: "AI顾客", text: result.customer_reply });
  session.turns.push({ employeeText, result, at: Date.now() });
  sessions.set(session.id, session);

  return { sessionId: session.id, ...result, transcript: session.transcript };
}

export async function finishPracticeSession(body = {}) {
  const session = sessions.get(body.sessionId);
  if (!session) throw new Error("Session not found");
  const last = session.turns.at(-1)?.result || fallbackScore("", session.scenarioId);
  const report = {
    id: session.id,
    scenarioId: session.scenarioId,
    scenarioName: session.scenarioName,
    role: session.role,
    score: last.score,
    pass: last.score >= 80 && !last.risk_points?.length,
    hitPoints: last.hit_points || [],
    riskPoints: last.risk_points || [],
    suggestion: last.polished_reply || last.next_goal || "",
    transcript: session.transcript,
    startedAt: session.startedAt,
    finishedAt: Date.now()
  };
  return { report };
}
