const { Client, Events, GatewayIntentBits, ChannelType } = require("discord.js");
const { token } = require("./config.json");

const dave = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

const manual_thresh = 0.50;
const normal_thresh = 0.05;

const new_member_ignore_days = 14;

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
    // Don't allow dave to respond to himself!
    if(message.author.id === dave.user.id) return;
    // Don't allow responses in anything besides normal text channel
    if(message.channel.type !== ChannelType.GuildText) return;

    const member = message.member;
    if(member === null) return;

    const timeDeltaMS = Date.now() - member.joinedAt;
    const timeDeltaDays = Math.floor(timeDeltaMS / (1000 * 60 * 60 * 24));

    // Ignore new members for a few days
    if(timeDeltaDays < new_member_ignore_days) return;

    console.log(
        timeDeltaDays,
        message.author.displayName,
        message.content,
    );

    if(message.content.match(/manual/i) && Math.random() < manual_thresh){
        const randomResponse = manual_responses[Math.floor(Math.random() * manual_responses.length)];
        message.channel.send(randomResponse);
        return;
    }

    if (Math.random() < normal_thresh) {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(randomResponse);
        return;
    }
});

dave.login(token);
