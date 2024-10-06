const words = [
  { japanese: "りんご", roman: "ringo" },
  { japanese: "ばなな", roman: "banana" },
  { japanese: "さくらんぼ", roman: "sakuranbo" },
  { japanese: "なし", roman: "nashi" },
  { japanese: "ぶどう", roman: "budou" },
  { japanese: "いちご", roman: "ichigo" },
  { japanese: "すいか", roman: "suika" },
  { japanese: "もも", roman: "momo" },
  { japanese: "みかん", roman: "mikan" },
  { japanese: "ぱいなっぷる", roman: "painappuru" },
  { japanese: "めろん", roman: "meron" },
  { japanese: "れもん", roman: "remon" },
  { japanese: "きうい", roman: "kiui" },
  { japanese: "ざくろ", roman: "zakuro" },
  { japanese: "あんず", roman: "anzu" },
  { japanese: "まんごー", roman: "mango" },
  { japanese: "ぱぱいや", roman: "papaiya" },
  { japanese: "びわ", roman: "biwa" },
  { japanese: "くり", roman: "kuri" },
  { japanese: "かき", roman: "kaki" },
  { japanese: "あけび", roman: "akebi" },
  { japanese: "いちじく", roman: "ichijiku" },
  { japanese: "くるみ", roman: "kurumi" },
  { japanese: "らいち", roman: "raichi" },
  { japanese: "さるなし", roman: "sarunashi" },
  { japanese: "うめ", roman: "ume" },
  { japanese: "すもも", roman: "sumomo" },
  { japanese: "へんぷ", roman: "henpu" },
  { japanese: "かりん", roman: "karin" },
  { japanese: "ざぼん", roman: "zabon" },
  { japanese: "はちく", roman: "hachiku" },
  { japanese: "ゆず", roman: "yuzu" },
  { japanese: "なつめ", roman: "natsume" },
  { japanese: "くこのみ", roman: "kukonomi" },
  { japanese: "しらぬい", roman: "shiranui" },
  { japanese: "すだち", roman: "sudachi" },
  { japanese: "かぼす", roman: "kabosu" },
  { japanese: "やまもも", roman: "yamamomo" },
  { japanese: "みずたま", roman: "mizutama" },
  { japanese: "しんじゅ", roman: "shinju" },
  { japanese: "にんじん", roman: "ninjin" },
  { japanese: "たけのこ", roman: "takenoko" },
  { japanese: "たまねぎ", roman: "tamanegi" },
  { japanese: "にんにく", roman: "ninniku" },
  { japanese: "はくさい", roman: "hakusai" },
  { japanese: "ほうれんそう", roman: "hourensou" },
  { japanese: "もやし", roman: "moyashi" },
  { japanese: "れんこん", roman: "renkon" },
  { japanese: "なす", roman: "nasu" },
  { japanese: "ちんげんさい", roman: "chingensai" },
  { japanese: "だいこん", roman: "daikon" },
  { japanese: "ごぼう", roman: "gobou" },
  { japanese: "せり", roman: "seri" },
  { japanese: "みつば", roman: "mitsuba" },
  { japanese: "ねぎ", roman: "negi" },
  { japanese: "きゅうり", roman: "kyuuri" },
  { japanese: "とうがらし", roman: "tougarashi" },
  { japanese: "とまと", roman: "tomato" },
  { japanese: "さやえんどう", roman: "sayaendou" },
  { japanese: "そらまめ", roman: "soramame" },
  { japanese: "えだまめ", roman: "edamame" },
  { japanese: "とうもろこし", roman: "toumorokoshi" },
  { japanese: "じゃがいも", roman: "jagaimo" },
  { japanese: "さつまいも", roman: "satsumaimo" },
  { japanese: "かぼちゃ", roman: "kabocha" },
  { japanese: "みょうが", roman: "myouga" },
  { japanese: "しそ", roman: "shiso" },
  { japanese: "ふき", roman: "fuki" },
  { japanese: "うど", roman: "udo" },
  { japanese: "かぶ", roman: "kabu" },
  { japanese: "すずき", roman: "suzuki" },
  { japanese: "こめ", roman: "kome" },
  { japanese: "さば", roman: "saba" },
  { japanese: "あじ", roman: "aji" },
  { japanese: "いわし", roman: "iwashi" },
  { japanese: "うに", roman: "uni" },
  { japanese: "たらこ", roman: "tarako" },
  { japanese: "ししゃも", roman: "shishamo" },
  { japanese: "ほたて", roman: "hotate" },
  { japanese: "さけ", roman: "sake" },
  { japanese: "まぐろ", roman: "maguro" },
  { japanese: "ぶり", roman: "buri" },
  { japanese: "たこ", roman: "tako" },
  { japanese: "いか", roman: "ika" },
  { japanese: "えび", roman: "ebi" },
  { japanese: "かに", roman: "kani" },
  { japanese: "あわび", roman: "awabi" },
];

let currentWord = {};
let score = 0;
let mistakeCount = 0;
let questionLimit = 0;
let questionsRemaining = 0;

const wordDisplay = document.getElementById("wordDisplay");
const romanDisplay = document.getElementById("romanDisplay");
const userInput = document.getElementById("userInput");
const scoreDisplay = document.getElementById("score");
const questionCountDisplay = document.getElementById("questionCount");
const startButton = document.getElementById("startButton");
const settings = document.getElementById("settings");
const game = document.getElementById("game");
const endGame = document.getElementById("endGame");
const questionSelect = document.getElementById("questionSelect");
const retryButton = document.getElementById("retryButton");
const finalScoreDisplay = document.getElementById("finalScore");
const correctAnswersDisplay = document.getElementById("correctAnswers");
const totalQuestionsDisplay = document.getElementById("totalQuestions");
const tweetButton = document.getElementById("tweetButton");




function updateScore() {
  scoreDisplay.textContent = "スコア: " + score;
}

function updateQuestionCount() {
  questionCountDisplay.textContent = "残りの出題数: " + questionsRemaining;
}

function startGame() {
  score = 0;
  questionsRemaining = questionLimit;
  settings.classList.add("hidden");
  endGame.classList.add("hidden");
  game.classList.remove("hidden");
  userInput.disabled = false;
  updateScore();
  updateQuestionCount();
  displayNewWord();
}

function endGameSequence() {
  game.classList.add("hidden");
  endGame.classList.remove("hidden");
  correctAnswersDisplay.textContent = score;
  totalQuestionsDisplay.textContent = questionLimit;
}

startButton.addEventListener("click", () => {
  questionLimit = parseInt(questionSelect.value);
  startGame();
});

retryButton.addEventListener("click", () => {
  settings.classList.remove("hidden");
  endGame.classList.add("hidden");
});

tweetButton.addEventListener("click", () => {
  const tweetText = `今回のタイピングスコアは ${score} 点 / ${questionLimit} 問 でした。`;
  const tweetUrl = `https://x.com/intent/post?text=${encodeURIComponent(
    tweetText
  )}`;
  window.open(tweetUrl, "_blank");
});
