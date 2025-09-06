const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const dave = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

const manual_thresh = 0.75;
const normal_thresh = 0.05;

const responses = [
    "shutup",
    "peeps are garbage",
    "the chicago bears suck",
    "be quiet",
    "leave....",
    "Did you sleep in again...?",
    "You're fired!",
    "Tenure removed...",
    "Make Dave Great Again",
    "Will this guy ever be quiet?"
];

const manual_responses = [
    "!! whoa you drive a manual 😳 Thats so cool",
    "manual?? you mean like the og way to drive a vehicle?",
    "you are almost as cool as andy!",
    "ikr, automatic transmissions are so boring!"
];

dave.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

dave.on(Events.MessageCreate, message => {
    console.log(
        message.author.displayName,
        message.content,
    );

    if(message.content.match(/manual/i) && Math.random() < manual_thresh){
        const randomResponse = manual_responses[Math.floor(Math.random() * manual_responses.length)];
        message.channel.send(randomResponse);
    }

    if (Math.random() < normal_thresh) {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(randomResponse);
    }
});

dave.login(token);
