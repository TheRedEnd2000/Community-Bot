module.exports = {
  name: 'waterfall',
  description: 'ebild command',
  execute(message, args){
    const discord = require('discord.js')
            let embed = new discord.MessageEmbed()
        .setTitle("Wasserfall")
        .setColor("BLUE")
        .setTimestamp()
        .setThumbnail("https://i.pinimg.com/originals/04/79/ed/0479ed3141158b1f81cfae6d892cd657.gif")
        .setImage("https://i.pinimg.com/originals/04/79/ed/0479ed3141158b1f81cfae6d892cd657.gif")
        message.channel.send(embed)
  }
}