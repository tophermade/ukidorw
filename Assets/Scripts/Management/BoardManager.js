﻿#pragma strict


var managerText 		: GameObject;
var trackers 			: GameObject[];


function CheckBoard(){
	var correct : boolean = false;
	for (var i = 0; i < trackers.length; i++) {
		correct = trackers[i].GetComponent(WordTracker).wordIsCorrect;
		if(!correct){
			return;
		}
	}

	if(correct){
		print("Board Is Complete");
	}

}


function Awake(){
	trackers = GameObject.FindGameObjectsWithTag("Tracker");

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