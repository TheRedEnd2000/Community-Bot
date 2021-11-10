module.exports = {
  name: 'night',
  description: 'ebild command',
  execute(message, args){
    const discord = require('discord.js')
            let embed = new discord.MessageEmbed()
        .setTitle("Die Ruhe Der Nacht")
        .setColor("BLACK")
        .setTimestamp()
        .setThumbnail("https://i.ytimg.com/vi/-gfUkQ70-x0/maxresdefault.jpg")
        .setImage("https://i.ytimg.com/vi/-gfUkQ70-x0/maxresdefault.jpg")
        message.channel.send(embed)
  }
}