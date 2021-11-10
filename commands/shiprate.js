module.exports = {
  name: 'sr',
  description: 'shiprate command',
  execute(message, args){
    const discord = require('discord.js')
let sr = Math.floor(Math.random() * 100) + 0;
 let user2 = message.author
 let user3 = message.author.username
let user = message.mentions.users.first()
let embed = new discord.MessageEmbed()
.setTitle("Liebes Test💓")
.setDescription(`${user2} passt zu **__${sr}%💓__** mit ${user} zusammen!`)
.setColor("PURPLE")
.setTimestamp()
.setFooter("💓LIEBES TEST💓")
if(!user) return message.channel.send("Bitte gebe einen User an!")
message.channel.send(embed)
  }
    }