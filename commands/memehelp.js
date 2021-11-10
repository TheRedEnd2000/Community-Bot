module.exports = {
  name: 'meme',
  description: 'memehelp command',
  execute(message, args){
    const discord = require('discord.js')
    let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }
        const embed4 = new discord.MessageEmbed()
.setTitle('😆__Memes__')
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=261993005047&scope=applications.commands%20bot) ⬅️\nAuf die Website: [Website](https://www.community-bot.ml) ⬅️\nSupport DC Server: [Server](https://discord.gg/G42KGMMtjj) ⬅️`)
.addField("**`dememe`**", "Zeigt dir Deutsche Memes",false)
.addField("**`almeme`**", "Zeigt dir Allgemeine Memes",false)
.addField("**`mcmeme`**", "Zeigt dir Minecraft Memes",false)
.addField("**`catmeme`**", "Zeigt dir Katzen Memes",false)
.addField("**`dogmeme`**", "Zeigt dir Hunde Memes",false)
.setColor("RANDOM")
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
message.channel.send(embed4)
  }
}