import System.Collections.Generic;
import System.Linq;

var myDictionary 	: Dictionary.<String, String>;

function CheckWord(word : String) {
	//print(Time.time);
	if(myDictionary.ContainsKey(word)){
		BroadcastMessage("WordIsValid");
	} else if(!myDictionary.ContainsKey(word)){
		BroadcastMessage("WordIsNotValid");
	}    
	//print(Time.time);
}

function Awake(){
	var MytextAsset = Resources.Load("dictionary", typeof(TextAsset)) as TextAsset;
	myDictionary = MytextAsset.text.Split("\n"[0]).ToDictionary(function(w){
		return w;
	}); 
}

function Start(){
}

function Update(){
	
}