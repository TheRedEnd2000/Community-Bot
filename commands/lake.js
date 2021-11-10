module.exports = {
  name: 'lake',
  description: 'ebild command',
  execute(message, args){
    const discord = require('discord.js')
            let embed = new discord.MessageEmbed()
        .setTitle("Der See")
        .setColor("BLUE")
        .setTimestamp()
        .setThumbnail("http://img.fotocommunity.com/entspannung-am-hopfensee-90c9686f-987f-4f3d-b2ad-9acea3348570.jpg?height=1080")
        .setImage("http://img.fotocommunity.com/entspannung-am-hopfensee-90c9686f-987f-4f3d-b2ad-9acea3348570.jpg?height=1080")
        message.channel.send(embed)
  }
}