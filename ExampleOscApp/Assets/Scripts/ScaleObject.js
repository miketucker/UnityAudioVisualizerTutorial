var oscChannel : int;

function Update () {
	var n = OSCReceiver.messages[oscChannel];
	transform.localScale = Vector3(n,n,n);
}