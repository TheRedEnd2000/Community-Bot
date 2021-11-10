module.exports = {
  name: 'vote',
  description: 'vote command',
  execute(message, args){
    const discord = require('discord.js')
    let embed = new discord.MessageEmbed()
    .setTitle(`Jetzt für **Community Bot** Voten`)
    .setDescription(`Vote jetzt für <@826106313175203931> !\n\n<:dbl:880062659091894302>__Discord Bot List:__\n**__[Vote](https://discordbotlist.com/bots/community-bot-3833)__**\n\n**Danke für jeden Vote!**`)
    .setColor("BLUE")
    .setTimestamp()
    message.channel.send(embed)
  }
    }