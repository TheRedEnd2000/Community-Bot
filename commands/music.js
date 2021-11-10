module.exports = {
  name: 'music',
  description: 'music command',
  execute(message, args){
    const discord = require('discord.js')
    let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }
        const embed8 = new discord.MessageEmbed()
.setTitle('🎶__Music__') 
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=261993005047&scope=applications.commands%20bot) ⬅️\nAuf die Website: [Website](https://www.community-bot.ml) ⬅️\nSupport DC Server: [Server](https://discord.gg/G42KGMMtjj) ⬅️`)
.addField("**`p!play`**", "Lasse einen Song spielen!",false)
.addField("**`p!skip`**", "Skip den Song!",false)
.addField("**`p!stop`**", "Stoppe die Music!",false)
.addField("**`p!3d`**", "Lasse einen Song 3d mäsig klingen!",false)
.addField("**`p!queue`**", "Zeigt dir die Warteschleife an!",false)
.setColor("RANDOM")
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
message.channel.send(embed8)
  }
}