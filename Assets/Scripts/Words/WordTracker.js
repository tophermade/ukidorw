#pragma strict

var trackedSlots 		: GameObject[];
var trackedLetters 		= new Array();


function AddTile(){

}


function Hide(){
	GetComponent(SpriteRenderer).enabled = false;
	transform.Find("Arrow").GetComponent(SpriteRenderer).enabled = false;
}


function Awake(){
	Hide();
	
	for (var i = 0; i < trackedSlots.length; i++) {
		trackedSlots[i].SendMessage("SetTracker", gameObject);
	}
}


function Start () {

}


function Update () {

}