const WebSocket = require("ws");
const fetch = require("node-fetch");

let base = "https://discord.com/api/v10";
let gateway = "wss://gateway.discord.gg";
let token = require("./token.json").token;
let socket;

fetch(base + "/gateway").then((v)=>{
	v.json().then((v)=>{
		gateway = v.url;
	});
}).then(()=>{
	let socket = new WebSocket(gateway);
	let sequence = null;
	let heartbeat_interval = 45000;
	let alive = false;
	let timeout;

	let beat = () => {
		socket.send(JSON.stringify({
			op: 1,
			d: sequence
		}));
		timeout = setTimeout(beat, heartbeat_interval * 0.95);
	}

	let wake = () => {
		if(alive == false){
			alive = true;
			timeout = setTimeout(beat, heartbeat_interval * 0.95);

			socket.send(JSON.stringify({
			  "op": 2,
			  "d": {
			    "token": token,
			    "intents": 1 | (1 << 9) | (1 << 15),
			    "properties": {
			      "os": "linux",
			      "browser": "my_library",
			      "device": "my_library"
			    }
			  }
			}));
		}
	}

	let sleep = () => {
		if(alive == true){
			alive = false;
			clearTimeout(timeout);
			console.log("session was invalidated :/\n");
		}
	}

	socket.addEventListener("message", (v)=>{
		let json = JSON.parse(v.data);

		sequence = json.s;
		switch(json.op){
			case 7: //reconnect
				//TODO
			break;
			case 9: //Invalid session
				sleep();
			break;
			case 10: //HELLO
				heartbeat_interval = json.d.heartbeat_interval;
				wake();
			break;
			case 11: //Heartbeat ACK
			break;	
			case 0: //GATEWAY event
				handle_event(json);
			break;
		};
	});
});

let get_message = (channel_id, message_id) => {
	return fetch(base + `/channels/${channel_id}/messages/${message_id}`, {method: "GET", headers: {"Authorization": "Bot " + token, "User-Agent": "DiscordBot (test.org, 1.0)"}}).then((v)=>v.json());
}

let send_message = (channel_id, message) => {
	return fetch(base + `/channels/${channel_id}/messages`, {method: "POST", headers: {"Authorization": "Bot " + token, "User-Agent": "DiscordBot (test.org, 1.0)", "Content-Type": "application/json"}, body: JSON.stringify({content: message})}).then((v)=>v.json());
}

let andy_grace_period = performance.now() - 600000;
var handle_event = (json) => {
	switch(json.t){
		case "MESSAGE_CREATE":
			if(json.d.author.id == "1166912868545986702")
				return;

			
			let message = json.d.content;
			if(message == "!srs") // initiates serious andy time
				andy_grace_period = performance.now();

			let minutes_since = (performance.now() - andy_grace_period) / 60000;
			let time_left = Math.max(0.0, 10 - minutes_since);

			if(message == "!stl") // serious time left
				send_message(json.d.channel_id, `${time_left} minutes`);
			
			if(time_left == 0.0 && json.d.author.id == "669917688981618708" && Math.random() > 0.90)
				send_message(json.d.channel_id, "shutup");


		break;
	}
}

