#pragma strict

var lines 			: GameObject[];
var lineSettings	= new Array();

var autoRun 		: boolean 	 	= false;
var reversed 		: boolean 		= false;

var doOut 			: boolean 		= false;
var doIn 			: boolean 		= false;

var outDistance 	: int 			= 14;



function Setup(isRevered : boolean){
	reversed = isRevered;

	var i : int = 0;	
	
	if(reversed){
		for (i= 0; i < lines.length; i++) {			
			if(i%2 == 0){
				lines[i].transform.position.y = 14; 
			} else {
				lines[i].transform.position.y = -14;
			}
		}
	} else {
		for (i = 0; i < lines.length; i++) {
			lines[i].transform.position.y = 0; 
		}
	}
}


function ReadyOut(){
	var additive = .01;
	for (var ii = 0; ii < lines.length; ii++) {
		doOut = true;
		yield WaitForSeconds(.075 - additive);
		lineSettings[ii] = true;
		print(lineSettings[ii]);
		additive = additive + additive;
	}
}


function ReadyIn(){
	var additive = .01;
	for (var ii = 0; ii < lines.length; ii++) {
		doIn = true;
		yield WaitForSeconds(.075 - additive);
		lineSettings[ii] = true;
		print(lineSettings[ii]);
		additive = additive + additive;
	}
}


function Awake(){
	Setup(reversed);
	if(reversed && autoRun){
		ReadyIn();
	}

	if(autoRun & !reversed){
		ReadyOut();
	}
}


function Start () {	
	for (var i = 0; i < lines.length; i++) {
		lineSettings.Push(false);
		print("added");
	}
}


function FixedUpdate () {
	var i : int = 0;

	if(reversed){

		if(doIn){
			for (i = 0; i < lines.length; i++) {
				if(lineSettings[i]){

					if(lines[i].transform.position.y > 0){
						lines[i].transform.position.y-= .25;
					} else {
						lines[i].transform.position.y+= .25;						
					}
					
				}
			}
		}

	} else {

		if(doOut){
			for (i = 0; i < lines.length; i++) {
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
}