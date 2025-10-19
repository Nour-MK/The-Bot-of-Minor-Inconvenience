const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

// List of allowed channel IDs where the bot can operate
const allowedChannels = [
    '1418232536269721678',
    '1418232536496345244',
    '1418232536269721673',
    '1418232536269721676'
];

// Store active inconvenience sessions
const inconvenienceSessions = new Map();

// Inconvenience messages to cycle through
const inconvenienceMessages = [
    "Beep boop! Your inconvenience service is working perfectly! 📢",
    "This is your 2-minute reminder that you exist! ✨",
    "Hello! I'm here to make sure you don't forget about me! 👋",
    "WHAT THE HELLY ANTE",
    "https://tenor.com/view/ping-gif-20035980",
    "DRIVING IN MY CAR",
    "CODE, CREATE, CONQUER!!!!!",
    "Just wanted to say... absolutely nothing important <3",
    "You have the perfect face for radio.",
    "You're proof that evolution can, in fact, go in reverse!",
    "Your regularly scheduled interruption has arrived!",
    "I'm not saying I hate you, but I would unplug your life support to charge my phone.",
    "I'm legally obligated to annoy you every 2 minutes!",
    "Have you tried turning yourself off and on again?",
    "Statistics show that 4 out of 3 people struggle with math.",
    "Living rent-free in your notifications!", 
    "I'm not annoying. You're just easy to annoy :superkekw:",
    "Did you know that hibernating animals don't dream? :(", 
    "Did you know that you can yo-yo in space???",
    "https://tenor.com/view/hey-you-im-talking-to-you-cute-bird-baby-bird-i-want-you-gif-18028076"
];

// Store message queues for each session
const messageQueues = new Map();

