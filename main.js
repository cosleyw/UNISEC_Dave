const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");


const dave = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent
]});

dave.once(Events.ClientReady, readyClient => {
	console.log(`Ready! logged in as ${readyClient.user.tag}`);
});

dave.on(Events.MessageCreate, message => {
	console.log(
		message.author.displayName,
		message.content,
	);

	if(Math.random() < 0.047){
		message.channel.send("shutup");
	}
});

dave.login(token);
