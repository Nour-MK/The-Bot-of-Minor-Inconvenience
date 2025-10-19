# The Bot of Minor Inconvenience

An annoying Discord bot that allows you to "inconvenience" users by pinging them every 2 minutes using slash commands.

## Features

- `/inconvenience @username` Starts pinging a user every 2 minutes
- `/stop-inconvenience @username` Stops the inconvenience session
- Only the person who started the session can stop it
- Multiple sessions can run simultaneously for different users/channels
- Messages alternate between channel pings and DMs
- Automatically reacts with `:nou:` emoji to messages from users being inconvenienced
- Responds with sassy replies when mentioned

## Setup Instructions

### 1. Create a Discord Application & Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name and picture
3. Go to the "Bot" section in the left sidebar
4. Click "Add Bot"
5. Copy the bot token (you'll need this later)
6. Under "Privileged Gateway Intents", enable:
   - Message Content Intent (if you plan to read message content)
7. Go to the "OAuth2" section → "General"
8. Copy the "Client ID" (you'll need this too)

### 2. Configure the Bot

1. Open the `.env` file in this project
2. Replace `your_bot_token_here` with your actual bot token
3. Replace `your_client_id_here` with your actual client ID

### 3. Install Dependencies and Run

1. Open PowerShell in the bot directory
2. Run the following commands:

```powershell
# Install Node.js dependencies
npm install

# Deploy the slash commands to Discord
node deploy-commands.js

# Start the bot
npm start
```

## Important Notes

- **Use Responsibly**: This bot is meant for harmless fun between friends. Don't use it to harass or bully others.
- **Rate Limits**: Discord has rate limits. The 2-minute interval helps avoid hitting these limits.
- **Permissions**: Make sure the bot has permission to send messages in the channels where you use it.
- **Privacy**: Never share your bot token publicly!
- **Custom Emojis**: This bot uses custom emojis (`:nou:` and `:die2:`) for reactions. These emojis must exist in your Discord server for the reactions to work. If you don't have these emojis, you can either:
  - Create custom emojis with these exact names in your server
  - Modify the emoji names in `bot.js` to match emojis that exist in your server
  - Remove the emoji reaction features if you don't want to use them
  
## Troubleshooting

- Make sure you deployed the commands with `node deploy-commands.js`
- Check that the bot has the right permissions in your server
- Verify your `.env` file has the correct token and client ID
- If the bot doesn't appear among the members of the server, make sure that it has View Channel permission. This can be modified through bit manipulation in your invite link.

## Files Explanation

- `bot.js` - Main bot application code
- `deploy-commands.js` - Script to register slash commands with Discord
- `package.json` - Node.js project configuration and dependencies
- `.env` - Environment variables (token and client ID)
- `README.md` - This documentation

## Technology Stack & Language Choice

**Node.js** is a JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run outside of web browsers. It's particularly well-suited for building Discord bots for several reasons:

1. **Event-Driven Architecture**: Node.js excels at handling asynchronous events (like Discord messages, reactions, and commands).

2. **discord.js Library**: The `discord.js` library is one of the most popular, well-documented, and actively maintained Discord API wrappers.

3. **JavaScript Familiarity**: JavaScript is one of the most widely-used programming languages.

4. **Non-Blocking I/O**: Node.js's non-blocking nature means the bot can handle multiple operations simultaneously without waiting for one to complete before starting another.

5. **NPM Ecosystem**: Access to thousands of packages through npm makes it easy to add functionality and manage dependencies.

## Alternative Languages for Discord Bots

- **Python** (discord.py)
- **Java** (JDA - Java Discord API)
- **C#** (Discord.Net)
- **C++** (D++/DPP, sleepy-discord)
- **C** (libdiscord, concord)
- **Go** (DiscordGo)
- **Rust** (Serenity)

## Hosting Plans

This bot is designed to run continuously on a **Raspberry Pi** for 24/7 operation. Here's why and how:

1. **Cost-Effective**: A Raspberry Pi (even a Pi Zero W or Pi 3/4) costs significantly less than traditional cloud hosting for always-on services, especially for hobby projects.

2. **Low Power Consumption**: Raspberry Pis use minimal electricity (typically 2.5-5W), costing only a few dollars per year to run continuously, compared to a desktop PC which uses 50-200W.

3. **Always Available**: Unlike cloud free tiers with usage limits, a Raspberry Pi can run your bot 24/7 without restrictions or surprise bills.

4. **Learning Opportunity**: Self-hosting on a Raspberry Pi teaches valuable skills in Linux administration, networking, and server management.

5. **Complete Control**: You own the hardware and have full control over the environment, configurations, and updates.

6. **Sufficient Resources**: Node.js bots are lightweight - even a Raspberry Pi Zero W has enough resources to run this bot smoothly.

## How Raspberry Pi Hosting Works

1. **Setup Process**:
   - Install Raspberry Pi OS (formerly Raspbian) on an SD card
   - Install Node.js and npm on the Raspberry Pi
   - Clone this repository to the Pi
   - Install dependencies with `npm install`
   - Configure the `.env` file with your bot token

2. **Running the Bot**:
   ```bash
   # Start the bot
   node bot.js
   
   # Or use a process manager like PM2 for auto-restart on crashes/reboots
   npm install -g pm2
   pm2 start bot.js --name "discord-bot"
   pm2 startup  # Enable auto-start on boot
   pm2 save     # Save current process list
   ```

3. **Network Requirements**:
   - Stable internet connection (Wi-Fi or Ethernet)
   - No port forwarding needed (bot connects *out* to Discord's servers)
   - Router/modem can be standard home equipment

4. **Maintenance**:
   - SSH into the Pi for remote management
   - Set up auto-updates for the OS
   - Monitor with `pm2 status` or `pm2 logs`
   - Backup your configuration files regularly

## Alternative Hosting Options

If you don't have a Raspberry Pi, other options include:

- **Cloud VPS** (DigitalOcean, Linode, AWS EC2) - More expensive but more powerful
- **Heroku** - Free tier available but has limitations on uptime
- **Replit** - Easy browser-based hosting, free tier available
- **Your Personal Computer** - Works but consumes more power and may not be always-on
- **Oracle Cloud Free Tier** - Generous free tier with ARM-based VMs similar to Pi

## Security

- Keep your `.env` file private and never commit it to version control
- Regenerate your bot token if it gets compromised
- Only give the bot minimum required permissions

## Acknowledgements
Shoutout to [@M-Alshamsi](https://github.com/M-Alshamsi) for the inspiration. My passion for annoying you has fueled the completion of this project. 🎉