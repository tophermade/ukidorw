#pragma strict

var tl : String;
var so : int;

function Awake(){
}

function Start () {
	//print(gameObject.GetComponent(MeshRenderer).sortingOrder);
	if(transform.parent.gameObject.GetComponent(SpriteRenderer)){
		tl = transform.parent.gameObject.GetComponent(SpriteRenderer).sortingLayerName;
		gameObject.GetComponent(MeshRenderer).sortingLayerName = tl;

		so = transform.parent.gameObject.GetComponent(SpriteRenderer).sortingOrder;
		gameObject.GetComponent(MeshRenderer).sortingOrder = 600;
	}

}

function Update () {

}