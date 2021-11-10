module.exports = {
  name: 'clear',
  description: 'clear command',
  execute(message, args){
    const discord = require('discord.js')
        let messages = message.content.split(" ").slice(1).join("");

        if(isNaN(messages)) return message.reply("Du hast keine Zahl angegeben, sonder Buchstaben.").then(msg=>msg.delete({timeout:"5000"}));

        message.channel.bulkDelete(messages)

        message.reply("ich habe " + messages + " Nachrichten gelöscht.").then(msg=>msg.delete({timeout:"5000"}))
        
  }
}