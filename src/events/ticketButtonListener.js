const {
    client
} = require("../index");
const {
    EmbedBuilder,
    MessagePayload,
    ChannelType,
    PermissionsBitField,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
} = require("discord.js");
const transcripts = require('discord-html-transcripts');
module.exports = async (interaction) => {

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isButton()) return;


        if (interaction.customId === 'close') {

            if (!interaction.member.roles.cache.has('1175906019478618204')) {

                interaction.reply({
                    content: 'You do not have permission to close tickets',
                    ephemeral: true
                })

            } else {

                const attachment = await transcripts.createTranscript(interaction.channel, {
                    limit: 10000,
                    returnType: 'attachment',
                    fileName: `${interaction.channel.name}.html`,
                    saveImages: true
                });

                let tchannel = interaction.guild.channels.cache.find(c => c.id === '1176210998361858058')

                let tembed = new EmbedBuilder()
                    .setColor('Yellow')
                    .setTitle('Transcript Saved')
                    .setDescription(`The ticket transcript has been saved by <@${interaction.user.id}> (${interaction.user.tag})`)

                let tmsg = MessagePayload.create(interaction.channel, {
                    embeds: [tembed]
                })

                await interaction.channel.send(tmsg)

                let savedEmbed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle('New Transcript')
                    .setDescription(`Ticket transcript for ${interaction.channel.name}. Ticket closed by ${interaction.user.tag}`)
                    .setTimestamp()

                let transcriptmsg = MessagePayload.create(tchannel, {
                    embeds: [savedEmbed],
                    files: [attachment]
                })

                await tchannel.send(transcriptmsg)

                const deleting = new EmbedBuilder()
                    .setColor('Yellow')
                    .setDescription("This ticket will be deleted in 10 seconds")

                let deleteMsg = MessagePayload.create(interaction.channel, {
                    embeds: [deleting]
                })

                await interaction.channel.send(deleteMsg).then(
                    interaction.deferUpdate().then(
                        setTimeout(() => {
                            interaction.channel.delete()

                        }, 10000)
                    ))

            }

        }

        if (interaction.customId === 'claim') {

            if (!interaction.member.roles.cache.has('1175906019478618204')) {
                interaction.reply({
                    content: 'You do not have permission to claim tickets',
                    ephemeral: true
                })
            } else {
                interaction.deferUpdate()
                const success = new EmbedBuilder()
                    .setColor('Green')
                    .setDescription(`This ticket has been successfully claimed by <@${interaction.user.id}>`)

                let logMsg = MessagePayload.create(interaction.channel, {
                    embeds: [success]
                })

                await interaction.channel.setName(`${interaction.user.tag}-doing`)

                // await interaction.channel.setName(`${interaction.user.tag}-doing`).then(interaction.channel.send(logMsg))
                await interaction.channel.send(logMsg)
            }


        }





    })
}