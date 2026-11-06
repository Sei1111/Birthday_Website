
/* ===== SCENE SETTINGS ===== */

const scenes = [
    "welcome",
    "memories",
    "letter",
    "birthday",
    "ending"
];

const sceneCounter = document.getElementById("scene-counter");
const progressFill = document.getElementById("progress-fill");


/* ===== MEMORY JOURNAL CONTENT ===== */

const memoryData = [
    {
        title: "The little things",
        text: "I hope you don't overlook the little things about yourself. The way you see the world, the things you enjoy, and even the parts of yourself you might not think much of. They all make you who you are, and I hope you learn to appreciate them just as much as the people around you do.",
        note: "Some things are worth appreciating simply because they're yours. ❀"
    },
    {
        title: "On the difficult days",
        text: "I know things won't always go the way you want them to. There will be days when everything feels a little heavier than usual, and that's okay. You don't have to figure everything out right away. Take your time, rest when you need to, and remember that one difficult day doesn't define everything ahead of you.",
        note: "Even autumn has its cloudy days. The sunlight always finds its way back. ☕"
    },
    {
        title: "At your own pace",
        text: "You don't have to keep up with everyone else. It's okay if your progress looks different, if you take longer than expected, or if you need to start over sometimes. What matters is that you keep giving yourself the chance to grow. I hope you give yourself the same patience you'd offer someone you care about.",
        note: "Not every flower blooms in the same season. ♡"
    },
    {
        title: "More chapters ahead",
        text: "Another year, and so many chapters still waiting to be written. I hope the days ahead bring you new experiences, little victories, and reasons to be proud of yourself. I hope you get to do the things you've always wanted to do, meet people who make life a little lighter, and find happiness in places you never expected.",
        note: "There's still so much of the world waiting for you, Xin. ✧"
    }
];


/* ===== SCENE NAVIGATION ===== */

function showScene(sceneName) {
    const sceneIndex = scenes.indexOf(sceneName);

    if (sceneIndex === -1) return;

    scenes.forEach(function(name) {
        const scene = document.getElementById("scene-" + name);
        scene.hidden = true;
        scene.classList.remove("active");
    });

    const selectedScene = document.getElementById("scene-" + sceneName);

    selectedScene.hidden = false;
    selectedScene.classList.add("active");

    const sceneNumber = sceneIndex + 1;

    sceneCounter.textContent =
        String(sceneNumber).padStart(2, "0") +
        " / " +
        String(scenes.length).padStart(2, "0");

    progressFill.style.width =
        (sceneNumber / scenes.length * 100) + "%";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    startDialogue(selectedScene);
}

document.querySelectorAll("[data-next]").forEach(function(button) {
    button.addEventListener("click", function() {
        showScene(button.dataset.next);
    });
});

document.querySelectorAll("[data-back]").forEach(function(button) {
    button.addEventListener("click", function() {
        showScene(button.dataset.back);
    });
});


/* ===== TYPEWRITER DIALOGUE ===== */

let typingTimer = null;

function startDialogue(scene) {
    clearInterval(typingTimer);

    const dialogue = scene.querySelector("[data-dialogue]");

    if (!dialogue) return;

    const fullText = dialogue.dataset.dialogue;
    const skipButton = scene.querySelector(".dialogue-skip");

    dialogue.textContent = "";
    let characterIndex = 0;

    skipButton.textContent = "Show text";

    typingTimer = setInterval(function() {
        dialogue.textContent += fullText.charAt(characterIndex);
        characterIndex++;

        if (characterIndex >= fullText.length) {
            clearInterval(typingTimer);
            skipButton.textContent = "Read again";
        }
    }, 28);

    skipButton.onclick = function() {
        clearInterval(typingTimer);

        if (dialogue.textContent !== fullText) {
            dialogue.textContent = fullText;
            skipButton.textContent = "Read again";
        } else {
            startDialogue(scene);
        }
    };
}


/* ===== MEMORY JOURNAL ===== */

const memoryCards = document.querySelectorAll(".memory-card");
const memoryDetail = document.getElementById("memory-detail");
const memoryNumber = document.getElementById("memory-number");
const memoryTitle = document.getElementById("memory-detail-title");
const memoryText = document.getElementById("memory-detail-text");
const memoryNote = document.getElementById("memory-detail-note");

