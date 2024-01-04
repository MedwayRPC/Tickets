const {
    EmbedBuilder,
    MessagePayload,
    ApplicationCommandOptionType,
    PermissionsBitField
} = require("discord.js");
const {
    CommandType
} = require("wokcommands");

module.exports = {
    category: 'Tickets',
    name: 'addrole',
    description: 'Adds a role to the ticket',
    testOnly: true,
    type: CommandType.SLASH,
    options: [{
        name: 'role',
        description: 'The role to add to the ticket',
        required: true,
        type: ApplicationCommandOptionType.Role
    }],
    callback: async ({
        interaction,
        client
    }) => {

        const auser = interaction.options.getRole('role')


        const success = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`${auser} have been added to the ticket!`)
            .setTimestamp()

            const errorEmbed = new EmbedBuilder()
            .setTitle('Permission Error')
            .setDescription('You do not have permission to do this. You need \`HUMAN_RESOURCES\` permissions.')
            .setColor('Red')
            .setTimestamp()

        if (!interaction.member.roles.cache.has('1175906019478618204')) {

            interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true
            })

        } else {

            await interaction.channel.permissionOverwrites.edit(auser, {
                ViewChannel: true,
                ReadMessageHistory: true,
                EmbedLinks: true,
                AttachFiles: true,
                SendMessages: true
            })

            let msg = MessagePayload.create(interaction.channel, {
                embeds: [success]
            })

            await interaction.reply(msg)


        }


    }
}