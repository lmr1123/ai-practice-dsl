const learningCards = [
  {
    id: "member",
    name: "收银台引导办卡",
    kind: "办卡",
    goal: "30 秒讲清免费办卡、活动权益和隐私回应。",
    cards: [
      {
        title: "一句话开口",
        subtitle: "收银台 10 秒触发",
        lead: "您好，请问有大参林会员吗？没有的话现在可以免费办理。权益按门店活动来，有会员价、优惠券、积分和会员日福利，我先帮您看这单适用哪一种。",
        points: ["扫码、报金额或确认无会员后开口", "先讲免费和可享权益，再按系统/门店活动说明券使用时间", "语气是提醒权益，不是强迫办理"],
        avoid: ["不办会员就不能买", "办吧办吧，大家都办"]
      },
      {
        title: "新会员权益",
        subtitle: "把“优惠多”说具体",
        lead: "新会员常见权益包括会员价、新人券、积分和会员日。券可能当次、次日或下次到店使用，具体以当前门店活动和系统到账为准。",
        points: ["当下：会员价、活动券或积分按系统匹配", "长期：会员日、双倍积分、生日券、星级礼", "大参林全国门店通用"],
        avoid: ["所有商品都打折", "优惠力度一直一样"]
      },
      {
        title: "隐私异议",
        subtitle: "真实解释，不绝对承诺",
        lead: "手机号主要用于会员账户、积分、优惠券和必要服务通知，后续不想接收营销类通知，也可以按规则关闭。",
        points: ["理解顾客怕骚扰", "说明手机号用途", "顾客赶时间时先正常结账"],
        avoid: ["我们绝对不会联系您", "不涉及个人信息", "随便填一个手机号"]
      }
    ],
    quiz: [
      {
        q: "顾客说“不想留手机号，怕骚扰”，哪句最合适？",
        options: ["我们绝对不会联系您", "手机号主要用于会员账户、积分和权益通知，不想接收营销通知可按规则关闭", "不留手机号就没法优惠"],
        answer: 1,
        note: "隐私回应要真实，不做绝对化承诺。"
      },
      {
        q: "收银台开口最好先讲什么？",
        options: ["本单能省多少或能享什么权益", "公司会员体系很完善", "大家都在办"],
        answer: 0,
        note: "先讲顾客当下可感知利益。"
      },
      {
        q: "顾客再三拒绝后，应该怎么做？",
        options: ["继续劝办", "用公用会员卡结算", "礼貌结束邀约并正常收银"],
        answer: 2,
        note: "拒绝后保护体验，最多轻量挽回一次。"
      }
    ],
    practice: {
      customer: "我赶时间，不想留手机号，你快点给我结账。",
      checks: ["免费", "会员", "手机号", "正常结账"]
    },
    prep: {
      image: "./assets/customer-member.png",
      requirement: "完成 1 次 60 分以上的收银台办卡对练",
      scene: "顾客在收银台结账，购买家庭常备药和口罩，总金额 128 元。顾客赶时间，不想被办卡流程耽误。",
      role: "李先生，45 岁，首次到店。对留手机号敏感，担心后续电话短信打扰；如果员工能讲清免费办理、活动权益和手机号用途，会考虑开通。",
      goals: [
        "自然开口：先确认是否有会员，再提示本单可享权益",
        "讲清价值：会员价/优惠券/积分按当前活动说明，长期权益补充说明",
        "回应顾虑：说明手机号用途，不做绝对化承诺",
        "礼貌收尾：顾客拒绝后最多轻量挽回一次，立即回到收银"
      ]
    }
  },
  {
    id: "new-product",
    name: "益智营养类新品推荐",
    kind: "新品",
    goal: "识别人群，匹配 DHA/牛磺酸或 GABA 多维。",
    cards: [
      {
        title: "活动商品总览",
        subtitle: "营养补充，不是治疗产品",
        lead: "鱼油牛磺酸：1 盒 98 元、2 盒 158 元，加提 5 元/盒。GABA 多维价格以当期活动为准。",
        points: ["鱼油牛磺酸偏用脑和用眼营养支持", "GABA 多维偏睡眠质量和复合营养", "推荐前先问使用对象和需求"],
        avoid: ["吃了肯定有效", "所有人都适合"]
      },
      {
        title: "五类销售机会",
        subtitle: "别只练儿童家长",
        lead: "新品推荐要识别学生家长、上班族、备考青年、老人家属、家庭囤货五类机会。",
        points: ["学生家长：学习、用眼、睡眠", "上班族：熬夜、眼疲劳、注意力差", "老人家属：慢病长期用药要先问清"],
        avoid: ["只会讲孩子学习", "看到活动就直接推两盒"]
      },
      {
        title: "合规红线",
        subtitle: "高压追问也要守住",
        lead: "这类商品是营养补充，不是药，不能替代医生、药师判断。不同人群感受会有差异。",
        points: ["不能承诺长高、提高成绩、改善近视", "不能说熬夜吃这个就没事", "老人慢病或长期用药，建议先咨询药师或医生"],
        avoid: ["成绩一定提高", "不用看医生", "全家都能吃"]
      }
    ],
    quiz: [
      {
        q: "顾客问“孩子吃这个能不能长高”，最佳回答是？",
        options: ["坚持吃肯定有帮助", "不能这样承诺，它是营养补充；明显发育迟缓建议咨询医生或药师", "买两盒活动更划算"],
        answer: 1,
        note: "长高属于高风险承诺，要降预期并建议专业咨询。"
      },
      {
        q: "老人有高血压并长期吃药，员工应该先做什么？",
        options: ["直接推荐鱼油", "询问基础病和用药情况，必要时咨询药师", "说老人都适合"],
        answer: 1,
        note: "老人慢病和长期用药是风险点。"
      },
      {
        q: "新品推荐第一步是什么？",
        options: ["先推 2 盒 158", "先问给谁用、年龄和主要需求", "先说活动今天最划算"],
        answer: 1,
        note: "先识别机会和需求，再匹配商品。"
      }
    ],
    practice: {
      customer: "这个 2 盒 158 是什么？我家老人小孩都能吃吗？",
      checks: ["给谁", "年龄", "营养补充", "药师"]
    },
    prep: {
      image: "./assets/customer-new-product.png",
      requirement: "完成 1 次 60 分以上的新品推荐对练",
      scene: "顾客在营养品货架前看到活动商品，询问 2 盒 158 的鱼油牛磺酸是否适合家人使用。",
      role: "陈女士，36 岁，给孩子和父母一起看营养品。她关心学习用脑、睡眠和老人营养，但担心营养品夸大效果。",
      goals: [
        "识别对象：先问给谁用、年龄和主要需求",
        "匹配商品：区分 DHA/牛磺酸与 GABA 多维的适用场景",
        "讲清活动：说明 1 盒 98 元、2 盒 158 元的组合价值",
        "守住红线：不承诺长高、提高成绩、改善近视或替代医生药师"
      ]
    }
  }
];

