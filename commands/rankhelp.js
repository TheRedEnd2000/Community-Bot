  module.exports = {
  name: 'rang',
  description: 'ranghilfe command',
  execute(message, args){
    const discord = require('discord.js')
          let embed2 = new discord.MessageEmbed()
        .setTitle(":speech_balloon: Sending you a Message!")
        .setColor("WHITE")
        .setTimestamp()
        message.channel.send(embed2)
  let embed = new discord.MessageEmbed()
  .setTitle("Rang Hilfe")
  .setDescription("**Erstelle folgende Ränge:**\nCoin Master, Coin Master 2, Coin Master 3, Coin Master 4, Coin Master 5, Coin Suchti\n\n**ACHTE DARAUF DAS DU DIE RÄNGE GENAU SO SCHREIBST!!!!!!!!!**")
  .setColor("RED")
      message.author.send(embed)}}