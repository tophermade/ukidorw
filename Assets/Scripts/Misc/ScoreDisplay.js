#pragma strict

var scoreText 		: GameObject;

var score 			: int 			= 0;


function SetScore(amount : int){
	score = amount;
	scoreText.GetComponent(TextMesh).text = score.ToString();
}


function AddScore(amount : int){
	score = score + amount;
	scoreText.GetComponent(TextMesh).text = score.ToString();
}


function Awake(){
	scoreText = transform.Find("Text").gameObject;
	AddScore(0);
}