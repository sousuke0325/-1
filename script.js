const questions = [
    {
        question: "1. あなたは普段どのように人々と関わりますか？",
        options: ["積極的に関わる", "あまり関わらない", "他人と関わりたくない"]
    },
    {
        question: "2. ストレスがたまったとき、あなたの反応は？",
        options: ["冷静に対処する", "怒りっぽくなる", "他人に八つ当たりする"]
    },
    {
        question: "3. 他人が困っているとき、あなたはどうしますか？",
        options: ["手助けする", "関心を示すが手助けはしない", "無視する"]
    },
    // 新しい質問を追加
    {
        question: "4. あなたの人生の目標は何ですか？",
        options: ["成功と富を手にすること", "他人を助けること", "自分の幸せを追求すること"]
    },
    {
        question: "5. 自分の行動について、他人からどのようなフィードバックをよく受けますか？",
        options: ["冷静で合理的", "情緒的で攻撃的", "無関心で無責任"]
    },
    // 他の質問を追加
    {
        question: "6. あなたは普段、どのような状況で最もストレスを感じますか？",
        options: ["締め切りが迫ったとき", "人前で話すとき", "人間関係に問題があるとき"]
    },
    {
        question: "7. 他人の弱みや欠点を見つけたとき、あなたの感情はどうなりますか？",
        options: ["同情する", "喜ぶ", "興味を持たない"]
    },
    {
        question: "8. 自分の成功を妬む人々をどう思いますか？",
        options: ["理解できる", "許せない", "興味を持たない"]
    },
    {
        question: "9. あなたがストレスを感じたとき、どのような方法でリラックスしますか？",
        options: ["運動する", "音楽を聴く", "他人に愚痴をこぼす"]
    },
    {
        question: "10. あなたの行動をどのように他人に説明しますか？",
        options: ["常識的で合理的", "衝動的で感情的", "理解しにくい"]
    },
    {
        question: "11. あなたは自分の過ちを認めやすいですか？",
        options: ["はい", "いいえ", "まあまあ"]
    },
    {
        question: "12. 他人の感情に共感することができますか？",
        options: ["はい", "いいえ", "時々"]
    },
    {
        question: "13. あなたはしばしば他人を操ることがありますか？",
        options: ["はい", "いいえ", "稀に"]
    },
    {
        question: "14. あなたはどのようなタイプの映画が好きですか？",
        options: ["ホラー", "ドラマ", "コメディ"]
    },
    {
        question: "15. あなたがリーダーシップの立場にあるとき、どのようなスタイルを取りますか？",
        options: ["指示を出す", "チームと協力する", "リーダーシップは避ける"]
    },
    {
        question: "16. 他人の幸福を妬むことがありますか？",
        options: ["はい", "いいえ", "時々"]
    },
    {
        question: "17. 他人の悲しみを笑いに変えることがありますか？",
        options: ["はい", "いいえ", "たまに"]
    },
    {
        question: "18. あなたはしばしば他人の信頼を裏切りますか？",
        options: ["はい", "いいえ", "まれに"]
    },
    {
        question: "19. あなたが怒りを感じたとき、どのように反応しますか？",
        options: ["冷静に対処する", "感情的になる", "他人に八つ当たりする"]
    },
    {
        question: "20. あなたは普段、他人の意見をどのように受け入れますか？",
        options: ["真剣に検討する", "無視する", "反発する"]
    }
];

let currentQuestion = 0;
let userAnswers = [];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

// 質問を表示する関数
function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = "";
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => {
            userAnswers.push(index);
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion();
            } else {
                showResult();
            }
        });
        optionsElement.appendChild(button);
    });
}

// 結果を表示する関数
function showResult() {
    const score = calculateScore();
    const result = calculateResult(score);
    questionElement.textContent = "あなたのサイコパス度は... " + result.percentage + "%";
    optionsElement.innerHTML = "結果: " + result.label;
    nextBtn.style.display = "none"; // ボタンを非表示にする
}

// スコアを計算する関数
function calculateScore() {
    let score = 0;
    userAnswers.forEach(answer => {
        score += answer; // 簡単な例として、選択肢の番号を加算
    });
    return score;
}

// 結果を計算する関数
function calculateResult(score) {
    const maxScore = questions.length * (questions[0].options.length - 1);
    const percentage = Math.round((score / maxScore) * 100);
    let label = "";
    if (percentage >= 70) {
        label = "非常に高い";
    } else if (percentage >= 50) {
        label = "高い";
    } else if (percentage >= 30) {
        label = "普通";
    } else {
        label = "低い";
    }
    return { percentage, label };
}

// 次の質問ボタンのクリックイベント
nextBtn.addEventListener("click", () => {
    showQuestion();
});

// 最初の質問を表示
showQuestion();
