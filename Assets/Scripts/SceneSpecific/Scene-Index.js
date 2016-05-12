#pragma strict

var splashLogo 			: GameObject;
var transitionMaker 	: GameObject;


function Start () {
	transitionMaker.SetActive(true);
	splashLogo.SetActive(true);

	yield WaitForSeconds(2);
	splashLogo.GetComponent(Animator).enabled = true;

	yield WaitForSeconds(.15);
	transitionMaker.SendMessage("Setup", false);
	transitionMaker.SendMessage("ReadyOut");
}


function Update () {

}