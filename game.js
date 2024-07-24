const butonColours = ["red", "blue", "green", "yellow"];

let gamePattern =[];

let userClickedPattern = [];

let level = 0;

let started = false;

$(document).keypress(function (){
  if (started === false) {
    nextSequence();
    started = true;
  }
});

$(document).click(function (){
  if (started === false) {
    nextSequence();
    started = true;
  }
});


$(".btn").click(function (){
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Уровень " + level);
  const randomNumber = Math.floor (Math.random() * 4);
  const randomChosenColour = butonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  let i = 0;
    setTimeout(gamePatternPlay, 500);
    function gamePatternPlay() {
      $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound (gamePattern[i]);
      i++;
      if (gamePattern.length > i) {
          setTimeout(gamePatternPlay, 500);
      }
    }
}

function playSound (name){
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress (currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      $("#" + level).append("<div class='btn_small " + userClickedPattern[currentLevel] + "'></div>");
      setTimeout(function (){
        nextSequence();
      },1000);
    }
  } else {
    const wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game over, нажмите любую кнопку для перезапуска игры");
    setTimeout(startOver, 1000);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
