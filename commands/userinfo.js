const discord = require('discord.js')
const moment = require('moment')
module.exports = {
  name: 'ui',
  description: 'userinfo command',
  execute(message, args){
    let user = message.mentions.users.first() || message.author
    let embed = new discord.MessageEmbed()
    .setThumbnail(user.avatarURL({dynamic: true}))
    .setColor("RANDOM")
        .addField('User', [
      `**> Name:** ${user.username}`,
      `**> Diskriminator:** ${user.discriminator}`,
      `**> ID:** ${user.id}`,
      `**> Avatar:** [Avatar Link](${user.avatarURL({dynamic: true})})`,
      `**> Erstellt am:** ${moment(user.createdTimestamp).format('LT')} ${moment(user.createdTimestamp).format('LL')} (${moment(user.createdTimestamp).fromNow()})`,
      `**> Status:** ${user.presence.status}`,
      `**> Spielt:** ${user.presence.game || 'Spielt kein Spiel'}`
      `\u200b`
    ])
    message.channel.send(embed)
  }
}