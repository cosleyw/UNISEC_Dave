const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const dave = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

const not_men = [
    "betarant",
    "shawshankintention",
    "hackerwaves",
]

const men = [
    "adberns",
    "sauce.gardner",
    "cosindine"
]

const manual_man_thresh = 0.75;
const manual_other_thresh = 0.9;
const normal_man_thresh = 0.05;
const normal_other_thresh = 0.25;

const women_responses = [
    "says the one who can't drive",
    "go back to the kitchen",
    "ma'am, this is a Wendy's",
    "are you on your period?",
    "this is why kamala lost",
    "further proof why women aren't funny",
    "shutup",
    "peeps are garbage",
    "the chicago bears suck",
    "be quiet",
    "leave....",
    "Did you sleep in again...?",
    "You're fired!",
    "Tenure removed...",
    "Make Dave Great Again",
    "Will this person ever be quiet?"
];

const men_responses = [
    "try getting a uterus and say that again",
    "this is why we need men to not run the world",
    "don't mansplain to me!",
    "sir, this is a Wendy's",
    "I bet you voted for trump loser",
    "this is why you don't get bitches",
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
]

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

    var normal_thresh = normal_man_thresh;
    var manual_thresh = manual_man_thresh;

    var responses = men_responses;

    if (!(message.author.username in men || message.author.username in not_men)) {

        decision = Math.random();
        if (decision > 0.7) {
            not_men.push(message.author.username);
        } else {
            men.push(message.author.username);
        }

    }

    if (message.author.username in not_men) {
        normal_thresh = normal_other_thresh;
        manual_thresh = manual_other_thresh;
        responses = women_responses;
    }
    
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