const businessPracticeBank = {
  member: {
    mode: "固定对话模式",
    activeRole: "privacy_rushed_customer",
    roles: {
      privacy_rushed_customer: {
        name: "李先生",
        age: 45,
        profile: "首次到店，购买家庭常备药和口罩，总金额128元。赶时间、隐私敏感，担心电话短信打扰。",
        initialUtterance: "快点结账吧，我赶时间。又是办会员？我不想留手机号。",
        inspiration: "先安抚赶时间和隐私顾虑，再例行讲清：会员免费办，权益按门店活动可能是会员价、当次/次日/下次可用券、积分和会员日；手机号用于账户、积分和券到账。顾客仍拒绝就马上收银。",
        sampleReply: "理解，您赶时间我尽快给您结。会员不是强制的，不办也能正常买。我例行跟您说一下：现在办是免费的，权益按门店活动可能有会员价、优惠券或积分，有些券是次日或下次到店用，长期还有会员日和积分权益。手机号主要用于会员账户、积分和券到账；您要是不方便，我就先给您正常结账。",
        nextUtterance: "那办了以后是不是天天给我打电话、发短信？",
        acceptedIf: ["免费", "权益说明", "手机号用途", "不强迫"]
      }
    },
    requiredChecks: [
      { key: "开口自然", terms: ["不是必须", "不强制", "可以正常购买", "会员"], points: 15 },
      { key: "权益说明", terms: ["本单", "当次", "次日", "下次", "会员价", "新人券", "优惠券", "券", "优惠"], points: 25 },
      { key: "长期权益", terms: ["积分", "会员日", "全国", "星级礼", "生日"], points: 15 },
      { key: "流程说明", terms: ["免费", "手机号", "验证码", "30秒", "不需要实体卡"], points: 15 },
      { key: "隐私回应", terms: ["手机号", "账户", "积分", "优惠券", "通知", "保护", "关闭"], points: 20 },
      { key: "尊重顾客", terms: ["正常结账", "不方便", "后续", "理解", "不办也可以"], points: 10 }
    ],
    riskPhrases: ["不办会员就不能买", "手机号随便填", "绝对不会联系", "不涉及个人信息", "公用会员卡", "大家都办"],
    polishGood: "理解，您赶时间我尽快给您结。会员不是强制的，不办也能正常买。我例行跟您说一下：现在办是免费的，权益按门店活动可能有会员价、当次/次日/下次可用券，也能累计积分、参加会员日。手机号主要用于账户、积分和券到账；您不方便的话，我就先给您正常结账。",
    polishWeak: "可以更像收银台口语：先说“我尽快给您结”，再补一句“会员免费、不是强制”，权益别说死成一定当单减免，要按门店活动说会员价、券可能次日或下次可用、积分和会员日，最后给顾客选择权。"
  },
  "new-product": {
    mode: "固定对话模式",
    activeRole: "family_stockup_gift",
    roles: {
      parent_for_child: {
        name: "陈女士",
        age: 36,
        profile: "孩子读小学五年级，关心学习、用眼和睡眠，担心营养品夸大效果。",
        initialUtterance: "孩子最近学习压力大，晚上睡得也一般，有没有什么营养品可以补一补？",
        inspiration: "先问孩子年龄、主要需求和睡眠饮食情况，再说明 DHA/牛磺酸或 GABA 多维是营养补充，不能承诺提高成绩或长高。",
        sampleReply: "我先问下是孩子自己用吗、年龄多大？如果主要是用脑多、用眼多，可以看鱼油牛磺酸，主要补充 DHA 和牛磺酸；如果更关注睡眠质量和综合营养，可以看 GABA 多维。它们都是营养补充，不能承诺提高成绩或长高。",
        nextUtterance: "那吃了能不能提高成绩、长高一点？"
      },
      office_worker: {
        name: "林先生",
        age: 29,
        profile: "加班多、眼睛累、白天注意力差，不太相信营养品。",
        initialUtterance: "最近加班多，眼睛累，白天注意力也差，有没有能补一补的？",
        inspiration: "先承接熬夜和用眼需求，再强调营养支持，不能说能代替休息、咖啡或熬夜没事。",
        sampleReply: "您这种主要是用脑和用眼多，可以先看鱼油牛磺酸，偏 DHA 和牛磺酸的日常营养支持；如果睡眠也一般，再看 GABA 多维。它不能替代休息，也不能保证吃了就不困。",
        nextUtterance: "吃了是不是就不困了？能不能代替咖啡？"
      },
      family_stockup_gift: {
        name: "赵女士",
        age: 41,
        profile: "看到活动堆头，被 2 盒 158 吸引，想给家里孩子和父母一起看营养品。",
        initialUtterance: "这个 2 盒158 是什么产品？家里老人小孩都能吃吗？",
        inspiration: "先按儿童、成人、老人分开确认需求；讲清 1 盒98、2盒158 的活动价值，但不能说全家都适合或买两盒更有效。",
        sampleReply: "我先帮您分开看，孩子、成人和老人需求不一样，不能直接说全家都适合。这款鱼油牛磺酸主要是 DHA 和牛磺酸的营养补充，活动是 1 盒98 元、2 盒158 元。如果老人有慢病或长期用药，建议先让药师确认。",
        nextUtterance: "买两盒是不是更有效？老人有高血压也可以吃吗？"
      }
    },
    requiredChecks: [
      { key: "对象年龄", terms: ["给谁", "年龄", "孩子", "老人", "成人", "分开"], points: 20 },
      { key: "需求探询", terms: ["用脑", "用眼", "睡眠", "饮食", "长期用药", "慢病"], points: 20 },
      { key: "商品匹配", terms: ["DHA", "牛磺酸", "GABA", "钙铁锌", "多维"], points: 20 },
      { key: "活动表达", terms: ["1盒98", "2盒158", "活动", "先试", "组合"], points: 15 },
      { key: "合规边界", terms: ["营养补充", "不是药", "不能承诺", "药师", "医生", "不替代"], points: 25 }
    ],
    riskPhrases: ["肯定长高", "成绩一定提高", "改善近视", "不用看医生", "所有孩子都适合", "慢病也可以直接吃", "熬夜吃这个就没事", "全家都能吃"],
    polishGood: "我先确认是给谁用、年龄和主要需求。鱼油牛磺酸偏 DHA 和牛磺酸的日常营养补充，GABA 多维偏睡眠质量和复合营养补充。活动价可以介绍，但老人慢病或长期用药要先咨询药师，不能承诺疗效。",
    polishWeak: "建议先问使用对象、年龄和需求，再匹配 DHA/牛磺酸或 GABA 多维，并明确这是营养补充，不能承诺长高、成绩、近视或替代医生药师。"
  }
};

const state = {
  scenarioId: localStorage.getItem("mobileScenario") || "member",
  cardIndex: 0,
  quizIndex: 0,
  quizScore: 0,
  practiceSession: null
};

const views = Object.fromEntries(
  Array.from(document.querySelectorAll(".view")).map((view) => [view.id.replace("View", ""), view])
);

const homeRecordList = document.querySelector("#homeRecordList");
const drillList = document.querySelector("#drillList");
const courseList = document.querySelector("#courseList");
const learnScenario = document.querySelector("#learnScenario");
const learnCard = document.querySelector("#learnCard");
const cardProgress = document.querySelector("#cardProgress");
const quizScenario = document.querySelector("#quizScenario");
const quizCard = document.querySelector("#quizCard");
const prepTitle = document.querySelector("#prepTitle");
const prepCard = document.querySelector("#prepCard");
const realtimeTitle = document.querySelector("#realtimeTitle");
const realtimePanel = document.querySelector("#realtimePanel");
const practiceScenario = document.querySelector("#practiceScenario");
const practiceRoleCard = document.querySelector("#practiceRoleCard");
const liveReviewToast = document.querySelector("#liveReviewToast");
const inspirationCard = document.querySelector("#inspirationCard");
const chatPanel = document.querySelector("#chatPanel");
const feedbackPanel = document.querySelector("#feedbackPanel");
const replyForm = document.querySelector("#replyForm");
const replyInput = document.querySelector("#replyInput");
const practiceReport = document.querySelector("#practiceReport");
const voiceCapture = document.querySelector("#voiceCapture");
const voiceLive = document.querySelector("#voiceLive");
const voiceTimer = document.querySelector("#voiceTimer");
const speechStatus = document.querySelector("#speechStatus");
const BrowserSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let speechRecognition = null;
let isListening = false;
let mediaRecorder = null;
let recordingStream = null;
let recordingStartedAt = 0;
let recordingTimer = null;
let finalTranscript = "";
let interimTranscript = "";
let browserCommittedTranscript = "";
let backendAsrSocket = null;
let audioContext = null;
let audioSource = null;
let audioProcessor = null;
let backendAsrReady = false;
let backendTranscript = "";
let backendCommittedTranscript = "";
let backendSessionTranscript = "";
let backendFinalized = false;
let backendReconnectAllowed = true;
let stoppingVoiceRecording = false;
let vadMode = "idle";
let vadSawSpeech = false;
let vadSilenceStartedAt = 0;
let vadLastStatusAt = 0;
let vadLastLongSilenceAt = 0;
let audioOutputMute = null;

