#pragma strict

var timerText 		: GameObject;

var timer 			: float 		= 0;
var timerStartedAt 	: float 		= 0;
var minutes 		: String;
var seconds 		: String;


function Awake(){
	timerText = transform.Find("Text").gameObject;
}


function SetTimeDisplay(){
	timer = Time.time - timerStartedAt;
	minutes = Mathf.Floor(timer / 60).ToString("00");
	if(minutes == "00"){
		minutes = "0";
	}
	seconds = (timer % 60).ToString("00");
	timerText.GetComponent(TextMesh).text = minutes + ":" + seconds;
}


function FixedUpdate(){
	SetTimeDisplay();
}