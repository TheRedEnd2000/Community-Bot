module.exports = {
  name: 'gay',
  description: 'gay command',
  execute(message, args){
    const discord = require('discord.js')
let gay = Math.floor(Math.random() * 100) + 0;
 let user2 = message.author
 let user3 = message.author.username
let user = message.mentions.users.first()
let embed2 = new discord.MessageEmbed()
.setTitle("Gay Test")
.setDescription(`Die Gayrate von ${user2} beträgt **__${gay}%__**`)
.setColor("PINK")
.setTimestamp()
if(!user) return message.channel.send(embed2)
let embed = new discord.MessageEmbed()
.setTitle(`Gay Test`)
.setDescription(`Die Gayrate von <@!${user.id}> beträgt: **__${gay}%__**`)
.setTimestamp()
.setColor("PINK")
message.channel.send(embed)
  }
    }