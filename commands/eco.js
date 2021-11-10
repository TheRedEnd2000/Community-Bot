module.exports = {
  name: 'eco',
  description: 'eco command',
  execute(message, args){
    const discord = require('discord.js')
    let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }
const embed7 = new discord.MessageEmbed()
.setTitle('💰__Economy__') 
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=261993005047&scope=applications.commands%20bot) ⬅️\nAuf die Website: [Website](https://www.community-bot.ml) ⬅️\nSupport DC Server: [Server](https://discord.gg/G42KGMMtjj) ⬅️`)
.addField("**`coins`**", "Siehe nach wie viele Coins du hast!",false)
.addField("**`flip`**", "Wirf eine Münze!",false)
.addField("**`shop`**", "Schaue dir die Ränge im Shop an!",false)
.addField("**`buy`**", "Kaufe dir einen Rang aus dem Shop!",false)
.addField("**`daily`**", "Hole dir deine Tägliche Belohnung ab!",false)
.setColor("RANDOM")
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
message.channel.send(embed7)
  }
}