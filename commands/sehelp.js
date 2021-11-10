module.exports = {
  name: 'settings',
  description: 'setting command',
  execute(message, args){
    const discord = require('discord.js')
    let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }
        const embed5 = new discord.MessageEmbed()
.setTitle('⚙️ __Settings__')
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=261993005047&scope=applications.commands%20bot) ⬅️\nAuf die Website: [Website](https://www.community-bot.ml) ⬅️\nSupport DC Server: [Server](https://discord.gg/G42KGMMtjj) ⬅️`)
.addField("**`welcomehelp`**", "Bekomme die Befehle vom Welcome/Leave System",false)
.addField("**`rankhelp`**", "Erstelle die Economy System Ränge!",false)
.addField("**`ticketi`**", "Bekommst eine Nahricht zum einstellen des Ticketsystems",false)
.addField("**`globalchatinfo`**", "Bekomme Infos zum Globalchat.",false)
.addField("**`setprefix`**", "Bestimme einen neuen Prefix für den Server",false)
.setColor("RANDOM")
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
message.channel.send(embed5)
  }
}