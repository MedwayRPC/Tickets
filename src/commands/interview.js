const {
    ButtonBuilder,
    EmbedBuilder,
    MessagePayload,
    ActionRowBuilder,
    ButtonStyle
} = require("discord.js")
const {
    CommandType
} = require("wokcommands");
module.exports = {
    category: 'Tickets',
    name: 'interviewpanel',
    description: 'Send panel for interview tickets',
    testOnly: true,
    type: CommandType.SLASH,
    ownerOnly: true,

    callback: async ({
        interaction,
        client
    }) => {

        const gensupButton = new ButtonBuilder()
            .setCustomId('interview-n')
            .setEmoji('📩')
            .setLabel('New Interview Ticket')
            .setStyle(ButtonStyle.Secondary)

        

        const row1 = new ActionRowBuilder()
            .addComponents(gensupButton)


        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('Interview Tickets')
            .setThumbnail(interaction.guild.iconURL())
            .setDescription('>>> Please click here to open a ticket to setup an interview with a user.')
            .setFooter({
                text: 'Ticket System'
            })
            .setTimestamp()


        let msg = MessagePayload.create(interaction.channel, {
            embeds: [embed],
            components: [row1]
        })

        await interaction.channel.send(msg)

    }
}