// Predefined replies for when bot is mentioned
const mentionReplies = [
    "Yes? What do you want? 🤨",
    "https://tenor.com/view/discord-no-ping-penguin-box-penguin-tapping-turn-off-ping-discord-no-pinging-gif-12119687726864131660",
    "*pretends not to see you*",
    "What now? Can't you see I'm very important?",
    "Who summons me?",
    "Beep boop!",
    "oi  🤨",
    "Someday you’ll go far. I hope you stay there.",
    "I'd agree with you, but then we'd both be wrong.",
    "You have the right to remain silent. You should use it.",
    "If I had a dollar for every smart thing you've said, I'd be in debt.",
    "for realsies bro?",
    "My good fellow, I am utterly astounded by your actions.",
    "Regretfully, I must refuse your proposition.",
    "what now",
    "hey only i get to do the pinging in this house!",
    "I'm busy being petty, can this wait?",
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

// Custom status messages to randomly choose from
const customStatuses = [
    '🔬 testing your patience levels',
    '🍿 just here for the drama',
    '📊 calculating optimal annoyance',
    '🌈 spreading minor discomfort',
    '🎯 planning your next ping',
    '🎵 breakdancing to notification sounds',
    '🎲 selecting my next victim',
    '⏳ your peace expires soon',
    '🎯 certified nuisance',
    '💭 thinking of ways to bother you',
    '👑 the pettiest in the land',
    '⏰ waiting to ruin your day'
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
    
    // Pick a random status from the list
    const randomStatus = customStatuses[Math.floor(Math.random() * customStatuses.length)];
    console.log(`Selected status: ${randomStatus}`);
    
    // Set custom status (thought bubble)
    client.user.setPresence({
        activities: [{
            type: 4, // Type 4 is CUSTOM status
            state: randomStatus, // Randomly selected status
            name: 'custom' // Required for custom status
        }],
        status: 'online' // Can be 'online', 'idle', 'dnd', or 'invisible'
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'inconvenience') {
        const targetUser = interaction.options.getUser('username');
        const channelId = interaction.channelId;
        
        // Check if command is used in an allowed channel
        if (!allowedChannels.includes(channelId)) {
            await interaction.reply('This command can only be used in specific channels!');
            return;
        }
        
        if (!targetUser) {
            await interaction.reply('Please specify a valid user!');
            return;
        }

        // Protect abnourmal from inconvenience commands
        if (targetUser.username === 'abnourmal') {
            // If a bot tries to inconvenience abnourmal, timeout the bot
            if (interaction.user.bot) {
                try {
                    const member = await interaction.guild.members.fetch(interaction.user.id);
                    await member.timeout(5 * 60 * 1000, 'Attempted to inconvenience abnourmal'); // 5 minute timeout
                    await interaction.reply('https://tenor.com/view/timeout-time-out-youre-in-timeout-gif-17322879');
                    console.log(`Timed out bot ${interaction.user.username} for trying to inconvenience abnourmal`);
                } catch (error) {
                    console.error('Error timing out bot:', error.message);
                    await interaction.reply('https://tenor.com/view/ryan-gosling-crazy-stupid-love-what-gif-21343232');
                }
            } else {
                await interaction.reply('https://tenor.com/view/ryan-gosling-crazy-stupid-love-what-gif-21343232');
            }
            return;
        }

        // Prevent bot from targeting itself
        if (targetUser.id === client.user.id) {
            // If a bot tries to inconvenience this bot, timeout the other bot (but not itself)
            if (interaction.user.bot && interaction.user.id !== client.user.id) {
                try {
                    const member = await interaction.guild.members.fetch(interaction.user.id);
                    await member.timeout(5 * 60 * 1000, 'Attempted to inconvenience the bot'); // 5 minute timeout
                    await interaction.reply('https://tenor.com/view/timeout-time-out-youre-in-timeout-gif-17322879');
                    console.log(`Timed out bot ${interaction.user.username} for trying to inconvenience the bot`);
                } catch (error) {
                    console.error('Error timing out bot:', error.message);
                    const selfTargetReplies = [
                        "Nice try, but I'm immune to my own shenanigans!",
                        "https://tenor.com/view/two-steps-ahead-nikocado-i-am-always-two-steps-ahead-villain-gif-6682070000749588107",
                        "I'm a professional, not a masochist."
                    ];
                    const sassyReply = selfTargetReplies[Math.floor(Math.random() * selfTargetReplies.length)];
                    await interaction.reply(sassyReply);
                }
            } else {
                const selfTargetReplies = [
                    "Nice try, but I'm immune to my own shenanigans!",
                    "https://tenor.com/view/two-steps-ahead-nikocado-i-am-always-two-steps-ahead-villain-gif-6682070000749588107",
                    "I'm a professional, not a masochist."
                ];
                const sassyReply = selfTargetReplies[Math.floor(Math.random() * selfTargetReplies.length)];
                await interaction.reply(sassyReply);
            }
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
                    
                    // Get the session to track message count
                    const session = inconvenienceSessions.get(sessionKey);
                    
                    // Alternate between channel and DM (even = channel, odd = DM)
                    if (session.messageCount % 2 === 0) {
                        // Send in channel
                        await channel.send(`${targetUser} ${message}`);
                        console.log(`Sent channel message to ${targetUser.username}`);
                    } else {
                        // Send in DM
                        try {
                            await targetUser.send(`${message}\n\n*This is your scheduled inconvenience message. You're being inconvenienced in ${channel.name}.*`);
                            console.log(`Sent DM to ${targetUser.username}`);
                        } catch (dmError) {
                            console.log(`Could not DM ${targetUser.username}, sending in channel instead:`, dmError.message);
                            // If DM fails, send in channel instead
                            await channel.send(`${targetUser} ${message}\n*(I tried to DM you but you have them disabled! Can't escape me that easily!)*`);
                        }
                    }
                    
                    // Increment message count
                    session.messageCount++;
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
            startedBy: interaction.user.id,
            messageCount: 0 // Track which message we're on for alternating
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
        
        // Only allow the person who started it to stop it
        if (session.startedBy !== interaction.user.id) {
            await interaction.reply('You can only stop inconvenience sessions you started!');
            return;
        }

        clearInterval(session.intervalId);
        inconvenienceSessions.delete(sessionKey);
        messageQueues.delete(sessionKey);
        
        await interaction.reply(`You're gonna miss me when I'm gone, ${targetUser}`);
        console.log(`Stopped inconveniencing ${targetUser.username} in channel ${channelId}`);
    }
});

// Handle messages (for mention replies and reactions)
client.on('messageCreate', async message => {
    // React to messages from users who are currently being inconvenienced with :nou:
    if (message.guild) {
        // Check if this user is being inconvenienced in ANY channel
        let isBeingInconvenienced = false;
        for (const [sessionKey, session] of inconvenienceSessions) {
            if (session.targetUser.id === message.author.id) {
                isBeingInconvenienced = true;
                break;
            }
        }
        
        if (isBeingInconvenienced) {
            try {
                // Try to find the custom :nou: emoji in the guild
                const nouEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'nou');
                
                if (nouEmoji) {
                    // Use custom emoji
                    await message.react(nouEmoji);
                    console.log(`Reacted to ${message.author.username}'s message with :nou: (they're being inconvenienced)`);
                }
            } catch (error) {
                console.error('Error reacting to message:', error.message);
            }
        }
    }
    
    // Check if the bot is mentioned
    if (message.mentions.has(client.user)) {
        // Check if message is in an allowed channel
        if (!allowedChannels.includes(message.channel.id)) {
            console.log(`Ignoring mention in non-allowed channel: ${message.channel.name}`);
            return; // Don't reply or react in non-allowed channels
        }
        
        // React with :die2: emoji first (but not for abnourmal, nephthys29, or uwu)
        const niceUsers = ['abnourmal', 'nephthys29', 'uwu'];
        if (message.guild && !niceUsers.includes(message.author.username)) {
            try {
                const die2Emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'die2');
                if (die2Emoji) {
                    await message.react(die2Emoji);
                    console.log(`Reacted to ${message.author.username}'s mention with :die2:`);
                }
            } catch (error) {
                console.error('Error reacting with :die2::', error.message);
            }
        }
        
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
