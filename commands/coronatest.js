module.exports = {
  name: 'ct',
  description: 'coronatest command',
  execute(message, args){
    const discord = require('discord.js')
    let test = ["negativ", "positiv", "negativ", "negativ"]
            let user = message.mentions.users.first()
            let user2 = message.author
            let user3 =message.author.username
            let embed = new discord.MessageEmbed()
            .setTitle("Conronatest")
            .setDescription(`Der Coronatest von ${user2} ist **__${test[Math.floor(Math.random() * test.length)]}__** ausgefallen.`)
            .setColor("RED")
            .setTimestamp()
            if(!user) return message.channel.send(embed)
            let embed2 = new discord.MessageEmbed()
            .setTitle(`Conronatest`)
            .setDescription(`Der Coronatest von ${user} ist **__${test[Math.floor(Math.random() * test.length)]}__** ausgefallen.`)
            .setColor("RED")
            .setTimestamp()
            if(user) message.channel.send(embed2)
  }
    }