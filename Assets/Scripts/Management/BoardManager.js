#pragma strict


var managerText 		: GameObject;
var gameManager 		: GameObject;
var trackers 			: GameObject[];

var scoreKeeper			: GameObject;

var boardScore 			: int 			= 0;


function CheckBoardScore(){	
	boardScore 					= 0;

	for (var i = 0; i < trackers.length; i++) {
		boardScore	= boardScore + trackers[i].GetComponent(WordTracker).wordValue;
	}
	
	print(boardScore);

	scoreKeeper.SendMessage("SetScore", boardScore);
}


function CheckBoard(){
	print("checking board");

	CheckBoardScore();

	var correct 	: boolean 	= false;

	for (var ii = 0; ii < trackers.length; ii++) {
		boardScore	= boardScore + trackers[ii].GetComponent(WordTracker).wordValue;
		correct 	= trackers[ii].GetComponent(WordTracker).wordIsCorrect;

		if(!correct){
			return;
		}
	}

	if(correct){
		print("Board Is Complete");
		gameManager.SendMessage("EndRound", true);
	}
}


function Awake(){
	trackers 		= GameObject.FindGameObjectsWithTag("Tracker");
	gameManager 	= GameObject.Find("GameManager");
	scoreKeeper 	= GameObject.Find("Score");

	for (var i = 0; i < trackers.length; i++) {
		trackers[i].SendMessage("SetManager", gameObject);
	}
	
	managerText.SetActive(false);
	gameObject.GetComponent(SpriteRenderer).enabled = false;
}


function Start () {

}


function Update () {

}