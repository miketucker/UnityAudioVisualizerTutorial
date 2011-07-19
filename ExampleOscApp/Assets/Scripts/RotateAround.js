private var startY:Number;
var upAndDown : Number = 3.0;
var rotSpeed : Number = 20.0;
var lookAt : boolean = true;
function Start(){
	startY = transform.position.y;
}

function Update () {
	    transform.RotateAround (Vector3.zero, Vector3.up, rotSpeed * Time.deltaTime);
	    if(lookAt) transform.LookAt(Vector3.zero);
	    if(upAndDown > 0) transform.position.y = startY + Mathf.Sin(Time.time/2) * upAndDown;
}

function OnGUI() {
    var e : Event = Event.current;
    if (e.isKey && e.type == EventType.KeyDown) {
        keyEvent(e);
    }
}


function keyEvent(e:Event){
	switch(e.keyCode){
		case KeyCode.W: transform.position.z *= .95; break;
		case KeyCode.S: transform.position.x *= 1.05; break;
	}
}