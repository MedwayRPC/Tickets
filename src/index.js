const {
    Client,
    IntentsBitField,
    GatewayIntentBits,
    ActivityType
} = require('discord.js');
const CH = require('wokcommands');
const path = require('path');
const {
    type
} = require('os');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        IntentsBitField.Flags.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.Guilds
    ]
});

module.exports = {
    client
}

client.on('ready', async () => {
    console.log('The bot is online')

     client.user.setActivity({
         name: `medwayrpc.uk`,
         type: ActivityType.Watching
    })

    new CH({
        client,
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'events'),
        testServers: ['1175862831963447306'],
        botOwners: ['818539885950009454'] 
    })
})

client.login('MTE4MTY2ODE5MDY2MTY2MDc5Mw.GtqZk0.ovewknKULy_8Lgv1-icAmzdh6NqdBaXvxbYHsU')