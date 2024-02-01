const {
    EmbedBuilder,
    ChannelType,
    PermissionsBitField,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    MessagePayload
} = require("discord.js");
const {
    client
} = require("../index");
module.exports = async (instance, message) => {

    

    client.on('interactionCreate', async (interaction) => {

        const genSupOpened = new EmbedBuilder()
        .setColor('Aqua')
        .setTitle('General Enquiry')
        .setDescription('>>> Thank you for contacting human resources \nPlease tell us how we can help and await a response!')
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL())
        .setFooter({
            text: 'Ticket System'
        })

    const joinUsOpened = new EmbedBuilder()
        .setColor('Aqua')
        .setTitle('Joining Us Ticket')
        .setDescription('>>> Thank you for contacting human resources \nPlease tell us how we can help and await a response!')
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL())
        .setFooter({
            text: 'Ticket System'
        })

    const goldTicket = new EmbedBuilder()
        .setColor('Aqua')
        .setTitle('Gold Command Ticket')
        .setDescription('>>> Thank you for contacting the senior leadership team \nPlease tell us how we can help and await a response!')
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL())
        .setFooter({
            text: 'Ticket System'
        })

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

        if (!interaction.isButton()) return;

        // ?GENERAL SUPPORT 
        if (interaction.customId === 'gensup') {

            let channelName = `gen-enquiry-${interaction.user.tag}`
            let parent = '1176206837998174249'

            let newTicket = await interaction.guild.channels.create({
                name: channelName,
                parent: parent,
                topic: `${interaction.user.id}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: '1175906019478618204', // ! HR ROLE
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
                    embeds: [genSupOpened],
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
                await channel.send(`<@&1175906019478618204>`)
            })

        } // *END

        // ?SERVER SUPPORT 
        if (interaction.customId === 'joinus') {

            let channelName = `looking-to-join-${interaction.user.tag}`
            let parent = '1176206837998174249'

            let newTicket = await interaction.guild.channels.create({
                name: channelName,
                parent: parent,
                topic: `${interaction.user.id}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [{
                        id: interaction.user.id,
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
                    embeds: [joinUsOpened],
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
                await channel.send(`<@&1175906019478618204>`)
            })

        } // *END

        // ?USER SUPPORT 
        if (interaction.customId === 'goldTicket') {

            let channelName = `gold-enquiry-${interaction.user.tag}`
            let parent = '1176206837998174249'

            let newTicket = await interaction.guild.channels.create({
                name: channelName,
                parent: parent,
                topic: `${interaction.user.id}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: '1175905785117687920', // !GOLD ROLE
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
                    embeds: [goldTicket],
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
                await channel.send(`<@&1175906019478618204>`)
            })

        } // *END

        // ?SERVER SUPPORT 
        if (interaction.customId === 'interview') {

            let channelName = `interview-${interaction.user.tag}`
            let parent = '1176206837998174249'

            let newTicket = await interaction.guild.channels.create({
                name: channelName,
                parent: parent,
                topic: `${interaction.user.id}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [{
                        id: interaction.user.id,
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

        } // *END



    })
}