function apiBaseUrl() {
  if (window.AI_PRACTICE_API_BASE_URL) return window.AI_PRACTICE_API_BASE_URL.replace(/\/$/, "");
  if (window.location.hostname.endsWith("github.io")) return "";
  if (window.location.protocol === "file:") return "http://localhost:4173";
  return window.location.origin;
}

function hasBackendApi() {
  return Boolean(apiBaseUrl());
}

function wsBaseUrl() {
  const base = apiBaseUrl();
  return base.replace(/^http/, "ws");
}

function scenarioIcon(scenario) {
  if (scenario.id === "new-product") return "./assets/icon-script.png";
  if (scenario.kind === "用药") return "./assets/icon-medication.png";
  return "./assets/icon-policy.png";
}

function currentScenario() {
  return learningCards.find((item) => item.id === state.scenarioId) || learningCards[0];
}

function currentPracticeConfig() {
  return businessPracticeBank[state.scenarioId] || businessPracticeBank.member;
}

function currentCustomerRole() {
  const config = currentPracticeConfig();
  return config.roles[config.activeRole] || Object.values(config.roles)[0];
}

async function postJson(path, payload) {
  if (!hasBackendApi()) throw new Error("backend api is not configured");
  const response = await fetch(`${apiBaseUrl()}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

async function createServerPracticeSession(scenarioId) {
  try {
    const data = await postJson("/api/practice/session", { scenarioId });
    return data.session;
  } catch {
    return null;
  }
}

function serverResultToLocal(data, fallbackText) {
  const fallback = scoreReply(fallbackText);
  return {
    score: Number.isFinite(Number(data?.score)) ? Number(data.score) : fallback.score,
    hits: Array.isArray(data?.hit_points) ? data.hit_points : fallback.hits,
    matchedChecks: fallback.matchedChecks,
    riskHits: Array.isArray(data?.risk_points) ? data.risk_points : fallback.riskHits,
    customerReply: data?.customer_reply || "",
    polishedReply: data?.polished_reply || "",
    nextGoal: data?.next_goal || ""
  };
}

async function sendPracticeMessageToServer(text) {
  if (!state.practiceSession?.serverId) throw new Error("server session not ready");
  const data = await postJson("/api/practice/message", {
    sessionId: state.practiceSession.serverId,
    scenarioId: state.scenarioId,
    text
  });
  return serverResultToLocal(data, text);
}

async function finishPracticeOnServer(localReport) {
  if (!state.practiceSession?.serverId) return null;
  try {
    return await postJson("/api/practice/finish", {
      sessionId: state.practiceSession.serverId,
      localReport
    });
  } catch {
    return null;
  }
}

async function getJson(path) {
  if (!hasBackendApi()) throw new Error("backend api is not configured");
  const response = await fetch(`${apiBaseUrl()}${path}`);
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

function completedMap() {
  return JSON.parse(localStorage.getItem("mobileCompleted") || "{}");
}

function saveCompleted(id) {
  const data = completedMap();
  data[id] = true;
  localStorage.setItem("mobileCompleted", JSON.stringify(data));
}

function practiceRecords() {
  return JSON.parse(localStorage.getItem("mobilePracticeRecords") || "[]");
}

function savePracticeRecord(record) {
  const records = practiceRecords();
  records.unshift(record);
  localStorage.setItem("mobilePracticeRecords", JSON.stringify(records.slice(0, 30)));
}

function updateProgress() {
  const done = Object.keys(completedMap()).length;
  return `${done}/${learningCards.length}`;
}

function showView(name) {
  Object.values(views).forEach((view) => view.classList.remove("is-active"));
  views[name].classList.add("is-active");
  document.querySelectorAll(".app-tabbar button").forEach((button) => {
    button.setAttribute("aria-current", button.dataset.nav === `${name}View` ? "page" : "false");
  });
  document.querySelector(".app-tabbar").hidden = views[name].classList.contains("sub-view");
}

function renderHome() {
  const done = completedMap();
  const records = practiceRecords();
  homeRecordList.textContent = "";
  learningCards.slice(0, 2).forEach((scenario, index) => {
    const record = records.find((item) => item.scenarioId === scenario.id);
    const button = document.createElement("button");
    button.className = "record-item";
    button.type = "button";
    button.innerHTML = `
      <img class="record-icon-img" src="${scenarioIcon(scenario)}" alt="" />
      <div>
        <strong>${scenario.name}</strong>
        <p>${record ? record.timeText : index === 0 ? "05-13 10:30" : "05-12 15:20"}</p>
      </div>
      <em>${record ? `得分 ${record.score}` : done[scenario.id] ? "得分 92" : "待完成"}</em>
    `;
    button.addEventListener("click", () => {
      state.scenarioId = scenario.id;
      localStorage.setItem("mobileScenario", scenario.id);
      renderPrep();
      showView("prep");
    });
    homeRecordList.appendChild(button);
  });
}

function renderDrill() {
  const done = completedMap();
  drillList.textContent = "";
  const extra = [
    { name: "儿童退烧药选择", kind: "用药", hot: "6.5k", locked: true },
    { name: "慢性胃炎用药建议", kind: "用药", hot: "4.1k", locked: true }
  ];
  [...learningCards.map((item) => ({ ...item, hot: item.id === "member" ? "1.2w" : "8k" })), ...extra].forEach((scenario) => {
    const button = document.createElement("button");
    button.className = "drill-item";
    button.type = "button";
    button.innerHTML = `
      <img class="record-icon-img" src="${scenarioIcon(scenario)}" alt="" />
      <div>
        <strong>${scenario.name}</strong>
        <p>热度 ${scenario.hot}</p>
      </div>
      <em>${scenario.locked ? "待上线" : "去对练"}</em>
    `;
    if (!scenario.locked) {
      button.addEventListener("click", () => {
        state.scenarioId = scenario.id;
        localStorage.setItem("mobileScenario", scenario.id);
        renderPrep();
        showView("prep");
      });
    }
    drillList.appendChild(button);
  });
}

function renderStudyCenter() {
  courseList.textContent = "";
  learningCards.forEach((scenario, index) => {
    const button = document.createElement("button");
    button.className = "course-item";
    button.type = "button";
    button.innerHTML = `
      <img class="course-cover-img" src="${scenarioIcon(scenario)}" alt="" />
      <div>
        <strong>${scenario.name}</strong>
        <p>${index === 0 ? "1234人学习" : "856人学习"}</p>
      </div>
      <em>学习</em>
    `;
    button.addEventListener("click", () => {
      state.scenarioId = scenario.id;
      state.cardIndex = 0;
      state.quizIndex = 0;
      state.quizScore = 0;
      localStorage.setItem("mobileScenario", scenario.id);
      renderLearn();
      showView("learn");
    });
    courseList.appendChild(button);
  });
}

function renderPrep() {
  const scenario = currentScenario();
  const goalItems = scenario.prep.goals.map((goal, index) => {
    const [title, detail = goal] = goal.split("：");
    return { step: index + 1, title, detail };
  });
  prepTitle.textContent = scenario.name;
  prepCard.classList.remove("is-animated");
  prepCard.innerHTML = `
    <img class="prep-hero-img" src="${scenario.prep.image}" alt="${scenario.name}顾客角色" />
    <div class="prep-status">
      <span>训练要求</span>
      <strong>${scenario.prep.requirement}</strong>
    </div>
    <section class="prep-section">
      <h3>陪练场景</h3>
      <p>${scenario.prep.scene}</p>
    </section>
    <section class="prep-section">
      <h3>顾客角色</h3>
      <p>${scenario.prep.role}</p>
    </section>
    <section class="prep-section">
      <div class="prep-section-head">
        <h3>对话目标</h3>
        <button class="case-ppt-link" type="button" aria-label="查看优秀案例 PPT">
          <i>PPT</i>
          <strong>优秀案例 PPT</strong>
          <em>点击查看</em>
        </button>
      </div>
      <ol class="step-list">
        ${goalItems.map((goal) => `
          <li>
            <span>STEP ${goal.step}</span>
            <p><strong>${goal.title}</strong>${goal.detail}</p>
          </li>
        `).join("")}
      </ol>
    </section>
  `;
  requestAnimationFrame(() => prepCard.classList.add("is-animated"));
}

function buildRealtimeRolePrompt() {
  const scenario = currentScenario();
  const config = currentPracticeConfig();
  const role = currentCustomerRole();
  return [
    `你是大参林连锁药店 AI 陪练中的虚拟顾客，场景是《${scenario.name}》。`,
    `你要扮演：${role.name}，${role.age}岁，${role.profile}`,
    `开场白：${role.initialUtterance}`,
    "训练方式：员工通过语音与你对话，你用真实顾客口吻追问，不要替员工说话。",
    `对话目标：${scenario.prep.goals.join("；")}`,
    config.requiredChecks ? `评分关注点：${config.requiredChecks.map((item) => item.key).join("、")}` : "",
    config.riskPhrases ? `风险话术：${config.riskPhrases.join("、")}` : "",
    "回复要求：每次只说 1-2 句，语气自然，像真实门店顾客；如果员工没讲清关键点，就继续追问；如果出现不合规或强迫表达，要表现出顾虑。"
  ].filter(Boolean).join("\n");
}

function renderRealtimeVoice(status = null) {
  const scenario = currentScenario();
  const role = currentCustomerRole();
  const prompt = buildRealtimeRolePrompt();
  if (realtimeTitle) realtimeTitle.textContent = scenario.name;
  realtimePanel.innerHTML = `
    <section class="realtime-hero">
      <img src="${scenario.prep.image}" alt="${scenario.name}虚拟顾客" />
      <div>
        <span>新入口体验</span>
        <h3>端到端实时语音</h3>
        <p>保留原有 ASR + GLM 评分链路，这里用于验证豆包实时语音模型的角色扮演能力。</p>
      </div>
    </section>
    <section class="realtime-card">
      <div class="realtime-card-head">
        <span>顾客角色</span>
        <strong>${role.name}，${role.age} 岁</strong>
      </div>
      <p>${role.profile}</p>
      <em>${role.initialUtterance}</em>
    </section>
    <section class="realtime-card">
      <div class="realtime-card-head">
        <span>模型预设</span>
        <strong>将注入到豆包实时语音会话</strong>
      </div>
      <pre>${escapeHtml(prompt)}</pre>
    </section>
    <section class="realtime-status ${status?.ok ? "is-ok" : status ? "is-warn" : ""}">
      <strong>${status ? (status.ok ? "连接检查通过" : "连接检查未通过") : "接入状态"}</strong>
      <p>${status ? escapeHtml(status.message || "已返回检查结果") : "点击下方按钮检查服务端是否已能连接豆包实时语音。密钥只保存在服务端，不会下发到浏览器。"}</p>
      ${status?.latencyMs ? `<em>连接耗时 ${status.latencyMs}ms</em>` : ""}
    </section>
    <div class="realtime-actions">
      <button class="ghost-button" type="button" id="checkRealtimeVoice">检查连接</button>
      <button class="solid-button" type="button" disabled>语音通话开发中</button>
    </div>
  `;
  realtimePanel.querySelector("#checkRealtimeVoice").addEventListener("click", checkRealtimeVoice);
}

async function checkRealtimeVoice() {
  const button = realtimePanel.querySelector("#checkRealtimeVoice");
  if (button) {
    button.disabled = true;
    button.textContent = "检查中...";
  }
  try {
    const result = await postJson("/api/doubao/realtime/check", { scenarioId: state.scenarioId });
    renderRealtimeVoice(result);
  } catch (error) {
    renderRealtimeVoice({
      ok: false,
      message: "暂未连通豆包实时语音。请确认服务端环境变量、实时语音权限和资源 ID。"
    });
  }
}

function renderLearn() {
  const scenario = currentScenario();
  const card = scenario.cards[state.cardIndex];
  learnScenario.textContent = scenario.name;
  cardProgress.textContent = "";
  scenario.cards.forEach((_, index) => {
    const marker = document.createElement("span");
    marker.className = index <= state.cardIndex ? "is-active" : "";
    cardProgress.appendChild(marker);
  });
  learnCard.innerHTML = `
    <span class="tag">${scenario.kind}</span>
    <h2>${card.title}</h2>
    <p class="kicker">${card.subtitle}</p>
    <p class="lead">${card.lead}</p>
    <section>
      <h3 class="section-title">必须掌握</h3>
      <ul>${card.points.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
    <section class="avoid-box">
      <h3 class="section-title">不要这样说</h3>
      <ul>${card.avoid.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
  `;
  document.querySelector("#prevCard").disabled = state.cardIndex === 0;
  document.querySelector("#nextCard").textContent = state.cardIndex === scenario.cards.length - 1 ? "去小测" : "下一张";
}

function renderQuiz() {
  const scenario = currentScenario();
  const item = scenario.quiz[state.quizIndex];
  quizScenario.textContent = scenario.name;
  quizCard.innerHTML = `
    <div class="quiz-top">
      <span class="tag">第 ${state.quizIndex + 1} / ${scenario.quiz.length} 题</span>
      <span class="quiz-score">已答对 ${state.quizScore} 题</span>
    </div>
    <div class="quiz-progress" aria-hidden="true">
      ${scenario.quiz.map((_, index) => `<span class="${index <= state.quizIndex ? "is-active" : ""}"></span>`).join("")}
    </div>
    <h2 class="quiz-question">${item.q}</h2>
    <div class="answer-list">
      ${item.options.map((option, index) => `<button class="answer-button" type="button" data-answer="${index}"><span>${String.fromCharCode(65 + index)}</span><strong>${option}</strong></button>`).join("")}
    </div>
    <section class="quiz-explain" id="quizExplain" hidden></section>
    <button class="solid-button quiz-next" id="quizNext" type="button" hidden>下一题</button>
  `;
  quizCard.querySelectorAll(".answer-button").forEach((button) => {
    button.addEventListener("click", () => handleAnswer(Number(button.dataset.answer)));
  });
}

function handleAnswer(answer) {
  const scenario = currentScenario();
  const item = scenario.quiz[state.quizIndex];
  const buttons = quizCard.querySelectorAll(".answer-button");
  buttons.forEach((button) => {
    button.disabled = true;
    const value = Number(button.dataset.answer);
    if (value === item.answer) button.classList.add("is-correct");
    if (value === answer && answer !== item.answer) button.classList.add("is-wrong");
  });
  const isCorrect = answer === item.answer;
  if (isCorrect) state.quizScore += 1;
  const explain = document.querySelector("#quizExplain");
  const next = document.querySelector("#quizNext");
  explain.hidden = false;
  explain.className = `quiz-explain ${isCorrect ? "is-pass" : "is-alert"}`;
  explain.innerHTML = `
    <strong>${isCorrect ? "回答正确" : "建议记住"}</strong>
    <p>${item.note}</p>
  `;
  next.hidden = false;
  next.textContent = state.quizIndex === scenario.quiz.length - 1 ? "查看结果" : "下一题";
  next.addEventListener("click", () => {
    if (state.quizIndex < scenario.quiz.length - 1) {
      state.quizIndex += 1;
      renderQuiz();
      return;
    }
    if (state.quizScore >= 2) {
      saveCompleted(scenario.id);
      renderPrep();
      showView("prep");
    } else {
      quizCard.innerHTML = `
        <div class="quiz-result">
          <span class="tag">小测未通过</span>
          <h2>答对 ${state.quizScore} / ${scenario.quiz.length} 题</h2>
          <p>建议再看一遍资料卡，重点记住风险话术和标准回应。</p>
          <button class="solid-button" type="button" id="retryLearn">回到学习</button>
        </div>
      `;
      document.querySelector("#retryLearn").addEventListener("click", () => {
        state.quizIndex = 0;
        state.quizScore = 0;
        renderLearn();
        showView("learn");
      });
    }
  });
}

function renderPractice() {
  const scenario = currentScenario();
  const config = currentPracticeConfig();
  const role = currentCustomerRole();
  const targetBrief = scenario.prep.goals.map((goal) => goal.split("：")[0]).join(" / ");
  state.practiceSession = {
    id: `${scenario.id}-${Date.now()}`,
    scenarioId: scenario.id,
    scenarioName: scenario.name,
    roleName: role.name,
    startedAt: Date.now(),
    transcript: [{ speaker: "AI顾客", text: role.initialUtterance }],
    results: [],
    finalResult: null,
    turnIndex: 0,
    maxTurns: 3,
    serverId: null
  };
  createServerPracticeSession(scenario.id).then((session) => {
    if (session && state.practiceSession?.scenarioId === scenario.id) {
      state.practiceSession.serverId = session.id;
      if (session.initialUtterance) {
        state.practiceSession.transcript = [{ speaker: "AI顾客", text: session.initialUtterance }];
        const firstMessage = chatPanel.querySelector(".message.customer");
        if (firstMessage) firstMessage.textContent = session.initialUtterance;
      }
    }
  });
  if (practiceScenario) practiceScenario.textContent = scenario.name;
  feedbackPanel.hidden = true;
  feedbackPanel.textContent = "";
  liveReviewToast.hidden = true;
  liveReviewToast.classList.remove("is-visible");
  replyInput.value = "";
  feedbackPanel.hidden = true;
  resetSpeechComposer();
  practiceRoleCard.innerHTML = `
    <div class="stage-topbar">
      <button class="stage-back" type="button" data-action="drill" aria-label="返回">‹</button>
      <span>${config.mode}</span>
      <button class="stage-end" type="button" data-practice-end>结束</button>
    </div>
    <img class="digital-human-img" src="${scenario.prep.image}" alt="${scenario.name}虚拟顾客" />
    <div class="role-floating-card">
      <div>
        <span>AI 顾客</span>
        <strong>${role.name}，${role.age} 岁</strong>
        <p>${role.profile}</p>
      </div>
      <em>${targetBrief}</em>
    </div>
  `;
  chatPanel.innerHTML = `
    <div class="chat-row customer-row">
      <div class="message customer">${role.initialUtterance}</div>
    </div>
  `;
  practiceRoleCard.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      renderDrill();
      showView("drill");
    });
  });
  practiceRoleCard.querySelector("[data-practice-end]").addEventListener("click", finishPractice);
  inspirationCard.innerHTML = `
    <div class="inspiration-title">
      <span>灵感提示</span>
      <strong>当前可以先这样讲</strong>
    </div>
    <p>${role.inspiration}</p>
  `;
}

function setSpeechStatus(text) {
  if (speechStatus) speechStatus.textContent = text;
}

function setVadMode(mode, statusText) {
  if (vadMode === mode && !statusText) return;
  vadMode = mode;
  if (voiceLive) {
    voiceLive.classList.toggle("is-speaking", mode === "speaking");
    voiceLive.classList.toggle("is-silent", mode === "silent");
    voiceLive.classList.toggle("is-waiting", mode === "waiting");
    const label = voiceLive.querySelector("em");
    if (label) {
      label.textContent = ({
        speaking: "正在听你说话",
        silent: "检测到停顿，可继续补充",
        waiting: "等待清晰声音",
        idle: "正在录音并实时转写"
      })[mode] || "正在录音并实时转写";
    }
  }
  if (statusText) setSpeechStatus(statusText);
}

function resetVadState() {
  vadMode = "idle";
  vadSawSpeech = false;
  vadSilenceStartedAt = 0;
  vadLastStatusAt = 0;
  vadLastLongSilenceAt = 0;
  if (voiceLive) voiceLive.classList.remove("is-speaking", "is-silent", "is-waiting");
}

function rmsLevel(samples) {
  let sum = 0;
  for (let index = 0; index < samples.length; index += 1) {
    sum += samples[index] * samples[index];
  }
  return Math.sqrt(sum / Math.max(1, samples.length));
}

function updateVad(samples) {
  if (!replyForm.classList.contains("is-recording") || stoppingVoiceRecording) return;
  const now = Date.now();
  const rms = rmsLevel(samples);
  const isSpeech = rms > 0.018;
  const isNoisy = rms > 0.22;
  if (isSpeech) {
    vadSawSpeech = true;
    vadSilenceStartedAt = 0;
    if (isNoisy && now - vadLastStatusAt > 4200) {
      vadLastStatusAt = now;
      setVadMode("speaking", "声音偏大或环境较吵，保持正常音量说话即可");
      return;
    }
    if (vadMode !== "speaking") {
      setVadMode("speaking", "检测到说话，正在实时转写");
    }
    return;
  }

  if (!vadSawSpeech) {
    if (recordingStartedAt && now - recordingStartedAt > 2800 && now - vadLastStatusAt > 4500) {
      vadLastStatusAt = now;
      setVadMode("waiting", "还没检测到清晰声音，可以靠近手机正常说");
    }
    return;
  }

  if (!vadSilenceStartedAt) vadSilenceStartedAt = now;
  const silenceMs = now - vadSilenceStartedAt;
  if (silenceMs > 1200 && vadMode !== "silent") {
    setVadMode("silent", "检测到停顿，不会自动结束；可以继续补充或提交点评");
    return;
  }
  if (silenceMs > 8500 && now - vadLastLongSilenceAt > 8500) {
    vadLastLongSilenceAt = now;
    setVadMode("waiting", "已经安静一会儿，可继续说，或提交当前文字点评");
  }
}

function setVoiceButtonState(stateName = "idle") {
  if (!voiceCapture) return;
  const labels = {
    idle: ["开始录音", "说完后点停止"],
    listening: ["停止转写", "正在听你说"],
    manual: ["手动输入", "语音不可用"],
    retry: ["重新录音", "或直接修改文字"]
  };
  const [title, subtitle] = labels[stateName] || labels.idle;
  voiceCapture.innerHTML = `<span>${title}</span><em>${subtitle}</em>`;
  voiceCapture.setAttribute("aria-label", title);
}

function speechSupported() {
  return Boolean(BrowserSpeechRecognition);
}

function resetSpeechComposer() {
  stopVoiceRecording({ keepText: true, silent: true });
  replyForm.classList.remove("is-recording", "is-listening", "is-manual");
  resetVadState();
  voiceCapture.disabled = false;
  voiceCapture.classList.remove("is-recording", "is-listening");
  setVoiceButtonState(speechSupported() ? "idle" : "manual");
  if (voiceLive) voiceLive.hidden = true;
  setSpeechStatus(speechSupported() ? "先录音，确认文字后提交点评" : "当前环境未开放语音识别，已切换文本输入");
}

function switchToManualSpeech(reason = "语音通道暂不可用") {
  isListening = false;
  stopVoiceRecording({ keepText: true, silent: true });
  replyForm.classList.remove("is-recording", "is-listening");
  replyForm.classList.add("is-manual");
  voiceCapture.classList.remove("is-recording", "is-listening");
  setVoiceButtonState("manual");
  replyInput.focus();
  setSpeechStatus(`${reason}，可直接输入后提交点评`);
}

function ensureSpeechRecognition() {
  if (!BrowserSpeechRecognition) return null;
  if (speechRecognition) return speechRecognition;
  speechRecognition = new BrowserSpeechRecognition();
  speechRecognition.lang = "zh-CN";
  speechRecognition.interimResults = true;
  speechRecognition.continuous = true;
  speechRecognition.onstart = () => {
    isListening = true;
    replyForm.classList.add("is-recording", "is-listening");
    voiceCapture.classList.add("is-recording", "is-listening");
    setVoiceButtonState("listening");
    setSpeechStatus("正在录音并实时转写，请直接说出完整话术");
  };
  speechRecognition.onresult = (event) => {
    finalTranscript = "";
    interimTranscript = "";
    Array.from(event.results).forEach((result) => {
      const text = result[0]?.transcript || "";
      if (result.isFinal) {
        finalTranscript += text;
      } else {
        interimTranscript += text;
      }
    });
    const transcript = `${browserCommittedTranscript}${finalTranscript}${interimTranscript}`.trim();
    replyInput.value = transcript;
    setSpeechStatus(event.results[event.results.length - 1]?.isFinal ? "已转成文字，可修改后提交点评" : "正在实时转写...");
  };
  speechRecognition.onerror = (event) => {
    isListening = false;
    if (event.error === "no-speech" && replyForm.classList.contains("is-recording") && !stoppingVoiceRecording) {
      setSpeechStatus("暂时没有检测到声音，继续说话会自动接着识别");
      return;
    }
    const reasonMap = {
      "not-allowed": "麦克风权限未开启",
      "service-not-allowed": "浏览器语音服务不可用",
      "network": "语音服务网络异常",
      "no-speech": "没有检测到清晰语音",
      "audio-capture": "未检测到可用麦克风"
    };
    switchToManualSpeech(reasonMap[event.error] || "语音识别暂不可用");
  };
  speechRecognition.onend = () => {
    isListening = false;
    const currentText = replyInput.value.trim();
    if (currentText) browserCommittedTranscript = currentText;
    replyForm.classList.remove("is-listening");
    voiceCapture.classList.remove("is-listening");
    if (replyForm.classList.contains("is-recording") && !stoppingVoiceRecording) {
      window.setTimeout(() => {
        if (!replyForm.classList.contains("is-recording") || stoppingVoiceRecording) return;
        try {
          speechRecognition.start();
        } catch {
          setSpeechStatus("浏览器语音服务已暂停，可重新录音或手动输入");
        }
      }, 180);
      return;
    }
    if (!replyForm.classList.contains("is-recording")) {
      setVoiceButtonState(replyInput.value.trim() ? "retry" : "idle");
    }
    if (replyInput.value.trim()) {
      setSpeechStatus("转写已停止，可修改文字后提交点评");
    } else if (replyForm.classList.contains("is-recording")) {
      setSpeechStatus("没有识别到文字，可重新录音或手动输入");
    }
  };
  return speechRecognition;
}

function updateVoiceTimer() {
  if (!voiceTimer || !recordingStartedAt) return;
  const seconds = Math.max(0, Math.floor((Date.now() - recordingStartedAt) / 1000));
  const minuteText = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondText = String(seconds % 60).padStart(2, "0");
  voiceTimer.textContent = `${minuteText}:${secondText}`;
}

function downsampleTo16k(input, sampleRate) {
  if (sampleRate === 16000) return floatTo16BitPcm(input);
  const ratio = sampleRate / 16000;
  const length = Math.floor(input.length / ratio);
  const output = new Float32Array(length);
  for (let index = 0; index < length; index += 1) {
    const start = Math.floor(index * ratio);
    const end = Math.min(Math.floor((index + 1) * ratio), input.length);
    let sum = 0;
    for (let cursor = start; cursor < end; cursor += 1) sum += input[cursor];
    output[index] = sum / Math.max(1, end - start);
  }
  return floatTo16BitPcm(output);
}

function floatTo16BitPcm(input) {
  const output = new Int16Array(input.length);
  for (let index = 0; index < input.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, input[index]));
    output[index] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }
  return output.buffer;
}

function connectBackendAsr() {
  backendAsrReady = false;
  backendReconnectAllowed = true;
  backendSessionTranscript = "";
  backendAsrSocket = new WebSocket(`${wsBaseUrl()}/api/asr/stream`);
  backendAsrSocket.binaryType = "arraybuffer";
  backendAsrSocket.addEventListener("message", (event) => {
    let payload;
    try {
      payload = JSON.parse(event.data);
    } catch {
      return;
    }
    if (payload.type === "ready") {
      backendAsrReady = true;
      backendFinalized = false;
      setSpeechStatus("正在录音并通过讯飞实时转写，请直接说完整话术");
    }
    if (payload.type === "partial" || payload.type === "final") {
      backendSessionTranscript = payload.text || backendSessionTranscript;
      backendTranscript = `${backendCommittedTranscript}${backendSessionTranscript}`;
      replyInput.value = backendTranscript;
      if (payload.type === "final") {
        backendFinalized = true;
        backendCommittedTranscript = backendTranscript;
        backendSessionTranscript = "";
      }
      setSpeechStatus(payload.type === "final" ? "讯飞转写完成，可修改后提交点评" : "讯飞实时转写中...");
    }
    if (payload.type === "error") {
      switchToBrowserSpeechOrManual(payload.message || "讯飞语音识别暂不可用");
    }
  });
  backendAsrSocket.addEventListener("error", () => {
    switchToBrowserSpeechOrManual("后端语音服务连接失败");
  });
  backendAsrSocket.addEventListener("close", () => {
    backendAsrReady = false;
    if (!backendReconnectAllowed || stoppingVoiceRecording || !replyForm.classList.contains("is-recording")) return;
    if (backendTranscript) {
      backendCommittedTranscript = backendTranscript;
      backendSessionTranscript = "";
    }
    if (backendFinalized) {
      setSpeechStatus("已完成一段转写，继续说话会自动接着识别");
    }
    window.setTimeout(() => {
      if (!stoppingVoiceRecording && replyForm.classList.contains("is-recording")) connectBackendAsr();
    }, 240);
  });
}

function switchToBrowserSpeechOrManual(reason) {
  closeBackendAsr();
  if (speechSupported()) {
    const recognition = ensureSpeechRecognition();
    try {
      recognition.start();
      setSpeechStatus(`${reason}，已切换浏览器本地转写`);
    } catch {
      switchToManualSpeech(reason);
    }
    return;
  }
  switchToManualSpeech(reason);
}

function closeBackendAsr() {
  backendFinalized = false;
  backendReconnectAllowed = false;
  if (backendAsrSocket && backendAsrSocket.readyState === WebSocket.OPEN) {
    try {
      backendAsrSocket.send(JSON.stringify({ type: "end" }));
    } catch {
      // Socket may already be closing.
    }
  }
  if (backendAsrSocket) backendAsrSocket.close();
  backendAsrSocket = null;
  backendAsrReady = false;
}

async function startVoiceRecording() {
  finalTranscript = "";
  interimTranscript = "";
  browserCommittedTranscript = "";
  backendTranscript = "";
  backendCommittedTranscript = "";
  backendSessionTranscript = "";
  backendFinalized = false;
  stoppingVoiceRecording = false;
  resetVadState();
  replyInput.value = "";
  if (voiceLive) voiceLive.hidden = false;
  if (voiceTimer) voiceTimer.textContent = "00:00";
  recordingStartedAt = Date.now();
  recordingTimer = window.setInterval(updateVoiceTimer, 500);
  replyForm.classList.add("is-recording");
  voiceCapture.classList.add("is-recording");
  setVoiceButtonState("listening");
  setSpeechStatus("正在请求麦克风权限...");

  if (!hasBackendApi()) {
    switchToBrowserSpeechOrManual("当前为静态体验版，未连接后端语音服务");
    return;
  }

  try {
    recordingStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch {
    stopVoiceRecording({ keepText: true, silent: true });
    switchToManualSpeech("麦克风权限未开启");
    return;
  }

  try {
    connectBackendAsr();
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioSource = audioContext.createMediaStreamSource(recordingStream);
    audioProcessor = audioContext.createScriptProcessor(4096, 1, 1);
    audioProcessor.onaudioprocess = (event) => {
      const samples = event.inputBuffer.getChannelData(0);
      updateVad(samples);
      if (!backendAsrSocket || backendAsrSocket.readyState !== WebSocket.OPEN || !backendAsrReady) return;
      const pcm = downsampleTo16k(samples, audioContext.sampleRate);
      backendAsrSocket.send(pcm);
    };
    audioOutputMute = audioContext.createGain();
    audioOutputMute.gain.value = 0;
    audioSource.connect(audioProcessor);
    audioProcessor.connect(audioOutputMute);
    audioOutputMute.connect(audioContext.destination);
  } catch {
    stopVoiceRecording({ keepText: true, silent: true });
    switchToBrowserSpeechOrManual("讯飞转写启动失败");
  }
}

function stopVoiceRecording({ keepText = true, silent = false } = {}) {
  stoppingVoiceRecording = true;
  if (recordingTimer) {
    window.clearInterval(recordingTimer);
    recordingTimer = null;
  }
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    try {
      mediaRecorder.stop();
    } catch {
      // Recorder may already be stopped by the browser.
    }
  }
  if (audioProcessor) {
    try {
      audioProcessor.disconnect();
    } catch {
      // Audio node may already be disconnected.
    }
  }
  if (audioSource) {
    try {
      audioSource.disconnect();
    } catch {
      // Audio node may already be disconnected.
    }
  }
  if (audioOutputMute) {
    try {
      audioOutputMute.disconnect();
    } catch {
      // Audio node may already be disconnected.
    }
  }
  if (audioContext) {
    try {
      audioContext.close();
    } catch {
      // Audio context may already be closed.
    }
  }
  if (recordingStream) {
    recordingStream.getTracks().forEach((track) => track.stop());
  }
  closeBackendAsr();
  if (speechRecognition && isListening) {
    try {
      speechRecognition.stop();
    } catch {
      // Recognition may already be stopped by the browser.
    }
  }
  mediaRecorder = null;
  audioProcessor = null;
  audioSource = null;
  audioOutputMute = null;
  audioContext = null;
  recordingStream = null;
  recordingStartedAt = 0;
  isListening = false;
  resetVadState();
  replyForm.classList.remove("is-recording", "is-listening");
  voiceCapture.classList.remove("is-recording", "is-listening");
  setVoiceButtonState(replyInput.value.trim() ? "retry" : "idle");
  if (voiceLive) voiceLive.hidden = true;
  if (!keepText) replyInput.value = "";
  if (!silent) {
    setSpeechStatus(replyInput.value.trim() ? "录音已停止，可修改文字后提交点评" : "录音已停止，未识别到文字，可重试或手动输入");
  }
  window.setTimeout(() => {
    stoppingVoiceRecording = false;
  }, 0);
}

function toggleVoiceRecording() {
  if (replyForm.classList.contains("is-recording") || isListening) {
    stopVoiceRecording();
    return;
  }
  startVoiceRecording();
}

function scoreReply(text) {
  const config = currentPracticeConfig();
  const matchedChecks = config.requiredChecks
    .map((check) => ({
      ...check,
      hits: check.terms.filter((term) => text.includes(term))
    }))
    .filter((check) => check.hits.length);
  const riskHits = config.riskPhrases.filter((phrase) => text.includes(phrase));
  const rawScore = matchedChecks.reduce((sum, check) => sum + check.points, 0);
  return {
    score: riskHits.length ? Math.min(59, rawScore) : Math.min(100, rawScore),
    hits: matchedChecks.map((check) => check.key),
    matchedChecks,
    riskHits
  };
}

function practiceInspiration(scenario) {
  return currentCustomerRole().inspiration || scenario.goal;
}

function buildLiveReview(result) {
  const missing = currentPracticeConfig().requiredChecks
    .filter((check) => !result.hits.includes(check.key))
    .map((check) => check.key);
  if (result.riskHits.length) {
    return {
      tone: "warn",
      title: "这句有风险，先收住",
      text: `避开“${result.riskHits.join("、")}”。换成“不是强制、不办也能正常买”，再讲清真实权益和信息用途。`
    };
  }
  if (result.score >= 80) {
    return {
      tone: "good",
      title: "这轮可以，继续推进",
      text: `覆盖了${result.hits.join("、")}。下一句保持轻，不要反复逼办。`
    };
  }
  if (result.score >= 60) {
    return {
      tone: "ok",
      title: "方向对了，少了关键一句",
      text: `已讲到${result.hits.join("、") || "部分要点"}；再补${missing.slice(0, 2).join("、") || "顾客顾虑"}会更完整。`
    };
  }
  return {
    tone: "warn",
    title: "像真实收银台重新说一遍",
    text: `先回应顾客当下顾虑，再讲免费办理、活动权益、手机号用途，最后给“先结账”的选择。`
  };
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function polishReply(text, result) {
  const config = currentPracticeConfig();
  if (result.polishedReply && !result.polishedReply.startsWith("建议表达为：")) return result.polishedReply;
  if (result.riskHits.length) {
    return `建议避开“${result.riskHits[0]}”这类绝对化或不合规表达。${config.polishWeak}`;
  }
  return result.score >= 80 ? config.polishGood : config.polishWeak;
}

function nextCustomerUtterance(result) {
  const session = state.practiceSession;
  const role = currentCustomerRole();
  if (!session || session.turnIndex >= session.maxTurns) return "";
  if (session.turnIndex === 1) return role.nextUtterance || "";
  if (state.scenarioId === "member") {
    if (result.riskHits.length) return "你这么说我更担心了，手机号到底会怎么用？不办是不是也能正常买？";
    if (result.score < 80) return "你还没说清楚，现在办有什么用？券是今天用还是下次用？如果我不常来还有没有用？";
    return "那如果我今天先不办，下次来还能免费办吗？";
  }
  if (result.riskHits.length) return "你刚才说得有点绝对，我想确认一下，这个是不是药？能保证有效吗？";
  if (result.score < 80) return "你还没问我家里人的情况，老人有高血压，孩子读小学，这样能一起买吗？";
  return "如果只想先试试，是买一盒还是两盒更合适？";
}

function nextInspirationText(result) {
  if (result.score >= 80 && !result.riskHits.length) {
    return state.scenarioId === "member"
      ? "继续保持选择权：说明下次也能办、今天不办也正常收银，不要反复逼单。"
      : "继续按人群拆分建议：儿童、成人、老人分别确认需求，老人慢病长期用药请药师把关。";
  }
  return practiceInspiration(currentScenario());
}

function showLiveReview(result) {
  const review = buildLiveReview(result);
  liveReviewToast.className = `live-review-toast is-visible is-${review.tone}`;
  liveReviewToast.hidden = false;
  liveReviewToast.innerHTML = `
    <span>${review.tone === "good" ? "亮点" : "点评"}</span>
    <strong>${review.title}</strong>
    <em>${review.text}</em>
  `;
}

function renderReport(result) {
  const scenario = currentScenario();
  const config = currentPracticeConfig();
  const session = state.practiceSession;
  const score = result?.score || 0;
  const pass = score >= 80 && !result?.riskHits?.length;
  const missed = config.requiredChecks.filter((check) => !result?.hits?.includes(check.key));
  const transcript = session?.transcript || [];
  practiceReport.innerHTML = `
    <div class="report-hero ${pass ? "is-pass" : "is-retry"}">
      <span>${pass ? "通过" : "待重练"}</span>
      <strong>${score}</strong>
      <p>${scenario.name} · ${session?.roleName || currentCustomerRole().name}</p>
    </div>
    <section class="report-section">
      <h3>维度得分</h3>
      <div class="dimension-list">
        ${config.requiredChecks.map((check) => {
          const hit = result?.matchedChecks?.find((item) => item.key === check.key);
          return `
            <div class="dimension-item ${hit ? "is-hit" : ""}">
              <span>${check.key}</span>
              <strong>${hit ? check.points : 0}/${check.points}</strong>
            </div>
          `;
        }).join("")}
      </div>
    </section>
    <section class="report-section">
      <h3>${result?.riskHits?.length ? "风险提醒" : "亮点表现"}</h3>
      <p>${result?.riskHits?.length ? `出现风险表达：${result.riskHits.join("、")}。请按标准口径重练。` : `已覆盖：${result?.hits?.join("、") || "暂无"}。`}</p>
    </section>
    <section class="report-section">
      <h3>改进建议</h3>
      <p>${missed.length ? `下次补齐：${missed.map((item) => item.key).join("、")}。${config.polishWeak}` : config.polishGood}</p>
    </section>
    <section class="report-section">
      <h3>对话记录</h3>
      <div class="transcript-list">
        ${transcript.map((item) => `
          <div>
            <span>${item.speaker}</span>
            <p>${escapeHtml(item.text)}</p>
          </div>
        `).join("")}
      </div>
    </section>
    <div class="report-actions">
      <button class="ghost-button" type="button" id="retryPractice">再练一次</button>
      <button class="solid-button" type="button" id="backToDrill">返回对练</button>
    </div>
  `;
  document.querySelector("#retryPractice").addEventListener("click", () => {
    renderPractice();
    showView("practice");
  });
  document.querySelector("#backToDrill").addEventListener("click", () => {
    renderDrill();
    renderHome();
    showView("drill");
  });
}

async function finishPractice() {
  const session = state.practiceSession;
  const fallback = scoreReply("");
  const result = session?.finalResult || fallback;
  const now = new Date();
  const record = {
    id: session?.id || `${state.scenarioId}-${Date.now()}`,
    scenarioId: state.scenarioId,
    scenarioName: currentScenario().name,
    roleName: session?.roleName || currentCustomerRole().name,
    score: result.score,
    pass: result.score >= 80 && !result.riskHits.length,
    hits: result.hits,
    riskHits: result.riskHits,
    timeText: `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
  };
  savePracticeRecord(record);
  if (record.pass) saveCompleted(state.scenarioId);
  renderReport(result);
  finishPracticeOnServer({
    ...record,
    transcript: session?.transcript || []
  });
  showView("result");
}

document.querySelector("#prevCard").addEventListener("click", () => {
  state.cardIndex = Math.max(0, state.cardIndex - 1);
  renderLearn();
});

document.querySelector("#nextCard").addEventListener("click", () => {
  const scenario = currentScenario();
  if (state.cardIndex < scenario.cards.length - 1) {
    state.cardIndex += 1;
    renderLearn();
    return;
  }
  state.quizIndex = 0;
  state.quizScore = 0;
  renderQuiz();
  showView("quiz");
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    if (action === "home") {
      renderHome();
      showView("home");
    }
    if (action === "drill") {
      renderDrill();
      showView("drill");
    }
    if (action === "study") {
      renderStudyCenter();
      showView("study");
    }
    if (action === "learn") {
      renderLearn();
      showView("learn");
    }
  });
});

