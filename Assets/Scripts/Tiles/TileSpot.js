#pragma strict

var trackers 		= new GameObject[2];
var tileOnSlot 		: GameObject;


function TileRemoved(){
	tileOnSlot = null;
}


function SetTracker(theTracker : GameObject){
	if(!trackers[0]){
		trackers[0] = theTracker;
	} else {
		trackers[1] = theTracker;
	}
	print(trackers);
}

function TileDropped(droppedTile : GameObject){
	if(tileOnSlot && tileOnSlot != droppedTile){
		Destroy(tileOnSlot);
	}

	if(trackers[0]){
		trackers[0].SendMessage("AddTile", tileOnSlot);
	}
	if(trackers[1]){
		trackers[1].SendMessage("AddTile", tileOnSlot);
	}

	tileOnSlot = droppedTile;
	tileOnSlot.transform.position.x = transform.position.x;
	tileOnSlot.transform.position.y = transform.position.y;
}


function Awake(){

}


function Start () {

}

function Update () {

}