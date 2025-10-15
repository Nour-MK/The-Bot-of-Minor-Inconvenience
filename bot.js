const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

// Store active inconvenience sessions
const inconvenienceSessions = new Map();

// Inconvenience messages to cycle through
const inconvenienceMessages = [
    "Beep boop! Your inconvenience service is working perfectly! 📢",
    "This is your 2-minute reminder that you exist! ✨",
    "Hello! I'm here to make sure you don't forget about me! 👋",
    "WHAT THE HELLY ANTE",
    "DRIVING IN MY CAR",
    "Just wanted to say... absolutely nothing important <3",
    "Your regularly scheduled interruption has arrived!",
    "I'm legally obligated to annoy you every 2 minutes!",
    "Have you tried turning yourself off and on again?",
    "Living rent-free in your notifications!", 
    "Did you know that hibernating animals don't dream? :(", 
    "Did you know that you can yo-yo in space???",
    "https://tenor.com/view/hey-you-im-talking-to-you-cute-bird-baby-bird-i-want-you-gif-18028076"
];

// Store message queues for each session
const messageQueues = new Map();

// Predefined replies for when bot is mentioned
const mentionReplies = [
    "Yes? What do you want? 🤨",
    "*pretends not to see you*",
    "What now? Can't you see I'm very important?",
    "Who summons me?",
    "Beep boop!",
    "oi  🤨",
    "for realsies bro?",
    "what now",
    "hey only i get to do the pinging in this house!",
    "Can't a bot get some peace?",
    "stop pinging me cuh",
    "You again? Don't you have hobbies?",
    "I'm not paid enough for this",
    "Make it quick, I have usernames to annoy!",
    "bruh",
    "Oh for the love of... WHAT? 😠",
    "I was having such a good day... 😞",
    "Leave me alone",
    "https://tenor.com/view/ogwlz-justin-bieber-clocking-it-standing-on-business-justin-bieber-paparazzi-it%E2%80%99s-not-clocking-to-you-that-i%E2%80%99m-standing-on-business-gif-1713032948716571326",
    "01110011 01110100 01101111 01110000 00100000 01101001 01110100 00101100 00100000 01100111 01100101 01110100 00100000 01110011 01101111 01101101 01100101 00100000 01101000 01100101 01101100 01110000"
];

// Function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

client.once('ready', () => {
    console.log(`Bot is ready! Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'inconvenience') {
        const targetUser = interaction.options.getUser('username');
        const channelId = interaction.channelId;
        
        if (!targetUser) {
            await interaction.reply('Please specify a valid user!');
            return;
        }

        // Protect abnourmal from inconvenience commands
        if (targetUser.username === 'abnourmal') {
            await interaction.reply('https://tenor.com/view/ryan-gosling-crazy-stupid-love-what-gif-21343232');
            return;
        }

        // Prevent bot from targeting itself
        if (targetUser.id === client.user.id) {
            const selfTargetReplies = [
                "Nice try, but I'm immune to my own shenanigans!",
                "https://tenor.com/view/two-steps-ahead-nikocado-i-am-always-two-steps-ahead-villain-gif-6682070000749588107",
                "I'm a professional, not a masochist."
            ];
            const sassyReply = selfTargetReplies[Math.floor(Math.random() * selfTargetReplies.length)];
            await interaction.reply(sassyReply);
            return;
        }

        // Check if this user is already being inconvenienced in this channel
        const sessionKey = `${channelId}-${targetUser.id}`;
        
        if (inconvenienceSessions.has(sessionKey)) {
            await interaction.reply(`${targetUser.username} is already being inconvenienced in this channel!`);
            return;
        }

        await interaction.reply(`Grab an umbrella ${targetUser}, it's about to rain pings.`);
        
        // Initialize shuffled message queue for this session
        messageQueues.set(sessionKey, shuffleArray(inconvenienceMessages));
        
        // Start the inconvenience session
        const intervalId = setInterval(async () => {
            try {
                const channel = await client.channels.fetch(channelId);
                if (channel) {
                    // Get the message queue for this session
                    let messageQueue = messageQueues.get(sessionKey);
                    
                    // If queue is empty, create a new shuffled queue
                    if (!messageQueue || messageQueue.length === 0) {
                        messageQueue = shuffleArray(inconvenienceMessages);
                        messageQueues.set(sessionKey, messageQueue);
                    }
                    
                    // Get the next message and remove it from the queue
                    const message = messageQueue.shift();
                    
                    await channel.send(`${targetUser} ${message}`);
                }
            } catch (error) {
                console.error('Error sending inconvenience message:', error);
                // If there's an error, stop the session
                clearInterval(intervalId);
                inconvenienceSessions.delete(sessionKey);
                messageQueues.delete(sessionKey);
            }
        }, 2 * 60 * 1000); // 2 minutes in milliseconds

        // Store the session
        inconvenienceSessions.set(sessionKey, {
            intervalId,
            targetUser,
            channelId,
            startedBy: interaction.user.id
        });

        console.log(`Started inconveniencing ${targetUser.username} in channel ${channelId}`);
    }

    if (commandName === 'stop-inconvenience') {
        const targetUser = interaction.options.getUser('username');
        const channelId = interaction.channelId;
        
        if (!targetUser) {
            await interaction.reply('Please specify a valid user!');
            return;
        }

        const sessionKey = `${channelId}-${targetUser.id}`;
        
        if (!inconvenienceSessions.has(sessionKey)) {
            await interaction.reply(`${targetUser.username} is not currently being inconvenienced in this channel.`);
            return;
        }

        const session = inconvenienceSessions.get(sessionKey);
        
        // Only allow the person who started it or the target user to stop it
        if (session.startedBy !== interaction.user.id && targetUser.id !== interaction.user.id) {
            await interaction.reply('You can only stop inconvenience sessions you started or that target you!');
            return;
        }

        clearInterval(session.intervalId);
        inconvenienceSessions.delete(sessionKey);
        messageQueues.delete(sessionKey);
        
        await interaction.reply(`You're gonna miss me when I'm gone, ${targetUser.username}`);
        console.log(`Stopped inconveniencing ${targetUser.username} in channel ${channelId}`);
    }
});

// Handle messages (for mention replies)
client.on('messageCreate', async message => {
    // Ignore messages from bots (including itself)
    if (message.author.bot) return;
    
    // Check if the bot is mentioned
    if (message.mentions.has(client.user)) {
        let replyMessage;
        
        // Special responses for specific users
        if (message.author.username === 'abnourmal') {
            replyMessage = "yes, your majesty";
        } else if (message.author.username === 'nephthys29') {
            // Random choice between the two special responses
            const nephthysReplies = [
                "*excited bot noises*",
                "Squeee! My favorite fairy! 🧚🏻‍♀️"
            ];
            replyMessage = nephthysReplies[Math.floor(Math.random() * nephthysReplies.length)];
        } else if (message.author.username === 'uwu') {
            replyMessage = "https://tenor.com/view/matt-hug-hugs-hug-funny-hug-love-hug-gif-26411239";
        } else {
            // Default random reply for everyone else
            replyMessage = mentionReplies[Math.floor(Math.random() * mentionReplies.length)];
        }
        
        try {
            await message.reply(replyMessage);
        } catch (error) {
            console.error('Error replying to mention:', error);
        }
    }
});

// Handle bot shutdown gracefully
process.on('SIGINT', () => {
    console.log('Bot is shutting down...');
    // Clear all intervals
    for (const [sessionKey, session] of inconvenienceSessions) {
        clearInterval(session.intervalId);
    }
    inconvenienceSessions.clear();
    messageQueues.clear();
    client.destroy();
    process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);
