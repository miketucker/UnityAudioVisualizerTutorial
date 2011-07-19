private var pos:Vector3;
private var origPos:Vector3;
private var origRot:Quaternion;
private var rot:Quaternion;
private var rotV:Vector3 = new Vector3();
private var targV:Vector3 = new Vector3();
function Start(){
	origPos = transform.position;
	pos = new Vector3();
	origRot = rot = transform.rotation;
}


function FixedUpdate () {
	transform.Translate(pos,Space.Self);
	targV += (targV - rotV) * .05;
	transform.Rotate(targV,Space.Self);	
	rotV *= .9;
	targV *= .5;
	pos *= .9;
}

function OnGUI() {
    var e : Event = Event.current;
    if (e.isKey ) {
        keyEvent(e);
    }
}

function keyEvent(e:Event){
	switch(e.keyCode){
		case KeyCode.W: move(Vector3.forward); break;
		case KeyCode.A: move(Vector3.left); break;
		case KeyCode.S: move(Vector3.forward*-1); break;
		case KeyCode.D: move(Vector3.right); break;
		case KeyCode.X: move(Vector3.up); break;
		case KeyCode.Z: move(Vector3.up*-1); break;
		case KeyCode.R: transform.position = origPos; transform.rotation = origRot; break;		
		case KeyCode.UpArrow: rotate(Vector3(1,0,0)); break;
		case KeyCode.LeftArrow: rotate(Vector3(0,1,0)); break;
		case KeyCode.DownArrow: rotate(Vector3(-1,0,0)); break;
		case KeyCode.RightArrow: rotate(Vector3(0,-1,0)); break;
	}
}

function move(v:Vector3){
	pos += v * .03;
}

function rotate(v:Vector3){
	rotV += v * 3;
}