var buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];

function playSound(name) {
    new Audio(`sounds/${name}.mp3`).play();
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
    $("h1").text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

$(document).keydown(function () {
    if (!gameStarted) {
        gameStarted = true;
        $("h1").text(`Level ${level}`);
        nextSequence();
    }
});

$(".btn").click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});
