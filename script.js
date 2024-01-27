// �P��̃��X�g
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

// HTML�v�f�̎擾
const wordElement = document.getElementById("word");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

// �Q�[���̏������
let score = 0;
let time = 60;
let wordIndex = Math.floor(Math.random() * words.length);
let currentWord = words[wordIndex];
let isPlaying = false;
let timerId;
let timerIntervalId;

// HTML�v�f�̍X�V
function updateDisplay() {
    wordElement.textContent = currentWord;
    scoreElement.textContent = `Score: ${score}`;
    timeElement.textContent = `Time: ${time}`;
}

// �C���v�b�g�v�f�̃C�x���g���X�i�[
inputElement.addEventListener("input", () => {
    if (inputElement.value.trim() === currentWord) {
        // �����̏ꍇ�A�X�R�A�����Z���Ď��̒P���\������
        score++;
        inputElement.value = "";
        wordIndex = Math.floor(Math.random() * words.length);
        currentWord = words[wordIndex];
        updateDisplay();
    }
});

// �X�^�[�g�{�^���̃N���b�N�C�x���g���X�i�[
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

// ���Z�b�g�{�^���̃N���b�N�C�x���g���X�i�[
resetBtn.addEventListener("click", () => {
    // �Q�[���̏�Ԃ�������
    score = 0;
    time = 60;
    wordIndex = Math.floor(Math.random() * words.length);
    currentWord = words[wordIndex];
    isPlaying = false;
    inputElement.disabled = false;
    inputElement.value = "";

    // �^�C�}�[���~
    clearInterval(timerIntervalId);
    clearTimeout(timerId);

    // HTML�v�f���X�V
    updateDisplay();
});