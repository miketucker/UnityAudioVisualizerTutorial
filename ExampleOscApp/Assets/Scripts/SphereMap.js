var dupe:GameObject;
private var deep:int = 4;
private var mesh:Mesh;
private var verts:Array;
private var objAr:Array = [];

function Start(){
	mesh = GetComponent(MeshFilter).mesh;
	verts = mesh.vertices;
	
	var s:Number = 0.0;
	var vAr : Array = [];
	for(var j =1; j <= deep; j++){
		vAr = [];
		for(var i =0; i < verts.length;i++){
			var found = false;
			for(var z = 0; z < vAr.length; z++) 
    			if(vAr[z]==verts[i]) found = true;

			if(found) continue;
			vAr.push(verts[i]);
			var obj = Instantiate(dupe,verts[i] * (j -.5),Quaternion.identity);
			s = Random.Range(0.05,0.2) * (5-j) * .2 + .05;
			obj.transform.localScale = Vector3(s,s,s);
			var c = obj.GetComponent('AttractionObject');
			c.origScale = s;
			c.playMode = j - 1;
			c.oscId = j - 1;
			objAr.push(obj);
			
		}	
	}
	GetComponent(MeshFilter).mesh = new Mesh();
	setMode(2);
}

function OnGUI(){
	var e : Event = Event.current;
    if (e.isKey && e.type == EventType.KeyDown) {
        keyEvent(e);
    }
}

function keyEvent(e:Event){
	switch(e.keyCode){
		case KeyCode.J: setMode(0); break;
		case KeyCode.K: setMode(1); break;
		case KeyCode.L: setMode(2); break;	
		case KeyCode.Semicolon: setMode(3); break;	
	}
}

function setMode(n){
	for(var i = 0; i < objAr.length; i++){
		objAr[i].GetComponent('AttractionObject').setMode(n);	
	}	
}