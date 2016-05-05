#pragma strict

var trackers 		= new GameObject[2];
var tileOnSlot 		: GameObject;

var tileLetter 		: String;


function SetTracker(theTracker : GameObject){
	if(!trackers[0]){
		trackers[0] = theTracker;
	} else {
		trackers[1] = theTracker;
	}
	//print(trackers);
}


function TileRemoved(){
	// set to 9 in order to make a valid word impossible when the spot is "empty"
	tileLetter = "9";

	// if we change the tile value the first of two, it breaks the tile lookup effect,
	// so when there are two trackers we only change it via the second
	if(trackers[0] && trackers[1]){		
		trackers[0].SendMessage("RemoveTile");
		trackers[1].SendMessage("RemoveTile", gameObject);
	}

	if(trackers[0]){
		trackers[0].SendMessage("RemoveTile", gameObject);
	}
	if(trackers[1]){
		trackers[1].SendMessage("RemoveTile", gameObject);
	}

	tileOnSlot = null;
}


function TileDropped(droppedTile : GameObject){
	//print(gameObject);
	if(tileOnSlot && tileOnSlot != droppedTile){
		Destroy(tileOnSlot);
	}

	tileOnSlot = droppedTile;

	tileLetter = droppedTile.transform.Find("Text").GetComponent(TextMesh).text;

	if(trackers[0]){
		trackers[0].SendMessage("AddTile", tileOnSlot);
	}
	if(trackers[1]){
		trackers[1].SendMessage("AddTile", tileOnSlot);
	}

	tileOnSlot.transform.position.x = transform.position.x;
	tileOnSlot.transform.position.y = transform.position.y;
}


function Awake(){

}


function Start () {

}

function Update () {

}