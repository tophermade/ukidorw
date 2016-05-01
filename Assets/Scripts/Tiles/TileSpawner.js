#pragma strict

var tilePrefab 		: GameObject;

function SpawnTile(){
	var newTile = Instantiate(tilePrefab, transform.position, Quaternion.identity);
		newTile.SendMessage("SetSpawner", gameObject);
}

function Start () {
	SpawnTile();
}

function Update () {

}