const $input = document.querySelector("#input");
$input.value = "";

const urlForAudio = (type, letter) => `https://romahoman9.github.io/funny-text/audio${type}/${letter}.mp3`;

const audios = {};

for (let i = 0; i <= 25; i++) {
    const currentLetter = String.fromCharCode(97 + i);

    audios[currentLetter] = new Audio(urlForAudio("/letters", currentLetter));
}

for (let i = 0; i <= 9; i++) {
    audios["num" + i] = new Audio(urlForAudio("/numbers", i));
}

audios.notFound = new Audio(urlForAudio("", "404"));

console.log("started");

const playAudio = (name) => {
    if (name.startsWith("Key")) {
        const getAudio = audios[name[3].toLocaleLowerCase()];

        if (!getAudio.paused) getAudio.currentTime = 0;
        getAudio.play();
        return;
    }
    if (name.startsWith("Digit")) {
        const getAudio = audios["num" + name[5].toLocaleLowerCase()];

        if (!getAudio.paused) getAudio.currentTime = 0;
        getAudio.play();
        return;
    }
    if (name === "Space" || name == "Enter") {
        const pos = $input.selectionStart;
        const textBefore = $input.value.substring(0, pos).trim();

        const words = textBefore.split(/\s+/);
        const lastWord = words[words.length - 1];

        for (let i = 0; i < lastWord.length; i++) {
            console.log(1000 * (i + 1));
            setTimeout(
                () => {
                    playAudio(lastWord[i]);
                },
                150 * (i + 1),
            );
        }

        return;
    }
    const getAudio = audios[name];

    if (getAudio && !getAudio.paused) getAudio.currentTime = 0;
    getAudio.play().catch(() => {
        const getAudio = audios.notFound;

        if (!getAudio.paused) getAudio.currentTime = 0;
        getAudio.play();
    });

    console.log(name);
};

$input.addEventListener("keydown", (e) => playAudio(e.code));

window.addEventListener("resize", () => {
    $input.clientWidth = window.innerWidth;
    $input.clientHeight = window.innerHeight;
});
