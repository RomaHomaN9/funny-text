// Змінюємо селектор на textarea (переконайся, що в HTML теж textarea)
const $input = document.querySelector("#input");
$input.value = "";

const urlForAudio = (type, letter) => `https://romahoman9.github.io/funny-text/audio${type}/${letter}.mp3`;

const audios = {};

// Попередня ініціалізація аудіо
for (let i = 0; i <= 25; i++) {
    const currentLetter = String.fromCharCode(97 + i);
    audios[currentLetter] = new Audio(urlForAudio("/letters", currentLetter));
}

for (let i = 0; i <= 9; i++) {
    audios["num" + i] = new Audio(urlForAudio("/numbers", i));
}

audios.notFound = new Audio(urlForAudio("", "404"));

// Функція відтворення за символом (наприклад, 'a', '1')
const playByChar = (char) => {
    let audio;
    
    if (/[a-z]/i.test(char)) {
        audio = audios[char.toLowerCase()];
    } else if (/[0-9]/.test(char)) {
        audio = audios["num" + char];
    }

    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
    } else {
        audios.notFound.currentTime = 0;
        audios.notFound.play().catch(() => {});
    }
};

// Функція для озвучування всього слова
const playWord = (word) => {
    const cleanWord = word.trim();
    for (let i = 0; i < cleanWord.length; i++) {
        setTimeout(() => {
            playByChar(cleanWord[i]);
        }, 200 * i); // Трохи збільшив затримку для чіткості
    }
};

$input.addEventListener("input", (e) => {
    // На телефонах використовуємо data (останній введений символ)
    const char = e.data; 
    
    // Якщо це пробіл або перенос рядка — озвучуємо останнє слово
    if (char === " " || char === null || e.inputType === "insertLineBreak") {
        const text = $input.value;
        const words = text.trim().split(/\s+/);
        if (words.length > 0) {
            playWord(words[words.length - 1]);
        }
        return;
    }

    // Озвучуємо конкретну літеру, якщо вона є
    if (char) {
        playByChar(char);
    }
});

// Виправлення для resize (використовуємо style, бо clientWidth тільки для читання)
window.addEventListener("resize", () => {
    $input.style.width = window.innerWidth + "px";
    $input.style.height = window.innerHeight + "px";
});

// Перший запуск resize
$input.style.width = window.innerWidth + "px";
$input.style.height = window.innerHeight + "px";
