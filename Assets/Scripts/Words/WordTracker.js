#pragma strict

var trackedSlots 		: GameObject[];
var trackedLetters 		= new Array();

var boardManager 		: GameObject;

var indicatorParent 	: GameObject; // newly created indicators are children of this
var indicator 			: GameObject;

var word 				: String;
var colorRed 			: Color;
var colorBlue 			: Color;

var wordIsCorrect 		: boolean 		= false;

var wordValue 			: int 			= 0;


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


function SetManager(theManager : GameObject){
	boardManager = theManager;
}


function AddTile(){
	word = "";
	wordValue = 0;

	for (var i = 0; i < trackedSlots.length; i++) {
		word = word + trackedSlots[i].GetComponent(TileSpot).tileLetter;
	}
	if(trackedSlots.length == word.length){
		BroadcastMessage("CheckWord", word);
	} else {
		boardManager.SendMessage("CheckBoardScore");
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


function AddLetterValues(){
	var tempScore 	: int 	= 0;
	for (var i = 0; i < word.length; i++) {
		if(
			word[i] == "a" ||
			word[i] == "e" ||
			word[i] == "i" ||
			word[i] == "o" ||
			word[i] == "u" ||
			word[i] == "l" ||
			word[i] == "n" ||
			word[i] == "s" ||
			word[i] == "t" ||
			word[i] == "r"
		){
			tempScore+=1;
		} else if(
			word[i] == "d" ||
			word[i] == "g"
		){
			tempScore+=2;
		} else if(
			word[i] == "b" ||
			word[i] == "c" ||
			word[i] == "m" ||
			word[i] == "p"
		){
			tempScore+=3;
		} else if(
			word[i] == "f" ||
			word[i] == "h" ||
			word[i] == "v" ||
			word[i] == "w" ||
			word[i] == "y"
		){
			tempScore+=4;
		} else if(
			word[i] == "k"
		){
			tempScore+=5;
		} else if(
			word[i] == "j" ||
			word[i] == "x"
		){
			tempScore+=7;
		}  else if(
			word[i] == "q" || 
			word[i] == "z"
		){
			tempScore+=9;
		}
	}

	wordValue = tempScore;
}


function WordIsValid(){
	//print("Word Is Valid");
	wordIsCorrect = true;
	AddLetterValues();

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

	boardManager.SendMessage("CheckBoard");
}


function WordIsNotValid(){
	//print("Word Is NOT Valid");
	wordValue = 0;

	boardManager.SendMessage("CheckBoardScore");

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


function RoundStart(){
	yield WaitForSeconds(2);
	for (var i = 0; i < trackedSlots.length; i++) {
		trackedSlots[i].SendMessage("StartRound");
	}
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
	RoundStart();// temp
}


function Update () {

}