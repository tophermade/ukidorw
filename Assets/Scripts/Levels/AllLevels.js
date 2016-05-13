#pragma strict

var transitioner 	: GameObject;


function Awake(){
	transitioner = Resources.Load("LevelLoadedOut");
	var newEffect = Instantiate(transitioner, Vector3(0,0,0), Quaternion.identity);
}

function Start () {

}

function Update () {

}