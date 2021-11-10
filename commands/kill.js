module.exports = {
  name: 'kill',
  description: 'kill command',
  execute(message, args){
    const discord = require('discord.js')
     let user2 = message.author
let user = message.mentions.users.first()
if(!user) return message.reply("bitte gebe eine User an!")
                    let embed = new discord.MessageEmbed()
                    .setTitle("Abstechung!")
                    .setDescription(`**<@!${user2.id}> sticht <@${user.id}> einfach ab! Was hat er sich dabei nur gedacht? **:c`)
                    .setTimestamp()
                    .setImage("https://cdn.discordapp.com/attachments/714755677284728843/750400983833509998/tenor_43.gif")
                    .setColor("BLACK")
                    
                    message.channel.send(embed)
  }
    }