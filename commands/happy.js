module.exports = {
  name: 'happy',
  description: 'happy command',
  execute(message, args){
    const discord = require('discord.js')
    const slash = require('slash_commands.js')
            const embed = new discord.MessageEmbed()
        .setTitle("Da freut sich jemand!")
        .setColor("GOLD")
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/attachments/714755677284728843/753999301595758652/tenor_100.gif")
        .setImage("https://cdn.discordapp.com/attachments/714755677284728843/753999301595758652/tenor_100.gif")
        message.channel.send(embed)
  }
}