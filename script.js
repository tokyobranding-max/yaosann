const domains = {
    direction: {
        name: "方針伝達",
        short: "伝えたつもりのズレ",
        side: "left",
        description: "経営や本社の優先順位が、現場で同じ意味に受け取られているかを見る領域です。",
        risk: "指示の解釈違い、優先順位の揺れ、確認の増加が起きやすくなります。",
        question: "現場の方は、今いちばん優先することを同じ言葉で説明できますか。",
        action: "次の指示では、目的、優先順位、完了条件を1セットで伝えてみる。"
    },
    role: {
        name: "役割明確度",
        short: "仕事の境界の曖昧さ",
        side: "right",
        description: "誰が決め、誰が動き、誰が確認するかが見えているかを見る領域です。",
        risk: "相談待ち、差し戻し、責任者への判断集中が起きやすくなります。",
        question: "止まりやすい仕事では、最終判断者は誰になっていますか。",
        action: "詰まる業務を1つ選び、決める人と動く人を分けて書く。"
    },
    meeting: {
        name: "会議実行度",
        short: "話して終わる会議",
        side: "right",
        description: "会議が担当、期限、確認方法まで落ちているかを見る領域です。",
        risk: "同じ論点の再議論、実行漏れ、会議疲れが増えやすくなります。",
        question: "会議後に決定事項を誰がどこで確認していますか。",
        action: "次回会議では、最後に担当、期限、確認場所だけを残す。"
    },
    dependency: {
        name: "属人化負荷",
        short: "できる人頼み",
        side: "right",
        description: "判断、情報、段取りが特定の人に寄りすぎていないかを見る領域です。",
        risk: "休めない人が生まれ、引き継ぎと改善が後回しになります。",
        question: "その人が1週間抜けると、止まりそうな仕事は何ですか。",
        action: "担当者しか知らない情報を1つ、共有場所に移す。"
    },
    voice: {
        name: "本音表出度",
        short: "言えない空気",
        side: "left",
        description: "違和感、反対意見、現場の声が問題になる前に上がるかを見る領域です。",
        risk: "不満が水面下に残り、急な離職や抵抗として表れやすくなります。",
        question: "最近、現場から上がった耳の痛い意見は何でしたか。",
        action: "困りごとを聞く場で、改善案より先に事実を1つ聞く。"
    },
    manager: {
        name: "管理職摩耗",
        short: "間に立つ人の疲弊",
        side: "left",
        description: "リーダーや管理職が翻訳と調整を抱え込みすぎていないかを見る領域です。",
        risk: "管理職が推進役ではなく緩衝材になり、改善が止まりやすくなります。",
        question: "管理職が毎週繰り返し調整している摩擦は何ですか。",
        action: "管理職が抱える板挟みを1件選び、判断基準を上位者と揃える。"
    }
};

const questions = [
    ["direction", "経営者や本社が大切にしている優先順位を、現場メンバーも同じ言葉で説明できる。", false],
    ["direction", "指示を出した後に、現場側の解釈違いが起きることが多い。", true],
    ["direction", "現場にお願いする仕事には、目的と完了条件まで添えている。", false],
    ["role", "誰が最終判断者か曖昧な仕事がある。", true],
    ["role", "困りごとが起きた時、相談先と判断者が分かれていても迷わず動ける。", false],
    ["role", "役割が曖昧なために、同じ確認が責任者へ戻ってくる。", true],
    ["meeting", "会議後に担当者、期限、確認方法が決まっている。", false],
    ["meeting", "同じ論点を何度も会議で話していると感じる。", true],
    ["meeting", "決まったことが次回会議までに進んだか確認できる。", false],
    ["dependency", "その人が休むと止まりそうな業務が複数ある。", true],
    ["dependency", "情報は人ではなく、資料や共有場所にも残っている。", false],
    ["dependency", "経験者の段取りに頼っていて、新しい人が追いつきにくい。", true],
    ["voice", "現場から違和感や反対意見が上がる場がある。", false],
    ["voice", "不満が表に出る前に、空気の悪化で気づくことが多い。", true],
    ["voice", "責任者にとって耳の痛い情報も、早めに共有される。", false],
    ["manager", "管理職やリーダーが、上と現場の調整役に追われている。", true],
    ["manager", "現場改善は一部の責任者の頑張りに依存している。", true],
    ["manager", "管理職が現場を進めるための判断基準を持てている。", false]
].map(([domain, text, reverse], index) => ({ domain, text, reverse, index }));

const scales = [
    { value: 1, label: "まったく", detail: "当てはまらない" },
    { value: 2, label: "あまり", detail: "当てはまらない" },
    { value: 3, label: "どちらとも", detail: "いえない" },
    { value: 4, label: "やや", detail: "当てはまる" },
    { value: 5, label: "とても", detail: "当てはまる" }
];