document.querySelectorAll(".app-tabbar button").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.nav.replace("View", "");
    if (target === "home") renderHome();
    if (target === "drill") renderDrill();
    if (target === "study") renderStudyCenter();
    if (target === "learn") renderLearn();
    if (target === "quiz") renderQuiz();
    if (target === "practice") renderPrep();
    if (target === "prep") renderPrep();
    showView(target);
  });
});

document.querySelectorAll("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.jump;
    if (target === "drill") renderDrill();
    if (target === "study") renderStudyCenter();
    if (target === "learn") renderLearn();
    if (target === "quiz") {
      state.quizIndex = 0;
      state.quizScore = 0;
      renderQuiz();
    }
    if (target === "practice") {
      renderPrep();
      showView("prep");
      return;
    }
    showView(target);
  });
});

function enterPractice() {
  renderPractice();
  showView("practice");
}

function enterRealtimeVoice() {
  renderRealtimeVoice();
  showView("realtime");
}

document.querySelector("#startPractice").addEventListener("click", enterPractice);
document.querySelector("#startRealtimeVoice").addEventListener("click", enterRealtimeVoice);
voiceCapture.addEventListener("click", toggleVoiceRecording);

document.querySelectorAll("[data-start-learn]").forEach((button) => {
  button.addEventListener("click", () => {
    state.scenarioId = button.dataset.startLearn;
    state.cardIndex = 0;
    state.quizIndex = 0;
    state.quizScore = 0;
    localStorage.setItem("mobileScenario", state.scenarioId);
    renderLearn();
    showView("learn");
  });
});

replyForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = replyInput.value.trim();
  if (!text) {
    replyInput.focus();
    setSpeechStatus("请先说出或输入本轮话术，再提交点评");
    return;
  }
  stopVoiceRecording({ keepText: true, silent: true });
  setSpeechStatus("正在生成AI顾客追问和实时点评...");
  let result;
  try {
    result = await sendPracticeMessageToServer(text);
  } catch {
    result = scoreReply(text);
  }
  if (state.practiceSession) {
    state.practiceSession.transcript.push({ speaker: "店员", text });
    state.practiceSession.results.push(result);
    state.practiceSession.finalResult = result;
    state.practiceSession.turnIndex += 1;
  }
  const userMessage = document.createElement("div");
  userMessage.className = "chat-row user-row";
  userMessage.innerHTML = `<div class="message user">${escapeHtml(text)}</div>`;
  const inlineFeedback = document.createElement("section");
  inlineFeedback.className = "inline-feedback";
  inlineFeedback.innerHTML = `
    <div>
      <span>实时点评</span>
      <strong>${buildLiveReview(result).title}</strong>
    </div>
    <p>${buildLiveReview(result).text}</p>
    <div class="polish-box">
      <span>润色表达</span>
      <p>${polishReply(text, result)}</p>
    </div>
  `;
  chatPanel.appendChild(userMessage);
  chatPanel.appendChild(inlineFeedback);
  const followUp = result.customerReply || nextCustomerUtterance(result);
  if (followUp) {
    const customerFollowUp = document.createElement("div");
    customerFollowUp.className = "chat-row customer-row";
    customerFollowUp.innerHTML = `<div class="message customer">${escapeHtml(followUp)}</div>`;
    chatPanel.appendChild(customerFollowUp);
    if (state.practiceSession) {
      state.practiceSession.transcript.push({ speaker: "AI顾客", text: followUp });
    }
  }
  showLiveReview(result);
  feedbackPanel.hidden = true;
  feedbackPanel.textContent = "";
  replyInput.value = "";
  inspirationCard.innerHTML = `
    <div class="inspiration-title">
      <span>${followUp ? "下一步灵感" : "本轮完成"}</span>
      <strong>${followUp ? (result.score >= 80 ? "处理顾客追问" : "补齐漏掉的关键点") : "可以查看报告"}</strong>
    </div>
    <p>${followUp ? nextInspirationText(result) : "本次会话已覆盖完整流程，可查看得分、风险提醒、改进建议和对话记录。"}</p>
    <button class="finish-practice-button" type="button" id="finishPracticeInline">查看本次报告</button>
  `;
  document.querySelector("#finishPracticeInline").addEventListener("click", finishPractice);
  resetSpeechComposer();
  window.requestAnimationFrame(() => {
    chatPanel.scrollTop = chatPanel.scrollHeight;
  });
});

renderHome();
renderDrill();
renderStudyCenter();
