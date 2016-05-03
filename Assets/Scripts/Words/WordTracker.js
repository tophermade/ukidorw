#pragma strict

var trackedSlots 		: GameObject[];
var trackedLetters 		= new Array();

var indicatorParent 	: GameObject;
var indicator 			: GameObject;

var word 				: String;


function Hide(){
	GetComponent(SpriteRenderer).enabled = false;
	transform.Find("Arrow").GetComponent(SpriteRenderer).enabled = false;
}


function AddTile(){
	word = "";

	for (var i = 0; i < trackedSlots.length; i++) {
		word = word + trackedSlots[i].GetComponent(TileSpot).tileLetter;
	}

	BroadcastMessage("CheckWord", word);
}


function WordIsValid(){
	print("Word Is Valid");

	for (var i = 0; i < trackedSlots.length; i++) {
		if(i < trackedSlots.length-1){
			var ipx = trackedSlots[i+1].transform.position.x - .6;
			var ipy = trackedSlots[i].transform.position.y - .6;
			var newIndicator = Instantiate(indicator, transform.position, Quaternion.identity);

			if(trackedSlots[i].transform.position.x < trackedSlots[i+1].transform.position.x){
				newIndicator.transform.position.x = ipx;
			} else {
				newIndicator.transform.position.y = ipy;
			}
		}
	}
}


function WordIsNotValid(){
	print("Word Is NOT Valid");
}


function Awake(){
	Hide();
	
	for (var i = 0; i < trackedSlots.length; i++) {
		trackedSlots[i].SendMessage("SetTracker", gameObject);
		trackedLetters.Push("-");
	}

	indicator = Resources.Load("Connector");
}


function Start () {

}


function Update () {

}