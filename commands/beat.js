module.exports = {
  name: 'beat',
  description: 'beat command',
  execute(message, args){
    const discord = require('discord.js')
    let user = message.mentions.users.first() || message.author
       let usera = {
            avatar: user.avatarURL({dynamic:true})
       }
                    let embed = new discord.MessageEmbed()
                    .setDescription(`<@!${user.id}> **schlägt um sich, wie ein Irrer!**`)
                    .setThumbnail(usera.avatar)
                    .setTimestamp()
                    .setImage("http://www.bravogif.com/wp-content/uploads/2014/09/20140929-pad-padding.gif")
                    .setColor("GREY")
                    
                    message.channel.send(embed)
  }
    }