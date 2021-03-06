module.exports = {
  name: 'help',
  description: 'help commands',
  execute(message, args){
    const discord = require('discord.js')
    const slash = require("slash_commands.js")
    const { MessageMenuOption, MessageMenu, MessageActionRow } = require('discord-buttons')
const disbut = require("discord-buttons")
        let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }

const embed = new discord.MessageEmbed()
.setTitle('🖥️__Hilfe | Allgemein__')
.addField("🧑‍⚖️ **Moderation:**(11)", "Zeige dir alle Befehle für die Moderationshilfe an!", true)
.addField("🙌**Fun**(21)", "Zeige dir viele Fun Befehle an!", true)
.addField("😆**Memes**(5)", "Zeige dir verschiedene Memes zu Themen an!", true)
.addField("⚙️**Settings:**(5)", "Zeigt dir Settings die man einstellen kann um noch mehr Spaß zu haben!", true)
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=0&scope=bot%20applications.commands) ⬅️\nAuf die Website: [Website](https://website.theredend2000.repl.co/index.php) ⬅️\nSupport DC Server: [Server](https://discord.gg/g6GdhJzVGJ) ⬅️`)
.setColor("RANDOM")
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
//.setThumbnail()
.addField("🤖**Bot Infos:**(6)", "Eine kleine Bot Übersicht für dich!", true)
.addField("💰**Economy:**(7)", "Ein paar Economy für keinen Spaß!", true)
.addField("🎶**Musik:**(6)", "Zeigt dir Befehle für Musik!", true)
//.addField("🆙**Level**(6)", "Zeigdir Befehle für das Levelsystem an!", true)
.addField("ALLE BEFEHLE AUCH HIER:⬅️", "[ALLE COMMANDS](https://website.theredend2000.repl.co/commands.php)")
const embed2 = new discord.MessageEmbed()
.setTitle('🧑‍⚖️__Moderation__')
.addField("**`clear`**", "Lösche ein bestimmte Anzahl an Nahrrichten",false)
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=0&scope=bot%20applications.commands) ⬅️\nAuf die Website: [Website](https://website.theredend2000.repl.co/index.php) ⬅️\nSupport DC Server: [Server](https://discord.gg/g6GdhJzVGJ) ⬅️`)
.addField("**`ban`**", "Banne eine User vom Server",false)
.addField("**`kick`**", "Kicke einen User vom Server",false)
.addField("**`warn`**", "Warne einen User auf dem Server",false)
.addField("**`nuke`**", "Nuke einen Kanal",false)
.addField("**`timemute`**", "Stumme einen User für eine gewisse Zeit",false)
.addField("**`mute`**", "Schalte einen User Stumm!",false)
.addField("**`unmute`**", "Entstumme einen User!",false)
.addField("**`vmute`(PREMIUM)**", "Stumme einen User in allen Voice Kanälen!",false)
.addField("**`vunmute`(PREMIUM)**", "Entstumme einen User von allen Voice kanälen!",false)
.addField("**`gstart`**", "Starte ein Gewinnspiel!",false)
.addField("**`regelwerk`**", "Bekomme ein Regelwerk vom Bot das du für den Server einsetzten kannst!",false)
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
.setColor("RANDOM")
const embed3 = new discord.MessageEmbed()
.setTitle('🙌__Fun__')
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=0&scope=bot%20applications.commands) ⬅️\nAuf die Website: [Website](https://website.theredend2000.repl.co/index.php) ⬅️\nSupport DC Server: [Server](https://discord.gg/g6GdhJzVGJ) ⬅️`)
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
.addField("**`timer`**", "Setzte einen Timer!",false)
.addField("**`search google/youtube/twitch`**", "Suche etwas über den Bot")
.addField("**`shiprate`**", "Bekomme die Liebesrate von einen User!",false)
.addField("**`happy`**", "Sei Fröhlich!",false)
.setColor("RANDOM")
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
const embed4 = new discord.MessageEmbed()
.setTitle('😆__Memes__')
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=0&scope=bot%20applications.commands) ⬅️\nAuf die Website: [Website](https://website.theredend2000.repl.co/index.php) ⬅️\nSupport DC Server: [Server](https://discord.gg/g6GdhJzVGJ) ⬅️`)
.addField("**`dememe`**", "Zeigt dir Deutsche Memes",false)
.addField("**`meme`**", "Zeigt dir Allgemeine Memes",false)
.addField("**`mcmeme`**", "Zeigt dir Minecraft Memes",false)
.addField("**`catmeme`**", "Zeigt dir Katzen Memes",false)
.addField("**`dogmeme`**", "Zeigt dir Hunde Memes",false)
.setColor("RANDOM")
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
const embed5 = new discord.MessageEmbed()
.setTitle('⚙️__Settings__')
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=0&scope=bot%20applications.commands) ⬅️\nAuf die Website: [Website](https://website.theredend2000.repl.co/index.php) ⬅️\nSupport DC Server: [Server](https://discord.gg/g6GdhJzVGJ) ⬅️`)
.addField("**`welcomehelp`**", "Bekomme die Befehle vom Welcome/Leave System",false)
.addField("**`rankhelp`**", "Erstelle die Economy System Ränge!",false)
.addField("**`ticketi`**", "Bekommst eine Nahricht zum einstellen des Ticketsystems",false)
.addField("**`globalchatinfo`**", "Bekomme Infos zum Globalchat.",false)
.addField("**`setprefix`**", "Bestimme einen neuen Prefix für den Server",false)
.setColor("RANDOM")
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
const embed6 = new discord.MessageEmbed()
.setTitle('🤖__Bot Info__') 
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=0&scope=bot%20applications.commands) ⬅️\nAuf die Website: [Website](https://website.theredend2000.repl.co/index.php) ⬅️\nSupport DC Server: [Server](https://discord.gg/g6GdhJzVGJ) ⬅️`)
.addField("**`prefix`**", "Bekomme den Prefix des Bots auf dem Server",false)
.addField("**`about`**", "Ein paar Infos über den Bot",false)
.addField("**`bugreport`**", "Sende einen Bug den du entdeckt hast ein",false)
.addField("**`idee`**", "Sende eine Idee ein die dir beim Bot noch fehlt",false)
.addField("**`vote`**", "Vote für den Bot",false)
.addField("**`ping`**", "Erfahre den Ping des Bots",false)
.addField("**`serverlist`**", "Zeigt dir eine Liste von den Servern auf denen der Bot ist!",false)
.setColor("RANDOM")
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
const embed7 = new discord.MessageEmbed()
.setTitle('💰__Economy__') 
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=0&scope=bot%20applications.commands) ⬅️\nAuf die Website: [Website](https://website.theredend2000.repl.co/index.php) ⬅️\nSupport DC Server: [Server](https://discord.gg/g6GdhJzVGJ) ⬅️`)
.addField("**`bal`**", "Siehe nach wie viele Coins du hast!",false)
.addField("**`flip`**", "Wirf eine Münze!",false)
.addField("**`shop`**", "Schaue dir die Ränge im Shop an!",false)
.addField("**`buy`**", "Kaufe dir einen Rang aus dem Shop!",false)
.addField("**`addcoins`(PREMIUM)**", "Füge einem User etwas Geld hinzu!",false)
.addField("**`removecoins`(PREMIUM)**", "Ziehe einem User etwas Geld ab!",false)
.addField("**`daily`**", "Hole dir deine Tägliche Belohnung ab!",false)
.addField("**`dep`**", "Lege Coins auf die Bank!",false)
.addField("**`with`**", "Hole Coins von der Bank!",false)
.setColor("RANDOM")
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
const embed8 = new discord.MessageEmbed()
.setTitle('🎶__Music__') 
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=0&scope=bot%20applications.commands) ⬅️\nSupport DC Server: [Server](https://discord.gg/g6GdhJzVGJ) ⬅️`)
.addField("**`play`**", "Lasse einen Song spielen!",false)
.addField("**`skip`**", "Skip den Song!",false)
.addField("**`stop`**", "Stoppe die Music!",false)
.addField("**`pause`**", "Lasse einen Song pausieren!",false)
.addField("**`resume`**", "Lasse einen Song weiterspielen!",false)
.addField("**`queue`**", "Schaue dir die Warteschlange an!",false)
.setColor("RANDOM")
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
const embed9 = new discord.MessageEmbed()
.setTitle('🆙__Level__') 
.setDescription(`Bot einladen: [Invite](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=0&scope=bot%20applications.commands) ⬅️\nAuf die Website: [Website](https://website.theredend2000.repl.co/index.php) ⬅️\nSupport DC Server: [Server](https://discord.gg/g6GdhJzVGJ) ⬅️`)
.addField("**`level`**", "Zeigt dir dein Level an!",false)
.addField("**`setlevelchannel`**", "Lege einen Levelchannel fest!",false)
.addField("**`resetlevelchannel`**", "Lege einen Levelchannel zurück!",false)
.addField("**`resetxp`**", "Resete die Xp von einem User!",false)
.addField("**`addxp`(PREMIUM)**", "Gebe einem User etwas Xp",false)
.addField("**`removexp`(PREMIUM)**", "Ziehe einem User ein paar Xp ab!",false)
.setColor("RANDOM")
.setFooter(`${server.name}`, `${server.logo}`)
.setTimestamp()
let option = new MessageMenuOption()
    .setLabel('Hilfe | Allgemein')
    .setDescription('Befehls Übersicht')
    .setEmoji('🖥️')
    .setValue('1')
    let option2 = new MessageMenuOption()
    .setLabel('Moderation')
    .setDescription('Moderations Befehle')
    .setEmoji('🧑‍⚖️')
    .setValue('2')
    let option3 = new MessageMenuOption()
    .setLabel('Fun')
    .setValue('3')
    .setDescription('Fun Befehle')
    .setEmoji('🙌')
    let option4 = new MessageMenuOption()
    .setLabel('Meme')
    .setValue('4')
    .setDescription('Meme Befehle')
    .setEmoji('😆')
    let option5 = new MessageMenuOption()
    .setLabel('Settings')
    .setValue('5')
    .setDescription('Settings für mehr Spaß')
    .setEmoji('⚙️')
        let option6 = new MessageMenuOption()
    .setLabel('Bot Info')
    .setValue('6')
    .setDescription('Infos über den Bot')
    .setEmoji('🤖')
        let option7 = new MessageMenuOption()
    .setLabel('Economy')
    .setValue('7')
    .setDescription('Befehle für die Economy')
    .setEmoji('💰')
        let option8 = new MessageMenuOption()
    .setLabel('Music')
    .setValue('8')
    .setDescription('Befehle für die Music')
    .setEmoji('🎶')
     /*let option9 = new MessageMenuOption()
    .setLabel('Level')
    .setValue('9')
    .setDescription('Befehle für das Levelsystem')
    .setEmoji('🆙')*/
     let option10 = new MessageMenuOption()
    .setLabel('Menu close')
    .setValue('10')
    .setDescription('Das Menü schließen')
    .setEmoji('❌')
    let select2 = new MessageMenu()
    .setID('menu')
    .setPlaceholder('Mehr Kategorien')
    .setMaxValues(1)
    .setMinValues(1)
    .addOptions(option, option2, option3, option4, option5, option6, option7, option8,  option10)
    message.channel.send(embed, select2).then(msg=>{
      const collector = new disbut.MenuCollector(msg,button=>1+1==2, {time:2147483647})

      collector.on('collect', button=>{
        if(button.values == '1') {
        msg.edit(embed)
      }
      if(button.values == '2') {
        msg.edit(embed2)
      }
      if(button.values == '3') {
        msg.edit(embed3)
      }
      if(button.values == '4') {
        msg.edit(embed4)
      }
      if(button.values == '5') {
        msg.edit(embed5)
      }
      if(button.values == '6') {
        msg.edit(embed6)
      }
      if(button.values == '7') {
        msg.edit(embed7)
      }
      if(button.values == '8') {
        msg.edit(embed8)
      }
      if(button.values == '10') {
        msg.delete()
      }
      button.reply.defer()
    })
    
    })
  }
}