const typeCopy = {
    direction: ["伝達すれ違い型", "伝えた意図が、現場で別の意味に変わりやすい状態です。"],
    role: ["役割迷子型", "誰が決めて誰が動くかの境界で、仕事が止まりやすい状態です。"],
    meeting: ["会議停滞型", "話し合いはあるのに、実行に落ちる場所で詰まりやすい状態です。"],
    dependency: ["できる人依存型", "一部の人の経験と段取りに、前進が寄りやすい状態です。"],
    voice: ["本音埋没型", "違和感が表に出る前に、空気や離職の兆しで現れやすい状態です。"],
    manager: ["板挟み疲弊型", "間に立つ人が調整を抱え、推進役になりにくい状態です。"]
};

const screens = Array.from(document.querySelectorAll(".screen"));
const state = {
    screen: "welcome",
    role: "経営者",
    pain: "現場が動かない",
    answers: Array(questions.length).fill(null),
    questionIndex: 0,
    selectedDomain: "meeting"
};

const phaseEyebrow = document.getElementById("phaseEyebrow");
const phaseTitle = document.getElementById("phaseTitle");
const progressLabel = document.getElementById("progressLabel");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const questionCount = document.getElementById("questionCount");
const domainBadge = document.getElementById("domainBadge");
const scaleButtons = document.getElementById("scaleButtons");
const domainDots = document.getElementById("domainDots");

function showScreen(name) {
    state.screen = name;
    screens.forEach((screen) => screen.classList.toggle("active", screen.dataset.screen === name));
    window.scrollTo({ top: 0, behavior: "auto" });

    const phase = {
        welcome: ["Start", "責任者視点のセルフチェック"],
        profile: ["Profile", "今の組織を少しだけ教えてください"],
        questions: ["Diagnosis", "18問で詰まり傾向を整理します"],
        result: ["Map Result", "次に確認する場所が見えました"]
    }[name];

    phaseEyebrow.textContent = phase[0];
    phaseTitle.textContent = phase[1];
    renderProgress();
}

function renderProgress() {
    const answered = state.answers.filter(Boolean).length;
    progressLabel.textContent = state.screen === "welcome" ? "0 / 18" : `${answered} / ${questions.length}`;
    progressBar.style.width = `${(answered / questions.length) * 100}%`;
}

function setupChoiceGroup(groupName, key) {
    const buttons = Array.from(document.querySelectorAll(`[data-choice-group="${groupName}"] button`));
    buttons.forEach((button) => {
        button.classList.toggle("selected", button.dataset.value === state[key]);
        button.addEventListener("click", () => {
            state[key] = button.dataset.value;
            buttons.forEach((candidate) => {
                candidate.classList.toggle("selected", candidate.dataset.value === state[key]);
            });
        });
    });
}

function renderDomainDots() {
    const currentDomain = questions[state.questionIndex].domain;
    domainDots.innerHTML = "";

    Object.entries(domains).forEach(([id, domain]) => {
        const domainQuestionIndexes = questions.filter((question) => question.domain === id).map((question) => question.index);
        const complete = domainQuestionIndexes.every((index) => state.answers[index]);
        const item = document.createElement("div");
        item.className = `domain-dot ${id === currentDomain ? "current" : ""} ${complete ? "complete" : ""}`;
        item.innerHTML = `<i></i><span>${domain.name}</span>`;
        domainDots.appendChild(item);
    });
}

function renderQuestion() {
    const question = questions[state.questionIndex];
    const currentDomain = domains[question.domain];
    domainBadge.textContent = currentDomain.name;
    questionCount.textContent = `Question ${state.questionIndex + 1} / ${questions.length}`;
    questionText.textContent = question.text;
    scaleButtons.innerHTML = "";

    scales.forEach((scale) => {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.value = scale.value;
        button.classList.toggle("selected", state.answers[state.questionIndex] === scale.value);
        button.innerHTML = `<b>${scale.value}</b><small>${scale.label}<br>${scale.detail}</small>`;
        button.addEventListener("click", () => {
            state.answers[state.questionIndex] = scale.value;
            Array.from(scaleButtons.children).forEach((candidate) => {
                candidate.classList.toggle("selected", Number(candidate.dataset.value) === scale.value);
            });
            renderProgress();
            renderDomainDots();
        });
        scaleButtons.appendChild(button);
    });

    document.getElementById("questionBackButton").disabled = state.questionIndex === 0;
    document.getElementById("questionNextButton").textContent =
        state.questionIndex === questions.length - 1 ? "MAP結果を見る" : "次へ";
    renderDomainDots();
    renderProgress();
}

function normalizedAnswer(question) {
    const value = state.answers[question.index] || 3;
    return question.reverse ? 6 - value : value;
}

