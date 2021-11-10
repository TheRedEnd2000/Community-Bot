module.exports = {
  name: 'impfung',
  description: 'impf command',
  execute(message, args){
    const discord = require('discord.js')
    let test = ["Gut", "Schlecht", "Gut", "Gut"]
            let user = message.mentions.users.first()
            let user2 = message.author
            let user3 =message.author.username
            let embed = new discord.MessageEmbed()
            .setTitle("💉Impfung")
            .setDescription(`Die Impfung von ${user2} ist **__${test[Math.floor(Math.random() * test.length)]}__** verlaufen.`)
            .setColor("RED")
            .setTimestamp()
            if(!user) return message.channel.send(embed)
            let embed2 = new discord.MessageEmbed()
            .setTitle(`💉Impfung`)
            .setDescription(`${user2} zwingt ${user} sich zu Impfen! Die Impfung ist dabei **__${test[Math.floor(Math.random() * test.length)]}__** verlaufen!`)
            .setColor("RED")
            .setTimestamp()
            if(user) message.channel.send(embed2)
  }
    }