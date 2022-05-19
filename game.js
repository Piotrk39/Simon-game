
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;

//start on key stroke and change the title name
var started = false;

$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        started = true;
        nextSequence();
    }          
});


//Detecting clicks and storing the colors
const allButtons = $(".btn");

function userClick() {
    allButtons.click(function(event) {
    
        var userChosenColour = $(this).attr("id");
        
        userClickedPattern.push(userChosenColour);
    
    });
}

userClick()

function makeSound(key) {
    
    switch (key) {
        case "green":
            var audio = new Audio("sounds/green.mp3");
            audio.play();
            break;

        case "yellow":
            var audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;

        case "blue":
            var audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;

        case "red":
            var audio = new Audio("sounds/red.mp3");
            audio.play();
            break;
            
        case "wrong":
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            break;

        default: 
            break;
    }
}

//Use the generated number to animate the button and add the sound to it
function nextSequence() {

    //userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var nextColour = buttonColours[randomNumber];
    gamePattern.push(nextColour);
    
    //userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var colourButton = $("#"+nextColour)
    
    colourButton.animate({opacity: 0.5}).animate({opacity: 1});

    makeSound(nextColour);

}

//randomChosenColour()
    allButtons.click(function(event) {
    
        var userChosenColour = $(this).attr("id");
        
        makeSound(userChosenColour);

        gameOn()
    
    });


function animatePress() {
    
    allButtons.click(function() {
    
        $(this).attr("id");
    
        $(this).addClass("pressed");
        
        setTimeout(() => {
            $(this).removeClass("pressed");
        }, 100);
    });
}

animatePress()

function checkAnswear() {
    console.log(JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern));
}

function gameOn() {
    
    if (started === true && JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {

        setTimeout(() => {
            nextSequence();
        }, 1000);

    } else if (JSON.stringify(gamePattern) !== JSON.stringify(userClickedPattern)) {

        $("body").addClass("game-over")

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);

        makeSound("wrong");

        $("#level-title").text("Game Over, Press Any Key to restart");

        startOver();
    }
}

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];

  }
