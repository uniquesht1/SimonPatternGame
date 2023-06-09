
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function (event) {
    if (started == false && event.key == " ") {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) { //yo line of code le kagrcha bujheko chaina askk someone
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Space Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    for (var i = 0; i < gamePattern.length; i++) {
        (function (i) {
            setTimeout(function () {
                $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(gamePattern[i]);
                setTimeout(function () {
                    // Continue with the next iteration or execute any other code
                }, 500); // Delay in milliseconds
            }, 600 * i);
        })(i);
    }

}


//Using async await and promise

// async function nextSequence() {
//     userClickedPattern = [];
//     level++;
//     $("#level-title").text("Level " + level);
//     var randomNumber = Math.floor(Math.random() * 4);
//     var randomChosenColour = buttonColours[randomNumber];
//     gamePattern.push(randomChosenColour);

//     for (const color of gamePattern) {
//         await playPatternStep(color);
//     }
// }

// function playPatternStep(color) {
//     return new Promise((resolve) => {
//         $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
//         playSound(color);
//         setTimeout(resolve, 500); // Delay in milliseconds
//     });
// }



function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
