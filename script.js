// 単語のリスト
const words = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
    "grape",
    "honeydew",
    "indigo",
    "jujube",
    "kiwi",
    "lemon",
    "mango",
    "nectarine",
    "orange",
    "pear",
    "quince",
    "raspberry",
    "strawberry",
    "tangerine",
    "ugli fruit",
    "vanilla",
    "watermelon",
    "xigua",
    "yellow watermelon",
    "zucchini"
];

// HTML要素の取得
const wordElement = document.getElementById("word");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

// ゲームの初期状態
let score = 0;
let time = 60;
let wordIndex = Math.floor(Math.random() * words.length);
let currentWord = words[wordIndex];
let isPlaying = false;
let timerId;
let timerIntervalId;

// HTML要素の更新
function updateDisplay() {
    wordElement.textContent = currentWord;
    scoreElement.textContent = `Score: ${score}`;
    timeElement.textContent = `Time: ${time}`;
}

// インプット要素のイベントリスナー
inputElement.addEventListener("input", () => {
    if (inputElement.value.trim() === currentWord) {
        // 正解の場合、スコアを加算して次の単語を表示する
        score++;
        inputElement.value = "";
        wordIndex = Math.floor(Math.random() * words.length);
        currentWord = words[wordIndex];
        updateDisplay();
    }
});

// スタートボタンのクリックイベントリスナー
startBtn.addEventListener("click", () => {
    if (!isPlaying) {
        isPlaying = true;
        updateDisplay();
        timerId = setTimeout(() => {
            clearInterval(timerIntervalId);
            inputElement.disabled = true;
            alert(`Game over! Your score is ${score}.`);
            isPlaying = false;
        }, 60 * 1000);
        timerIntervalId = setInterval(() => {
            time--;
            updateDisplay();
            if (time <= 0) {
                clearInterval(timerIntervalId);
                isPlaying = false;
            }
        }, 1000);
    }
});

// リセットボタンのクリックイベントリスナー
resetBtn.addEventListener("click", () => {
    // ゲームの状態を初期化
    score = 0;
    time = 60;
    wordIndex = Math.floor(Math.random() * words.length);
    currentWord = words[wordIndex];
    isPlaying = false;
    inputElement.disabled = false;
    inputElement.value = "";

    // タイマーを停止
    clearInterval(timerIntervalId);
    clearTimeout(timerId);

    // HTML要素を更新
    updateDisplay();
});