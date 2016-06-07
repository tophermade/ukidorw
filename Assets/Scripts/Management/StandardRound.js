#pragma strict

var managerText 			: GameObject;

var timeKeeper 				: GameObject;
var scoreKeeper				: GameObject;

var scoreDisplay 			: GameObject;
var timeDisplay 			: GameObject;
var levelCompleteDisplay 	: GameObject;

var roundTime 				: int 			= 0;
var roundScore 				: int 			= 0;
var realScore 				: int 			= 0;
var starsAwarded 			: int 			= 0;

var oneStarScore 			: int 			= 300;
var twoStarScore 			: int 			= 200;
var threeStarScore 			: int 			= 100;


function EndRound(roundWon : boolean){
	if(roundWon){
		// end the time keeping
		timeKeeper.SendMessage("ManageRound", false);

		// setup scores
		roundTime 	= timeKeeper.GetComponent(TimerCountUp).timer;
		roundScore 	= scoreKeeper.GetComponent(ScoreDisplay).score;
		realScore 	= roundTime - roundScore;
		if(realScore < 1){
			realScore = 1;
		}

		// calculate stars
		var stars : int = 1;
		if(realScore >= threeStarScore){
			stars = 3;
		} else if(realScore >= twoStarScore){
			stars = 2;
		}

		scoreDisplay.GetComponent(TextMesh).text 	= roundScore.ToString();
		timeDisplay.GetComponent(TextMesh).text 	= roundTime.ToString();

		// do a board completion effect here


		// show the round complete screen
		yield WaitForSeconds(1.5);
		levelCompleteDisplay.SetActive(true);
		levelCompleteDisplay.SendMessage("SetStars", stars);

	}
}


function Awake(){	
	managerText.SetActive(false);
	gameObject.GetComponent(SpriteRenderer).enabled = false;
}


function Start () {

}


function Update () {

}