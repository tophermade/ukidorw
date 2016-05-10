#pragma strict

var managerText 	: GameObject;

var timeKeeper 		: GameObject;
var scoreKeeper		: GameObject;

var roundTime 		: int 			= 0;
var roundScore 		: int 			= 0;


function EndRound(roundWon : boolean){

}


function Awake(){	
	managerText.SetActive(false);
	gameObject.GetComponent(SpriteRenderer).enabled = false;
}


function Start () {

}


function Update () {

}