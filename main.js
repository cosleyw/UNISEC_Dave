const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const dave = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

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

dave.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

dave.on(Events.MessageCreate, message => {
    console.log(
        message.author.displayName,
        message.content,
    );

    if (Math.random() < 0.05) {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(randomResponse);
    }
});

dave.login(token);