memoryCards.forEach(function(card) {
    card.addEventListener("click", function() {
        const index = Number(card.dataset.memory);
        const memory = memoryData[index];

        if (!memory) return;

        memoryCards.forEach(function(otherCard) {
            otherCard.setAttribute(
                "aria-pressed",
                String(otherCard === card)
            );
        });

        memoryNumber.textContent =
            "JOURNAL ENTRY · " +
            String(index + 1).padStart(2, "0");

        memoryTitle.textContent = memory.title;
        memoryText.textContent = memory.text;
        memoryNote.textContent = memory.note;

        memoryDetail.hidden = false;

        memoryDetail.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
});


/* ===== INTERACTIVE LETTER ===== */

const openLetterButton = document.getElementById("open-letter");
const letterCard = document.getElementById("letter-card");

openLetterButton.addEventListener("click", function() {
    const isOpening = letterCard.hidden;

    letterCard.hidden = !isOpening;
    openLetterButton.classList.toggle("opened", isOpening);

    openLetterButton.setAttribute(
        "aria-expanded",
        String(isOpening)
    );

    const hint = openLetterButton.querySelector(".envelope-hint");

    hint.textContent = isOpening ? "Letter opened" : "Click to open";

    if (isOpening) {
        letterCard.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }
});


/* ===== INTERACTIVE BIRTHDAY CAKE ===== */

const cake = document.getElementById("birthday-cake");
const lightCandlesButton = document.getElementById("light-candles");
const blowCandlesButton = document.getElementById("blow-candles");
const cakeMessage = document.getElementById("cake-message");

lightCandlesButton.addEventListener("click", function() {
    cake.classList.remove("blown");
    cake.classList.add("lit");

    lightCandlesButton.disabled = true;
    blowCandlesButton.disabled = false;

    cakeMessage.textContent = "The candles are glowing. Make a wish! ✨";
});

blowCandlesButton.addEventListener("click", function() {
    cake.classList.remove("lit");
    cake.classList.add("blown");

    blowCandlesButton.disabled = true;
    lightCandlesButton.disabled = false;

    cakeMessage.textContent =
        "I hope your wish finds its way to you. Happy birthday, Xin! ♡";
});


/* ===== HIDDEN BIRTHDAY MESSAGE ===== */

const secretLeaf = document.getElementById("secret-leaf");
const secretMessage = document.getElementById("secret-message");

secretLeaf.addEventListener("click", function() {
    const shouldReveal = secretMessage.hidden;

    secretMessage.hidden = !shouldReveal;

    secretLeaf.setAttribute(
        "aria-expanded",
        String(shouldReveal)
    );

    if (shouldReveal) {
        secretMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }
});


/* ===== EASTER EGGS ===== */

const eggMessages = {
    star: "A little reminder: you deserve good things, even on days when you find it hard to believe that. ♡",
    letter: "Somewhere in this little corner of the internet, there's a reminder that someone is glad to know you. 🍂",
    ending: "If you made it all the way here, thank you for exploring this little gift. I hope it made your day a bit brighter. ✧"
};

const eggPopup = document.getElementById("egg-popup");
const eggText = document.getElementById("egg-text");
const closeEggButton = document.getElementById("close-egg");

document.querySelectorAll("[data-egg]").forEach(function(button) {
    button.addEventListener("click", function() {
        const message = eggMessages[button.dataset.egg];

        if (!message) return;

        eggText.textContent = message;
        eggPopup.hidden = false;
    });
});

closeEggButton.addEventListener("click", function() {
    eggPopup.hidden = true;
});


/* ===== FALLING AUTUMN LEAVES ===== */

const particleLayer = document.getElementById("particle-layer");
const leafSymbols = ["🍂", "🍁", "🍃"];

for (let i = 0; i < 14; i++) {
    const leaf = document.createElement("span");

    leaf.classList.add("floating-leaf");
    leaf.textContent = leafSymbols[i % leafSymbols.length];

    leaf.style.left = Math.random() * 100 + "%";
    leaf.style.animationDuration = (12 + Math.random() * 14) + "s";
    leaf.style.animationDelay = (-Math.random() * 20) + "s";
    leaf.style.fontSize = (12 + Math.random() * 15) + "px";

    particleLayer.appendChild(leaf);
}


/* ===== START THE STORY ===== */

showScene("welcome");
