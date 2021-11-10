module.exports = {
  name: 'avatar',
  description: 'avatar command',
  execute(message, args){
    const discord = require('discord.js')     
            if(message.mentions.users.first()){
              message.delete()
                var user = message.mentions.users.first()
                var attachment = new discord.MessageAttachment(user.avatarURL())
                let embed = new discord.MessageEmbed()
                .setDescription(`**Avatar von ${user}**\n\n**Avatar als:**\n [PNG](${message.member.user.avatarURL()}) | [JPG](${message.member.user.avatarURL({dynamic:true})}) | [WEPG](${message.member.user.avatarURL({dynamic:true})})`)
                .setImage(user.avatarURL({dynamic:true}))
                .setTimestamp()
                message.channel.send(embed)
            }else{
             var attachment = new discord.MessageAttachment(message.member.user.avatarURL())
             let user7 = message.author.username
             let embed = new discord.MessageEmbed()
             .setTitle(`${user7}'s Avatar`)
             .setDescription(`**Avatar als:**\n [PNG](${message.member.user.avatarURL()}) | [JPG](${message.member.user.avatarURL({dynamic:true})}) | [WEPG](${message.member.user.avatarURL({dynamic:true})})`)
             .setImage(message.member.user.avatarURL({dynamic:true}))
             .setTimestamp()
               message.channel.send(embed)
             
            }}}