<h1 align="center">
  <br>
  <a href="https://discord.com/api/oauth2/authorize?client_id=1427251058198974574&permissions=3072&scope=bot%20applications.commands"><img src="https://github.com/user-attachments/assets/2be85844-37f4-4beb-b44f-9ec0f3abae8a" alt="The Bot of Minor Inconvenience"></a>
  <br>
  The Bot of Minor Inconvenience
  <br>
</h1>

<h4 align="center">We proudly offer a full range of premium services: annoy, inconvenience, bother, trouble, pester, disturb, disrupt, irritate, frustrate, and occasionally exasperate. </h4>

<p align="center">
   <a href="https://github.com/Nour-MK/TheBotofMinorInconvenience/blob/main/LICENSE">License</a>
   •
  <a href="https://github.com/Nour-MK/TheBotofMinorInconvenience/blob/main/TERMS_OF_SERVICE.md">Terms of Service</a>
  •
  <a href="https://github.com/Nour-MK/TheBotofMinorInconvenience/blob/main/PRIVACY_POLICY.md">Privacy Policy</a>
</p>

## Features

- `/inconvenience @username` Starts pinging a user every 2 minutes
- `/stop-inconvenience @username` Stops the inconvenience session
- Only the person who started the session or the target user can stop it
- Multiple sessions can run simultaneously for different users/channels

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

## Security

- Keep your `.env` file private and never commit it to version control
- Regenerate your bot token if it gets compromised
- Only give the bot the minimum required permissions

## Acknowledgements
Shoutout to [@M-Alshamsi](https://github.com/M-Alshamsi) for the inspiration. My passion for annoying you has fueled the completion of this project. 🎉
