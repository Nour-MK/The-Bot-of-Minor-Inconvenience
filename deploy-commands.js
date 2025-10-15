const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const commands = [
    new SlashCommandBuilder()
        .setName('inconvenience')
        .setDescription('Start inconveniencing a user by pinging them every 2 minutes')
        .addUserOption(option =>
            option.setName('username')
                .setDescription('The user to inconvenience')
                .setRequired(true)
        ),
    
    new SlashCommandBuilder()
        .setName('stop-inconvenience')
        .setDescription('Stop inconveniencing a user')
        .addUserOption(option =>
            option.setName('username')
                .setDescription('The user to stop inconveniencing')
                .setRequired(true)
        )
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function deployCommands() {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error deploying commands:', error);
    }
}

deployCommands();
