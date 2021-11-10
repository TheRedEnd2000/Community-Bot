module.exports = {
  name: 'ping',
  description: 'ping command',
  execute(message, args){
    const discord = require('discord.js')
        let embed = new discord.MessageEmbed()
        .setTitle("Oase der Ruhe")
        .setColor("GREEN")
        .setTimestamp()
        .setThumbnail("https://f4.bcbits.com/img/a1367723289_10.jpghttps://f4.bcbits.com/img/a1367723289_10.jpg")
        .setImage("https://f4.bcbits.com/img/a1367723289_10.jpg")
        message.channel.send(embed)
  }
}