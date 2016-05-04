#pragma strict

var trackedSlots 		: GameObject[];
var trackedLetters 		= new Array();

var indicatorParent 	: GameObject;
var indicator 			: GameObject;

var word 				: String;

var wordIsCorrect 		: boolean 		= false;


function Hide(){
	GetComponent(SpriteRenderer).enabled = false;
	transform.Find("Arrow").GetComponent(SpriteRenderer).enabled = false;
}


function AddTile(){
	word = "";

	for (var i = 0; i < trackedSlots.length; i++) {
		word = word + trackedSlots[i].GetComponent(TileSpot).tileLetter;
	}
	if(trackedSlots.length == word.length){
		BroadcastMessage("CheckWord", word);
	}
	
}


function RemoveTile(){
	word = "";
	wordIsCorrect = false;
}


function WordIsValid(){
	print("Word Is Valid");
	var delay : float = .25;
	for (var i = 0; i < trackedSlots.length; i++) {
		yield WaitForSeconds(delay);
		trackedSlots[i].GetComponent(TileSpot).tileOnSlot.GetComponent(Animator).SetTrigger("PlayPop");
		
		// var ipx = trackedSlots[i+1].transform.position.x - .6;
		// var ipy = trackedSlots[i].transform.position.y - .6;
		// var newIndicator = Instantiate(indicator, transform.position, Quaternion.identity);
		// 	newIndicator.transform.parent = indicatorParent.transform;

		// if(trackedSlots[i].transform.position.x < trackedSlots[i+1].transform.position.x){
		// 	newIndicator.transform.position.x = ipx;
		// } else {
		// 	newIndicator.transform.position.y = ipy;
		// }

		// if(i < trackedSlots.length-1){
			
		// }
	}
	wordIsCorrect = true;
}


function WordIsNotValid(){
	print("Word Is NOT Valid");
	wordIsCorrect = false;
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