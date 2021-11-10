module.exports = {
  name: 'love',
  description: 'love command',
  execute(message, args){
    const discord = require('discord.js')
     let user2 = message.author
let user = message.mentions.users.first()
if(!user) return message.reply("bitte gebe eine User an!")
                    let embed = new discord.MessageEmbed()
                    .setTitle("Wie schön")
                    .setDescription(`**<@!${user2.id}> hat sich <@${user.id}> verliebt, das muss gefeiert werden! **:3`)
                    .setTimestamp()
                     .setImage("https://i.pinimg.com/originals/3b/56/33/3b56330f710c3a978f27c9cc7e099180.gif")
                    .setColor("RED")
                    
                    message.channel.send(embed)
  } 
  }
