
//You can set these variables in the scene because they are public 
public var RemoteIP : String = "127.0.0.1";
public var SendToPort : int = 57131;
public var ListenerPort : int = 57130;
public var controller : Transform; 
private var handler : Osc;
static var messages : Array = [0.0,0.0,0.0,0.0,1.0,1.0];

public function Start ()
{
	//Initializes on start up to listen for messages
	//make sure this game object has both UDPPackIO and OSC script attached
	
	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(RemoteIP, SendToPort, ListenerPort);
	handler = GetComponent("Osc");
	handler.init(udp);
			
	handler.SetAddressHandler("/VDMX/1", ListenEvent);
	handler.SetAddressHandler("/VDMX/2", ListenEvent);
	handler.SetAddressHandler("/VDMX/3", ListenEvent);
	handler.SetAddressHandler("/VDMX/4", ListenEvent);
	handler.SetAddressHandler("/VDMX/5", ListenEvent);
	
}

public function ListenEvent(oscMessage : OscMessage) : void
{	
	switch(oscMessage.Address){
		case "/VDMX/1":	i = 0; break;
		case "/VDMX/2":	i = 1; break;
		case "/VDMX/3":	i = 2; break;
		case "/VDMX/4":	i = 3; break;
		case "/VDMX/5":	i = 4; break;
		
	}
	
	messages[i] = oscMessage.Values[0];
	
} 
