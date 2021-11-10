module.exports = {
  name: 'sunset',
  description: 'ebild command',
  execute(message, args){
    const discord = require('discord.js')
            let embed = new discord.MessageEmbed()
        .setTitle("Sonnenuntergang")
        .setColor("YELLOW")
        .setTimestamp()
        .setThumbnail("https://img.fotocommunity.com/der-entspannende-blick-auf-das-abendliche-meer-c6aa7f97-5a22-407f-9602-94d4896fbf09.jpg?height=1080")
        .setImage("https://img.fotocommunity.com/der-entspannende-blick-auf-das-abendliche-meer-c6aa7f97-5a22-407f-9602-94d4896fbf09.jpg?height=1080")
        message.channel.send(embed)
  }
}