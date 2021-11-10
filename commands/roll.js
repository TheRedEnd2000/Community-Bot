module.exports = {
  name: 'roll',
  description: 'würfel command',
  execute(message, args){
    const discord = require('discord.js')
    let numbers = ["1", "2", "3", "4", "5", "6"]
let user = message.author.avatarURL({dynamic:true})
let user2 = message.author.username
message.channel.send("Es wird gewürfelt...").then(msg=>msg.delete({timeout:"60000"}))

 let embed = new discord.MessageEmbed()
 .setTitle("Würfeln")
 .setDescription(`Deine Zahl ist **${numbers[Math.floor(Math.random() * numbers.length)]}**`)
 .setColor("BLUE")
 .setTimestamp()
 .setFooter(`angefordert von ${user2}`, `${user}`)
message.channel.send(embed)
  }
    }