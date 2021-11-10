module.exports = {
  name: 'binfo',
  description: 'bot info command',
  execute(message, args){
    const discord = require('discord.js')
    let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }
    const embed6 = new discord.MessageEmbed()
.setTitle('🤖__Bot Info__') 
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=261993005047&scope=applications.commands%20bot) ⬅️\nAuf die Website: [Website](https://www.community-bot.ml) ⬅️\nSupport DC Server: [Server](https://discord.gg/G42KGMMtjj) ⬅️`)
.addField("**`prefix`**", "Bekomme den Prefix des Bots auf dem Server",false)
.addField("**`about`**", "Ein paar Infos über den Bot",false)
.addField("**`bugreport`**", "Sende einen Bug den du entdeckt hast ein",false)
.addField("**`idee`**", "Sende eine Idee ein die dir beim Bot noch fehlt",false)
.addField("**`vote`**", "Vote für den Bot",false)
.addField("**`ping`**", "Erfahre den Ping des Bots",false)
.setColor("RANDOM")
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
message.channel.send(embed6)
  }
}