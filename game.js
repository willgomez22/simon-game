var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Store the id of the button selected by the user in the array
$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour); // Play sound of the selected color by the user.   
    animatePress(userChosenColour); // Add animation to selected button by user.

    checkAnswer(userClickedPattern.length-1); // Call checkAnswer() after a user has clicked and chosen their answer
  });


function checkAnswer(currentLevel) {

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // check if the most recent user answer is the same as the game pattern.
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function() {
          nextSequence();
        }, 1000); // Call nextSequence() after a 1000 millisecond delay.
      }
    } else {
      playSound("wrong"); // play sound of wrong if the user got one of the answers wrong.
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart"); //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      // apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      starOver();
    }
}


function nextSequence() {

  userClickedPattern = []; // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  level++; // Increase the variable "level" every time this function is called
  $("#level-title").text("Level " + level);
  
  var randomNumber = Math.floor(Math.random() * 4); // Random number from 0 to 3
  var randomChosenColour = buttonColours[randomNumber]; // Select a random color
  gamePattern.push(randomChosenColour); // Add the random color to the array

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Fading in and out the random button
  playSound(randomChosenColour); // Play sound of the selected color

  animatePress(randomChosenColour); // Add animation to selected button
}


// Add sounds to the game.
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}


// Add animation to the selected colors
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed"); // add this pressed class to the button that gets clicked inside animatePress().
    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
    }, 100); // remove the pressed class after a 100 milliseconds.
}

// Start Over.
function starOver() {
  level = 0;
  gamePattern = [];
  started = false;
}