module.exports = {
  name: 'iq',
  description: 'iq command',
  execute(message, args){
    const discord = require('discord.js')
      let iq = Math.floor(Math.random() * 230) + 0;
 let user2 = message.author
 let user3 = message.author.username
let user = message.mentions.users.first()
let embed2 = new discord.MessageEmbed()
.setTitle("IQ Test")
.setDescription(`Der IQ von ${user2} beträgt **__${iq}/230__**`)
.setColor("WHITE")
.setTimestamp()
if(!user) return message.channel.send(embed2)
let embed = new discord.MessageEmbed()
.setTitle(`IQ Test`)
.setDescription(`Der IQ von <@!${user.id}> beträgt: **__${iq}/230__**`)
.setTimestamp()
.setColor("WHITE")
message.channel.send(embed)
  }
    }