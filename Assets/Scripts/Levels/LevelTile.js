#pragma strict


var stars 			: GameObject[];
var text	 		: GameObject;
var sprite 			: GameObject;
var transitioner	: GameObject;

var isUnlocked 		: boolean 		= false;
var isComplete 		: boolean 		= false;
var forceUnlock 	: boolean 		= false;

var title 			: String;

var red 			: String 		= "E94747";
var blue 			: String 		= "7BAAF7";
var emptyStar 		: String 		= "F8BBC1";


function PlayTapAnimation(){
	sprite.GetComponent(Animator).SetTrigger("Play");
}


function PlayErrorAnimation(){
	sprite.GetComponent(Animator).SetTrigger("Error");
}


function TileIsUnlocked(){
	print("tile available for play");
	PlayTapAnimation();
	var newEffect = Instantiate(transitioner, Vector3(0,0,0), Quaternion.identity);	
	yield WaitForSeconds(2);
	Application.LoadLevel(title);
}


function TileIsLocked(){
	print("tile is locked");
	PlayErrorAnimation();
}


function Click(){
	if(isUnlocked){
		TileIsUnlocked();
	} else {
		TileIsLocked();
	}
}


function HexToColor(hex : String){
    var r = byte.Parse(hex.Substring(0,2), System.Globalization.NumberStyles.HexNumber);
    var g = byte.Parse(hex.Substring(2,2), System.Globalization.NumberStyles.HexNumber);
    var b = byte.Parse(hex.Substring(4,2), System.Globalization.NumberStyles.HexNumber);
    return new Color32(r,g,b, 255);
}


function MakeLocked(){

}


function MakeUnlocked(){
	isUnlocked = true;
	sprite.GetComponent(SpriteRenderer).color = HexToColor("ffffff");
	text.GetComponent(TextMesh).color = HexToColor(blue);
	
	for (var i : int = 0; i < stars.length; i++) {
		stars[i].GetComponent(SpriteRenderer).color = HexToColor(emptyStar);
	}
}


function MakeComplete(){
	sprite.GetComponent(SpriteRenderer).color = HexToColor("ffffff");
	text.GetComponent(TextMesh).color = HexToColor(red);

	var starCount = PlayerPrefs.GetInt("Level" + title + "Stars");
	
	var i : int;
	for (i = 0; i < stars.length; i++) {
		stars[i].GetComponent(SpriteRenderer).color = HexToColor(emptyStar);
	}

	for (i = 0; i < starCount-1; i++) {
		stars[i].GetComponent(SpriteRenderer).color = HexToColor(red);
	}

	isUnlocked = true;
	isComplete = true;
}


function Awake(){
	title = gameObject.name;
	text.GetComponent(TextMesh).text = title;
	var status : String = PlayerPrefs.GetString("Level" + title + "Status");

	if(status == "defaultValue"){
		PlayerPrefs.SetString("Level" + title + "Status", "locked");
	} else if(status == "locked"){
		MakeLocked();
	} else if(status == "unlocked"){
		MakeUnlocked();
	} else if(status == "complete"){
		MakeComplete();
	}

	if(forceUnlock && status != "complete"){
		PlayerPrefs.SetString("Level" + title + "Status", "unlocked");
		MakeUnlocked();
	}
}

function Start () {

}

function Update () {

}