#pragma strict

var timerText 		: GameObject;

var playing 		: boolean 		= false;

var minutes 		: String;
var seconds 		: String;

var timer 			: float 		= 0;
var timerStartedAt 	: float 		= 0;


function ManageRound(isPlaying : boolean){
	playing = isPlaying;

	if(playing){
		timerStartedAt = Time.time;
	}
}


function Awake(){
	timerText = transform.Find("Text").gameObject;
	timerText.GetComponent(TextMesh).text = "0:00";
}


function SetTimeDisplay(){
	if(playing){
		timer = Time.time - timerStartedAt;
		minutes = Mathf.Floor(timer / 60).ToString("00");
		if(minutes == "00"){
			minutes = "0";
		}
		seconds = (timer % 60).ToString("00");
		timerText.GetComponent(TextMesh).text = minutes + ":" + seconds;
	}
}


function FixedUpdate(){
	SetTimeDisplay();
}