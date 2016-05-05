#pragma strict

var trackedSlots 		: GameObject[];
var trackedLetters 		= new Array();

var indicatorParent 	: GameObject;
var indicator 			: GameObject;

var word 				: String;
var colorRed 			: Color;
var colorBlue 			: Color;

var wordIsCorrect 		: boolean 		= false;


function HexToColor(hex : String){
    var r = byte.Parse(hex.Substring(0,2), System.Globalization.NumberStyles.HexNumber);
    var g = byte.Parse(hex.Substring(2,2), System.Globalization.NumberStyles.HexNumber);
    var b = byte.Parse(hex.Substring(4,2), System.Globalization.NumberStyles.HexNumber);
    return new Color32(r,g,b, 255);
}


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
	WordIsNotValid();	
}


function RemoveTile(tileBeingRemoved : GameObject){
	word = "";
	WordIsNotValid();
	tileBeingRemoved.GetComponent(TileSpot).tileOnSlot = null;
}


function WordIsValid(){
	//print("Word Is Valid");
	wordIsCorrect = true;

	var delay : float = .15;

	// individual pops
	for (var i = 0; i < trackedSlots.length; i++) {
		yield WaitForSeconds(delay);
		trackedSlots[i].GetComponent(TileSpot).tileOnSlot.GetComponent(Animator).SetTrigger("PlayPop");		
	}

	// all pop at once
	yield WaitForSeconds(.25);
	for (var i2 = 0; i2 < trackedSlots.length; i2++) {
		trackedSlots[i2].GetComponent(TileSpot).tileOnSlot.GetComponent(Animator).SetTrigger("PlayPop");
		trackedSlots[i2].GetComponent(TileSpot).tileOnSlot.transform.Find("Text").GetComponent(TextMesh).color = colorRed;
	}

	yield WaitForSeconds(.1);
	for (var i3 = 0; i3 < trackedSlots.length; i3++) {if(i3 < trackedSlots.length-1){
			var ipx = trackedSlots[i3+1].transform.position.x - .5;
			var ipy = trackedSlots[i3].transform.position.y - .5;
			var newIndicator = Instantiate(indicator, transform.position, Quaternion.identity);
				newIndicator.transform.parent = indicatorParent.transform;

			if(trackedSlots[i3].transform.position.x < trackedSlots[i3+1].transform.position.x){
				newIndicator.transform.position.x = ipx;
			} else {
				newIndicator.transform.position.y = ipy;
			}
		}
	}
}


function WordIsNotValid(){
	//print("Word Is NOT Valid");
	if(wordIsCorrect){
		for (var i2 = 0; i2 < trackedSlots.length; i2++) {
			trackedSlots[i2].GetComponent(TileSpot).tileOnSlot.transform.Find("Text").GetComponent(TextMesh).color = colorBlue;
		}

		for(var child : Transform in indicatorParent.transform){
			Destroy(child.gameObject);
		}
	}
	wordIsCorrect = false;
}


function Awake(){
	Hide();
	
	for (var i = 0; i < trackedSlots.length; i++) {
		trackedSlots[i].SendMessage("SetTracker", gameObject);
		trackedLetters.Push("-");
	}

	indicator 	= Resources.Load("Connector");

	colorRed 	= HexToColor("EB4747");
	colorBlue 	= HexToColor("7BAAF7");
}


function Start () {

}


function Update () {

}