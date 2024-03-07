const {
    client
} = require("../index");
const {
    MessagePayload,
    ChannelType,
    PermissionsBitField,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
    EmbedBuilder,


} = require("discord.js");
module.exports = async (interaction) => {

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === 'iv-modal') {

            const interviewOpened = new EmbedBuilder()
                .setColor('Aqua')
                .setTitle('Interview')
                .setDescription('>>> This ticket will be used for Human Resources to liase with applicants about their interview')
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL())
                .setFooter({
                    text: 'Ticket System'
                })


            const ticketInfo = new EmbedBuilder()
                .setTitle('Ticket Information')
                .setDescription(`Ticket Owner: <@${interaction.user.id}> \`(${interaction.user.id})\``)
                .setColor('Green')
                .setTimestamp()


            const uid = interaction.fields.getTextInputValue('idInput');

            


            let channelName = `interview-${uid}`
            let parent = '1176206837998174249'

            try {
            let newTicket = await interaction.guild.channels.create({
                name: channelName,
                parent: parent,
                topic: `${uid}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: `${uid}`,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: '1175906019478618204', // !HR ROLE
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    }
                ],

            }).then(async channel => {
                const closeButton = new ButtonBuilder()
                    .setCustomId('close')
                    .setEmoji('🔒')
                    .setLabel('Close')
                    .setStyle(ButtonStyle.Danger)

                const claimButton = new ButtonBuilder()
                    .setCustomId('claim')
                    .setEmoji('🤚🏻')
                    .setLabel('Claim')
                    .setStyle(ButtonStyle.Primary)

                const row1 = new ActionRowBuilder()
                    .addComponents(closeButton, claimButton)

                let msg = MessagePayload.create(channel, {
                    embeds: [interviewOpened],
                    components: [row1]
                })

                let info = MessagePayload.create(channel, {
                    embeds: [ticketInfo]
                })

                await interaction.reply({
                    content: `Your ticket has been made at <#${channel.id}>`,
                    ephemeral: true
                })

                await channel.send(msg).then(channel.send(info))


            })
        } catch (err) {
            interaction.reply({content: `An error occured: ${err} \n\n**Ensure that your input is a users ID**`, ephemeral: true})

        }

    } 


    })
}