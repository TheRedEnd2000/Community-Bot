module.exports = {
  name: 'funhelp',
  description: 'fun command',
  execute(message, args){
    const discord = require('discord.js')
    let embed3 = new discord.MessageEmbed()
.setTitle('🙌__Fun__')
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=261993005047&scope=applications.commands%20bot) ⬅️\nAuf die Website: [Website](https://www.community-bot.ml) ⬅️\nSupport DC Server: [Server](https://discord.gg/G42KGMMtjj) ⬅️`)
.addField("**`repeat`**", "Lasse den Bot eine Nahricht wiederholen",false)
.addField("**`roll`**", "Lasse einen Würfel rollen",false)
.addField("**`iq`**", "Lasse dir dein oder anderen ihr IQ anzeigen",false)
.addField("**`wetter`**", "Schaue nach dem Wetter!",false)
.addField("**`gg`**", "Lasse GG in verschiedenen Schriftarten schreiben",false)
.addField("**`8ball`**", "Frage den Bot etwas und er gibt dir eine Antwort",false)
.addField("**`love`**", "Verliebe dich in einen anderen User",false)
.addField("**`avatar`**", "Bekomme dein oder anderen ihr Avatar",false)
.addField("**`embed`**", "Erstelle ein eigenes Embed über den Bot",false)
.addField("**`kill`**", "Töte einen anderen User",false)
.addField("**`userinfo`**", "Bekomme eine Info über dich und andere User",false)
.addField("**`ebilder`**", "Bekomme eine Liste von schönen Bildern",false)
.addField("**`coronatest`**", "Mache einen Coronatest",false)
.addField("**`impfung`**", "Lass dich gegen Corona impfen",false)
.addField("**`laugh`**", "Lache wie ein Irrer",false)
.addField("**`beat`**", "Schlage wie ein Wilder",false)
.addField("**`serverinfo`**", "Bekomme eine Info über den Server",false)
.addField("**`write`**", "Schreibe etwas in besondener Schrift",false)
.addField("**`yt`**", "Abonniere <@767994933465317387> auf Youtube",false)
.addField("**`search google/youtube/twitch`**", "Suche etwas über den Bot")
.setColor("RANDOM")
.setFooter(`${message.guild.name}`, `${message.guild.iconURL({dynamic:true})}`)
.setTimestamp()
message.channel.send(embed3)
  }
}