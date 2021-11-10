module.exports = {
  name: 'gci',
  description: 'gci command',
  execute(message, args){
    const discord = require('discord.js')

    let embed = new discord.MessageEmbed()
       
        .setTitle("**Global Chat Info**")
        .setColor("RANDOM")
        .setDescription("**GLOABALCHAT AUSER BETRIEB**")
        .setTimestamp()     
        message.channel.send(embed)}}
        /*let embed = new discord.MessageEmbed()
       
        .setTitle("**Global Chat Info**")
        .setColor("RANDOM")
        .setDescription("Hilfe und Support: https://fkircher2007.wixsite.com/therednetworkbot\n\n1. Erstelle einen Kanal Namens: global. Achte auf die Rehtschreibeung, er muss genau so geschrieben werden!\nWenn du nun etwas in den Channel hineinschreibst kommt er auf allen Servern die den Channel auch haben an!\n\n**Weiterentwicklung in Arbeit!**")
        .setTimestamp()     
        message.channel.send(embed)
        */