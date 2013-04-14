public var minNum:Number = 0.1;
public var colorMultiplier:Number = 0.1;
public var scaleMultiplier:Number = 0.1;
public var origScale : Number = 0.1;
public var playMode : int = 0;
public var oscId : int = 0;
public var pullAmount : Number = 0.5;
private var matAr:Array = [Color(0.5,1.0,0.5,1.0),Color(1.0,0.0,.5,1.0),Color(0.0,1.0,0.5,1.0),Color(1.0,0.0,1.0,1.0)];

private var origPos:Vector3 = new Vector3();
private var rigid:Rigidbody;
private var curVal:Number = 0.0;
private var origColor:Color;

function Start(){
	origPos.x = transform.position.x;	
	origPos.y = transform.position.y;	
	origPos.z = transform.position.z;	
	rigid = GetComponent("Rigidbody");
	transform.position = Vector3(Random.Range(-1.0,1.0),Random.Range(-1.0,1.0),Random.Range(-1.0,1.0))*2.0;
}

function FixedUpdate(){
	rigid.velocity += (origPos - transform.position) * .04;	
}



function setMode(n){
	switch(n){
		case 1: // LORI D
			var v = Random.Range(0.1,1.0);
			origColor = renderer.material.color = Color(v,v,v);
			break;
		case 2:	// REDINHO
			origColor = renderer.material.color = new Color(Random.Range(0.7,1.0), 0 , Random.Range(0.0,1.0));
			break;
		case 3: // COLOR
			origColor = renderer.material.color = new Color(Random.Range(0.0,1.0), Random.Range(0.0,1.0) , Random.Range(0.0,1.0));
			break;
		default:
			origColor = renderer.material.color = matAr[playMode];
			break;	
	}	
}


function Update () {
	curVal = OSCReceiver.messages[oscId];
	scale(); pull();
//	switch(playMode){
//		case 0: scale(); break;
//		case 1: scale(); pull(); break;
//		case 2: pull(); break;
//	}
//	
	blink();
}

function pull(){
	rigid.velocity += (Vector3.zero - transform.position) * OSCReceiver.messages[oscId] * pullAmount;	
}

function blink(){
	var n = curVal * colorMultiplier; 
	renderer.material.color =  origColor * n;
}

function scale(){
	var n = curVal * scaleMultiplier + minNum;
	transform.localScale = Vector3(n,n,n) * origScale;
}