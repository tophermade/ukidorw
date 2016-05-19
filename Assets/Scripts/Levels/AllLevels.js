#pragma strict

var transitioner 	: GameObject;
var notifyThese 	: GameObject[];



function Awake(){
	transitioner = Resources.Load("LevelLoadedOut");
	var newEffect = Instantiate(transitioner, Vector3(0,0,0), Quaternion.identity);
}


function Start () {
	yield WaitForSeconds(2.2);

	for (var i = 0; i < notifyThese.length; i++) {
		notifyThese[i].SendMessage("ManageRound", true);
	}
}


function Update () {

}