module.exports = {
  name: 'say',
  description: 'say command',
  execute(message, args){
    const discord = require('discord.js')
        let text = message.content.split(" ").slice(1).join(" ");
      if(!text) return message.channel.send("Du hast vergessen zu schreiben, was ich sagen soll!").then(msg=>msg.delete({timeout:"5000"}));  
           
           let embed = new discord.MessageEmbed()
           .setDescription(`${text}`)
           .setColor("RANDOM")
           message.channel.send(embed)
  }
}  