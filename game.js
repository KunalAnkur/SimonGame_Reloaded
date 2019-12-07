var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var started=false;
var level=0;
var highScore=[];

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();

    started=true;

  }
});
 $(".btn").click(function(){
   var userChosenColour=$(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);



 });
 function checkAnswer(currentLevel){

   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
     console.log("success");
     if(userClickedPattern.length===gamePattern.length){
     setTimeout(function(){
       nextSequence();

     },1000);
}
   }
   else{
     var wrongaudi=new Audio("sounds/wrong.mp3");
     wrongaudi.play();
     $("body").addClass("game-over");
     setTimeout(function(){
       $("body").removeClass("game-over");
     },300);
     $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();

   }
 }




function nextSequence(){
  userClickedPattern=[];
level++;

$("#level-title").text("Level "+level);
var randomNumber=Math.floor(Math.random()*4);
var randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);

highscore(level);
 }


 function playSound(name){
   var audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
 }
 function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
   setTimeout(function () {
     $("#"+currentColour).removeClass("pressed");
   }, 100);
 }
 function startOver(){

    gamePattern=[];
    started=false;
    level=0;

 }
function highscore(value){
  console.log("high Score : "+highScore.length);
  console.log("value : "+value);

  if(highScore.length<value){
    console.log("hi");
    highScore.push(level);
    $(".highScore").text("HI : "+highScore.length);

  }
}
