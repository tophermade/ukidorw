#pragma strict

var tracker 		: GameObject;
var tileOnSlot 		: GameObject;


function SetTracker(theTracker : GameObject){
	tracker = theTracker;
}

function TileDropped(droppedTile : GameObject){
	if(tileOnSlot && tileOnSlot != droppedTile){
		Destroy(tileOnSlot);
	}

	tileOnSlot = droppedTile;
	tileOnSlot.transform.position.x = transform.position.x;
	tileOnSlot.transform.position.y = transform.position.y;
}


function Start () {

}

function Update () {

}