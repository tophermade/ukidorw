import System.Collections.Generic;
import System.Linq;

var myDictionary 	: Dictionary.<String, String>;
var wordToCheck 	: String;

function CheckWord(word : String) {
	print(Time.time);
	if(myDictionary.ContainsKey(word)){
		Debug.Log(word + " is a valid word");		
	} else if(!myDictionary.ContainsKey(word)){
		Debug.Log(word + " is NOT a valid word");		
	}    
	print(Time.time);
}

function Awake(){
	var MytextAsset = Resources.Load("dictionary", typeof(TextAsset))  as TextAsset;
	myDictionary = MytextAsset.text.Split("\n"[0]).ToDictionary(function(w){
		return w;
	}); 
}

function Start(){
	yield WaitForSeconds(1);
	CheckWord(wordToCheck);
}

function Update(){
	
}