module.exports = {
  name: 'lach',
  description: 'lach command',
  execute(message, args){
    const discord = require('discord.js')
    let user = message.mentions.users.first() || message.author
       let usera = {
            avatar: user.avatarURL({dynamic:true})
       }
                    let embed = new discord.MessageEmbed()
                    .setDescription(`<@!${user.id}> **lacht sich kaputt!**`)
                    .setThumbnail(usera.avatar)
                    .setTimestamp()
                    .setImage("https://media1.tenor.com/images/1452313dab0668d1e892dfb90927453c/tenor.gif?itemid=5932943")
                    .setColor("GREY")
                    
                    message.channel.send(embed)
  }
    }