function calculateScores() {
    return Object.fromEntries(Object.keys(domains).map((id) => {
        const domainQuestions = questions.filter((question) => question.domain === id);
        const total = domainQuestions.reduce((sum, question) => sum + normalizedAnswer(question), 0);
        const score = Math.round(((total - domainQuestions.length) / (domainQuestions.length * 4)) * 100);
        return [id, score];
    }));
}

function getStatus(score) {
    if (score >= 72) {
        return { label: "活かせる", point: "var(--teal)", pill: "rgba(22, 162, 138, 0.16)" };
    }
    if (score >= 48) {
        return { label: "まず確認", point: "var(--yellow)", pill: "rgba(243, 215, 53, 0.34)" };
    }
    return { label: "重点", point: "var(--deep)", pill: "rgba(21, 158, 209, 0.18)" };
}

function getTotalState(score) {
    if (score >= 80) return "前進しやすい";
    if (score >= 65) return "小さな詰まり";
    if (score >= 45) return "ズレが見えにくい";
    return "早めに整理";
}

function renderMapLabel(id, score) {
    const button = document.querySelector(`[data-domain-button="${id}"]`);
    const status = getStatus(score);
    button.type = "button";
    button.style.setProperty("--point-color", status.point);
    button.style.setProperty("--pill-color", status.pill);
    button.innerHTML = `<strong>${domains[id].name}</strong><span>${status.label}</span><em>${domains[id].short}</em>`;
    button.classList.toggle("focus", id === state.selectedDomain);
    button.onclick = () => renderDomainDetail(id, calculateScores());
}

function renderDomainDetail(id, scores) {
    state.selectedDomain = id;
    const domain = domains[id];
    const status = getStatus(scores[id]);
    document.getElementById("detailState").textContent = `${status.label} / ${scores[id]}点`;
    document.getElementById("detailState").style.background = status.pill;
    document.getElementById("detailTitle").textContent = domain.name;
    document.getElementById("detailDescription").textContent = domain.description;
    document.getElementById("detailRisk").textContent = domain.risk;
    document.getElementById("detailQuestion").textContent = domain.question;
    document.getElementById("detailAction").textContent = domain.action;
    Object.entries(scores).forEach(([domainId, score]) => renderMapLabel(domainId, score));
}

function renderScoreBars(scores) {
    const scoreBars = document.getElementById("scoreBars");
    scoreBars.innerHTML = "";

    Object.entries(scores).forEach(([id, score]) => {
        const status = getStatus(score);
        const row = document.createElement("div");
        row.className = "score-bar";
        row.style.setProperty("--bar-width", `${Math.max(score, 5)}%`);
        row.style.setProperty("--bar-color", status.point);
        row.innerHTML = `<span>${domains[id].name}</span><i></i><strong>${score}</strong>`;
        scoreBars.appendChild(row);
    });
}

function renderResult() {
    const scores = calculateScores();
    const ranked = Object.keys(scores).sort((left, right) => scores[left] - scores[right]);
    const weakest = ranked[0];
    const second = ranked[1];
    const total = Math.round(Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length);
    const [typeName, typeSummary] = typeCopy[weakest];

    state.selectedDomain = weakest;
    document.getElementById("resultType").textContent = typeName;
    document.getElementById("resultSummary").textContent =
        `${typeSummary} まずは「${domains[weakest].name}」と「${domains[second].name}」を現場と照らして確認したい結果です。`;
    document.getElementById("totalScore").textContent = total;
    document.getElementById("scoreState").textContent = getTotalState(total);
    document.querySelector(".score-stamp").style.setProperty("--score-angle", `${Math.max(total, 5)}%`);

    renderScoreBars(scores);
    renderDomainDetail(weakest, scores);
    showScreen("result");
}

document.getElementById("beginButton").addEventListener("click", () => showScreen("profile"));
document.getElementById("profileBackButton").addEventListener("click", () => showScreen("welcome"));
document.getElementById("questionStartButton").addEventListener("click", () => {
    state.questionIndex = 0;
    showScreen("questions");
    renderQuestion();
});
document.getElementById("questionBackButton").addEventListener("click", () => {
    state.questionIndex = Math.max(0, state.questionIndex - 1);
    renderQuestion();
});
document.getElementById("questionNextButton").addEventListener("click", () => {
    if (!state.answers[state.questionIndex]) {
        state.answers[state.questionIndex] = 3;
    }

    if (state.questionIndex === questions.length - 1) {
        renderResult();
        return;
    }

    state.questionIndex += 1;
    renderQuestion();
});
document.getElementById("restartButton").addEventListener("click", () => {
    state.answers = Array(questions.length).fill(null);
    state.questionIndex = 0;
    showScreen("welcome");
});

setupChoiceGroup("role", "role");
setupChoiceGroup("pain", "pain");
showScreen("welcome");
