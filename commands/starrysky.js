module.exports = {
  name: 'ss',
  description: 'ebild command',
  execute(message, args){
    const discord = require('discord.js')
            let embed = new discord.MessageEmbed()
        .setTitle("Der Sternenhimmel")
        .setColor("BLACK")
        .setTimestamp()
        .setThumbnail("https://i.pinimg.com/originals/53/a2/ee/53a2ee896132a2378d83e7a9f7120f84.jpg")
        .setImage("https://i.pinimg.com/originals/53/a2/ee/53a2ee896132a2378d83e7a9f7120f84.jpg")
        message.channel.send(embed)
  }
}