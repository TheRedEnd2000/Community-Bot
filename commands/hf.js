module.exports = {
  name: 'hf',
  description: 'highfive command',
  execute(message, args){
    const discord = require('discord.js')
     let user2 = message.author
let user = message.mentions.users.first()
if(!user) return message.reply("bitte gebe eine User an!")
                    let embed = new discord.MessageEmbed()
                    .setTitle("Highfive!")
                    .setDescription(`**<@!${user2.id}> klatscht <@${user.id}> ab, wie cool! **:3`)
                    .setTimestamp()
                    .setImage("https://cdn.discordapp.com/attachments/768393068792512532/799575846456918016/tenor_4.gif")
                    .setColor("YELLOW")
                    
                    message.channel.send(embed)
  }
    }