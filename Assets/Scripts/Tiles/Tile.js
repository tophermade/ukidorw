#pragma strict

var spawnedFrom 		: GameObject;

var alphabet			: String		= "aaaaaaaaabbccddddeeeeeeeeeeeeffggghhiiiiiiiiijkllllmmnnnnnnooooooooppqrrrrrrssssttttttuuuuvvwwyyz";
var tileLetter			: String		= "";

var moveCount 			: int 			= 0;

function SetSpawner(spawnParent : GameObject){
	spawnedFrom = spawnParent;
}


function TilePickedup(){
	if(moveCount == 0){
		spawnedFrom.SendMessage("SpawnTile");
	}
	moveCount++;
}

function TileDropped(){
}


function Awake(){
	tileLetter += alphabet[Random.Range(0,alphabet.length)];
	transform.Find("Text").GetComponent(TextMesh).text = tileLetter;
}


function Start () {

}

function Update () {
	// var v3 = Input.mousePosition;
	// v3.z = 10.0;
	// v3 = Camera.main.ScreenToWorldPoint(v3);
	// transform.position = v3;
}