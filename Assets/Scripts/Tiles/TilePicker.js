#pragma strict

var gameBoard 			: GameObject;
var tileToDrag 			: GameObject;

var layerMask 							= 1 << 8;
  	layerMask 							= ~layerMask; // invert to check everything excpt 8, which is the tile layer



function DropTile(tileToDrop : GameObject, dropSlot : GameObject){
	tileToDrop.SendMessage("TileDropped", dropSlot);
	dropSlot.SendMessage("TileDropped", tileToDrop);
}


function Start () {

}

function Update () {

	if(Input.GetMouseButtonDown(0)){
		var hit : RaycastHit;
		var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		if (Physics.Raycast (ray,hit)){
			//print(hit.transform.gameObject.name);
			var tag : String = hit.transform.gameObject.tag;
			if(tag == "Tile"){
				tileToDrag = hit.transform.gameObject;
				tileToDrag.SendMessage("TilePickedup");
			} else if(tag == "Button"){
				hit.transform.gameObject.SendMessage("Click");
			}
		}
	}

	if(Input.GetMouseButtonUp(0)){
		if(tileToDrag){
			//print("trying drop cast");
			var hitBelow		: RaycastHit;
			var hitObject 		: GameObject;
			var castTo 			: Vector3 = (Vector3(tileToDrag.transform.position.x, tileToDrag.transform.position.y, tileToDrag.transform.position.z + 30) - tileToDrag.transform.position ).normalized;
			if (Physics.Raycast(tileToDrag.transform.position, castTo, hitBelow, 30, layerMask)){
				hitObject 		= hitBelow.transform.gameObject;
				//print("hit object " + hitObject.name + " tagged " + hitObject.tag);
				
				if(hitObject.tag == "TileSlot"){
					DropTile(tileToDrag, hitObject);					
				} else if(hitObject.tag == "GameTable"){
					Destroy(tileToDrag);
					//spawn drop effect at somepoint
				}
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