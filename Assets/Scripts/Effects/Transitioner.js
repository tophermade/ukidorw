#pragma strict

var lines 			: GameObject[];
var lineSettings	= new Array();

var outDistance 	: int 			= 14;

var doOut 			: boolean 		= false;

function ReadyMove(){
	var additive = .01;
	for (var ii = 0; ii < lines.length; ii++) {
		doOut = true;
		yield WaitForSeconds(.075 - additive);
		lineSettings[ii] = true;
		print(lineSettings[ii]);
		additive = additive + additive;
	}
}


function Awake(){
}


function Start () {	
	for (var i = 0; i < lines.length; i++) {
		lineSettings.Push(false);
		print("added");
	}
	ReadyMove();
}


function FixedUpdate () {
	if(doOut){
		for (var i = 0; i < lines.length; i++) {
			if(lineSettings[i]){

				if(i%2 == 0){
					if(lines[i].transform.position.y < outDistance){
						lines[i].transform.position.y+= .25;
					} 
				} else {
					if(lines[i].transform.position.y > -outDistance){
						lines[i].transform.position.y-= .25;
					} 
				}
				
			}
		}
	}
}