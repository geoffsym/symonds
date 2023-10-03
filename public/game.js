const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

function playSound(name) {
    console.log(name);

    const context = new AudioContext();
    const osc = context.createOscillator();
    const g = context.createGain();
    osc.type = "triangle";
    osc.connect(g);
    g.connect(context.destination);

    switch (name) {
        case buttonColors[0]:
            osc.frequency.value = 293.66;
            break;

        case buttonColors[1]:
            osc.frequency.value = 392.0;
            break;

        case buttonColors[2]:
            osc.frequency.value = 493.88;
            break;

        case buttonColors[3]:
            osc.frequency.value = 587.33;
            break;

        default:
            osc.type = "sawtooth";
            osc.frequency.value = 138.59;
            osc.start();
            g.gain.exponentialRampToValueAtTime(
                0.00001,
                context.currentTime + 0.5
            );
            return;
    }

    osc.start();
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.5);
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout($(`#${currentColor}`).removeClass("pressed"), 100);
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    level = 0;
}

function nextSequence() {
    level++;
    $("h1").text(`Level ${level}`);

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(() => {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 500);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

$(document).keydown(() => {
    if (!gameStarted) {
        gameStarted = true;
        $("h1").text(`Level ${level}`);
        nextSequence();
    }
});

$(".btn").click(function () {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});
