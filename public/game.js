const context = new AudioContext();
const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

function playSound(name) {
    const osc = context.createOscillator();
    const g = context.createGain();
    osc.connect(g);
    g.connect(context.destination);
    g.gain.value = 0.75;

    switch (name) {
        case buttonColors[0]:
            osc.type = "triangle";
            osc.frequency.value = 293.66;
            break;

        case buttonColors[1]:
            osc.type = "triangle";
            osc.frequency.value = 392.0;
            break;

        case buttonColors[2]:
            osc.type = "triangle";
            osc.frequency.value = 493.88;
            break;

        case buttonColors[3]:
            osc.type = "triangle";
            osc.frequency.value = 587.33;
            break;

        default:
            osc.type = "sawtooth";
            osc.frequency.value = 138.59;
            break;
    }

    osc.start();
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.5);
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    level = 0;
}

function nextSequence() {
    level++;
    $("h1").text(`\nLevel ${level}`);

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                if (gameStarted) {
                    userClickedPattern = [];
                    nextSequence();
                }
            }, 1000);
        }
    } else {
        gameStarted = false;

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 250);

        $("h1").text("Game Over\nRestart?");
        startOver();
    }
}

$("#level-title").click(function () {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    }
});

$(".btn").click(function () {
    const userChosenColor = this.id;
    animatePress(userChosenColor);
    playSound(userChosenColor);
    if (gameStarted) {
        userClickedPattern.push(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
});
