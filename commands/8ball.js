 module.exports = {
  name: '8ball',
  description: '8ball command',
  cooldown: 10,
  execute(message, args){
    const discord = require('discord.js')

 let antwort = ["Ja", "Vielleicht", "Kann ich nicht sagen", "Nein","Auf jeden Fall", "Auf jeden Fall nicht", "Denke schon", "Niemals","Schwäre Entscheidung"]
 let frage = message.content.split(" ").slice(1).join(" ");
 if(!frage) return message.channel.send("Bitte nenne mir eine Frage!") 
 let embed = new discord.MessageEmbed()
   .setTitle(":8ball:8-ball")
   .setDescription(`Deine Frage war:\n**${frage}**\nMeine Antwort:\n**__${antwort[Math.floor(Math.random()*antwort.length)]}__**`)
   .setThumbnail("https://cdn.discordapp.com/attachments/843141285896126464/879998843880611860/8ball.PNG")
   .setColor("BLACK")
   .setTimestamp()
   message.channel.send(embed)}}