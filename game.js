var buttonColor = ["red", "blue", "green", "yellow"];
var delayInMilliseconds = 100;
var level = 1;
var gameStart = false;
let colorPattern = [];
let userChosenColor = [];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var color = buttonColor[randomNumber];
  var colorId = "#" + color;

  colorPattern.push(color);
  $(colorId).fadeOut(100).fadeIn(100);
  playSound(color);

  $("#level-title").text("Level " + level);

  console.log("questions memories " + colorPattern);
  level++;
  userChosenColor = [];
};

function playSound(name) {
  var colorSound = "sounds/" + name + ".mp3";
  var audio = new Audio(colorSound);
  audio.play();
};

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, delayInMilliseconds);
}

function startOver() {
  level = 1;
  colorPattern = [];
  gameStart = false;
}

function checkAns(currentLevel) {
  if (userChosenColor[currentLevel] === colorPattern[currentLevel]) {
    var counter = 0;
    var lengthArray = colorPattern.length;
    for (var i =0; i < lengthArray; i++){
      if (userChosenColor[i] === colorPattern[i]){
        counter++}
      }
    if (counter === lengthArray) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
}
  else {
    playSound("wrong");
    $(document.body).addClass("game-over");
    setTimeout(function() {
      $(document.body).removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart")
    $("h2").text("");
    startOver();
  }
};

$(".btn").click(function() {
  var clickedColor = $(this).attr("id");
  userChosenColor.push(clickedColor);
  playSound(clickedColor);
  animatePress(clickedColor);
  console.log("user answers " + userChosenColor);
  checkAns(userChosenColor.length - 1)
})

$(document).on('keypress',function(e) {
  if (e.keyCode === 13){
    if(!gameStart) {
        nextSequence();
        gameStart = true;
    }
    $("h2").text = "";
  }
});
