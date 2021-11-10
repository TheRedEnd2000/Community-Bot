module.exports = {
  name: 'gg',
  description: 'gg command',
  execute(message, args){
    const discord = require('discord.js')
         let embed = new discord.MessageEmbed()
       .setTitle("<:GG:869271833600458813><:GG:869271833600458813><:GG:869271833600458813><:GG:869271833600458813><:GG:869271833600458813>")
        .setColor("RANDOM")
        .setDescription("Hilfe und Support: https://fkircher2007.wixsite.com/therednetworkbot\n\nGG!\nɢɢ!\nɠɠ!\n𝑔𝑔!\n𝕘𝕘!")
        .setTimestamp()

        message.channel.send(embed)
  }
}