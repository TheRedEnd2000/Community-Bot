module.exports = {
  name: 'modhelp',
  description: 'mod commands',
  execute(message, args){
    const discord = require('discord.js')
            let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }
    const embed2 = new discord.MessageEmbed()
.setTitle('🧑‍⚖️__Moderation__')
.addField("**`clear`**", "Lösche ein bestimmte Anzahl an Nahrrichten",false)
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=261993005047&scope=applications.commands%20bot) ⬅️\nAuf die Website: [Website](https://www.community-bot.ml) ⬅️\nSupport DC Server: [Server](https://discord.gg/G42KGMMtjj) ⬅️`)
.addField("**`ban`**", "Banne eine User vom Server",false)
.addField("**`kick`**", "Kicke einen User vom Server",false)
.addField("**`warn`**", "Warne einen User auf dem Server",false)
.addField("**`ticketi`**", "Bekomme eine Infos für das Ticketsystem",false)
.addField("**`mute`**", "Schalte einen User Stumm!",false)
.addField("**`unmute`**", "Entstumme einen User!",false)
.addField("**`vmute`**", "Stumme einen User in allen Voice Kanälen!",false)
.addField("**`vunmute`**", "Entstumme einen User von allen Voice kanälen!!",false)
.addField("**`gstart`**", "Starte ein Gewinnspiel!",false)
.addField("**`regelwerk`**", "Bekomme ein Regelwerk vom Bot das du für den Server einsetzten kannst",false)
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
.setColor("RANDOM")
message.channel.send(embed2)
  }
}