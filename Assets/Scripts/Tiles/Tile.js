#pragma strict

var spawnedFrom 		: GameObject;
var textObject 			: GameObject;

var spriteRenderer		: SpriteRenderer;
var textRenderer 		: MeshRenderer;

var alphabet			: String		= "aaaaaaaaabbccddddeeeeeeeeeeeeffggghhiiiiiiiiijkllllmmnnnnnnooooooooppqrrrrrrssssttttttuuuuvvwwyyz";
var tileLetter			: String		= "";
var inactiveLayerName 	: String 		= "Tiles";
var activeLayerName 	: String 		= "TilesActive";

var moveCount 			: int 			= 0;

function SetSpawner(spawnParent : GameObject){
	spawnedFrom = spawnParent;
}


function TilePickedup(){
	spriteRenderer.sortingLayerName = activeLayerName;
	textRenderer.sortingLayerName 	= activeLayerName;

	if(moveCount == 0){
		spawnedFrom.SendMessage("SpawnTile");
	}
	moveCount++;
}

function TileDropped(droppedSlot : GameObject){
	spriteRenderer.sortingLayerName = inactiveLayerName;
	textRenderer.sortingLayerName 	= inactiveLayerName;
}

function Awake(){
	tileLetter += alphabet[Random.Range(0,alphabet.length)];
	textObject.GetComponent(TextMesh).text = tileLetter;
	
	spriteRenderer = GetComponent(SpriteRenderer);
	textRenderer = textObject.GetComponent(MeshRenderer);

	spriteRenderer.sortingLayerName = inactiveLayerName;
	textRenderer.sortingLayerName 	= inactiveLayerName;
}


function Start () {

}

function Update () {
	// var v3 = Input.mousePosition;
	// v3.z = 10.0;
	// v3 = Camera.main.ScreenToWorldPoint(v3);
	// transform.position = v3;
}