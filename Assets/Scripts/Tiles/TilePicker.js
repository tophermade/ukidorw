#pragma strict

var gameBoard 			: GameObject;

var tileToDrag 			: GameObject;

function Start () {

}

function Update () {

	if(Input.GetMouseButtonDown(0)){
		var hit : RaycastHit;
		var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		if (Physics.Raycast (ray,hit)){
			print(hit.transform.gameObject.name);
			tileToDrag = hit.transform.gameObject;
		}
	}

	if(Input.GetMouseButtonUp(0)){
		if(tileToDrag){
			print("trying drop cast");
			var hitBelow		: RaycastHit;
			var hitObject 		: GameObject;
			var castTo 			: Vector3 = (Vector3(tileToDrag.transform.position.x, tileToDrag.transform.position.y, tileToDrag.transform.position.z + 30) - tileToDrag.transform.position ).normalized;
			if (Physics.Raycast(transform.position, castTo, hitBelow, 30)){
				hitObject 		= hitBelow.transform.gameObject;
				print("hit object " + hitObject.name);
			}
		}

		tileToDrag 	= null;
	}

	if(tileToDrag){
		var pos = Input.mousePosition;
		pos.z = 10.0;
		pos = Camera.main.ScreenToWorldPoint(pos);
		tileToDrag.transform.position = pos;
	}

}