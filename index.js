Discord = require("discord.js");
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION',Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.GUILD_MESSAGES] });
const client = new Discord.Client({ disableMentions: 'everyone' });
const fs = require("fs");
const coinfile = require("./coins.json");
const xpfile = require("./xp.json")
const { executionAsyncResource } = require('async_hooks');
const { YTSearcher } = require('ytsearcher');
const searcher = new YTSearcher({
    key: process.env.youtube_api,
    revealed: false,
});
const warnFile = require("./warns.json")
const serverstats = require("./servers.json");
const ereact = require("./ereact.json")
const ascii = require("ascii-art");
const weather = require('weather-js');
const ms = require('ms')
const cooldown = new Set();
const queue = new Map();
const languages = require('./lang.json')
const moment = require('moment')
const disbut =require("discord-buttons")(bot)
const got = require('got')
const ll = require("./lieblingslieder.json")
const emoji = require("emoji");
const ytSearch = require('yt-search');
const ytdl = require('ytdl-core');
const Duration = require('humanize-duration')
var cron = require('node-cron');
const slash = require("slash_commands.js")
const DisTube = require('distube');
const distube = new DisTube(bot, { searchSongs: true, emitNewSongOnly: true })
const { DiscordTogether } = require('discord-together');
bot.discordTogether = new DiscordTogether(client);
//Wenn bot ist online net kommt ms uninstall und wieder install
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}



const ranks = ["Coin Master",500,"Coin Master 2",2000,"Coin Master 3",3000,"Coin Master 4",4000,"Coin Master 5",5000,"Coin Suchti",100000, "list"];



bot.on("ready", () =>{
console.log("ACHTUNG!!! Bot ist gestartet!")
bot.user.setActivity(`ping for prefix to ${bot.guilds.cache.size} Servers`, { type: "PLAYING" }).catch(console.error)
})//WATCHING

 


bot.on("message", async (message) =>{

    if(!coinfile[message.author.id]){
        coinfile[message.author.id] = {
            coins: 1000, //bal
            bank: 0, //
        }
    }
    
    fs.writeFile("./coins.json", JSON.stringify(coinfile), err =>{
        if(err){
            console.log(err);
        }
    })


    if(!serverstats[message.guild.id]){
        serverstats[message.guild.id] = {
            prefix:"%",
            welcomechannel:"Keinen Festgelegt -> setwelcomechannel #channel",
            leavechannel:"nochannel",
            ticketchannel:"noticket",
            globalchat:"noID",
            levelchannel:"nolevelchannel",
            wrole:"norole",
            rank:"norank",
            premiums:"nop",
            levels:"on"
            
        }
    }

    fs.writeFile("./servers.json", JSON.stringify(serverstats), err =>{
        if(err){
            console.log(err);
        }
    })
        if(!ereact[emoji.id]){
        ereact[emoji.id] = {
          emojireact:"NoE"
            
        }
    }

    fs.writeFile("./ereact.json", JSON.stringify(ereact), err =>{
        if(err){
            console.log(err);
        }
    })

    if(!warnFile[message.author.id+message.guild.id]){
      warnFile[message.author.id+message.guild.id] = {
        warns:0,
        maxwarn:5
      }
    }

    fs.writeFile("./warns.json", JSON.stringify(warnFile),function(err){
      if(err) console.log(err)
    })
    

    let prefix = serverstats[message.guild.id].prefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
        /*if(!message.content.toLowerCase().startsWith(prefix)){
          let embed = new Discord.MessageEmbed()
          .setTitle("ERR")
          return message.channel.send(embed)
        }*/
        /*
         let premium = message.guild.id === serverstats[message.guild.id].premiums;
 let premiumembed = new Discord.MessageEmbed()
 .setTitle("❌Kein <a:ServerBoost:890954762231644240>Premium")
 .setDescription(`Der Server: **${message.guild.name}** hat kein Premium!\nWenn du die <a:ServerBoost:890954762231644240>Premium-Befehle für den Bot freischalten willst gehen auf den [Support Server](https://discord.gg/g6GdhJzVGJ), dort finden Regelmäsige Gewinnspiel statt wo du <a:ServerBoost:890954762231644240>Premium gewinnen kannst!\n**Viel Glück**`)
 .setColor("RED")
 .setFooter("❌Kein Premium")
 .setTimestamp()
 .setThumbnail(message.guild.iconURL({dynamic: true}))
    if(!premium || premium.id === "nop") return message.channel.send(premiumembed)
    */
        

if(message.content === `354`){
        let user = message.author
        message.channel.send("@everyone ")
        let embed = new Discord.MessageEmbed()
        .setTitle("Zahl erreicht!")
        .setColor("GREEN")
        .setDescription(`Die Zahl war **354**!\n<a:Gewonnen:877242761890381906>Gewonnen hat ${user}!\n Helzlichen Glückwunsch, hole dir dein Geschenk in <#831193424811655228> ab!<a:Gewonnen:877242761890381906>\n\nEvent vorbei wird aber weiter geben!`)
        .setTimestamp()
        message.channel.send(embed)
        }else
        if(message.content.includes('<@!826106313175203931>')) {
        if(!message.guild) return;

        let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }

         let embed2 = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({dynamic: true}))
        .setDescription(`Mein Prefix hier ist: **${serverstats[message.guild.id].prefix}**\nMache ${serverstats[message.guild.id].prefix}help oder änder ihn mit ${serverstats[message.guild.id].prefix}setprefix [neuer Prefix]`)
        .setColor("BLUE")
        .setTimestamp()

        message.channel.send(embed2)}else
        if(message.content.startsWith(`${prefix}search google`)){
           let suche = message.content.split(" ").slice(2).join("");
           if(!suche) return message.channel.send("Bitte gebe an was du Suchen willst!")
           let embed = new Discord.MessageEmbed()
           .setTitle("Google Suche")
           .setDescription("Du hast nach `"+suche+"` gesucht.\n Das habe ich gefunden:\n[Deine Suche](https://www.google.com/search?q="+suche+")")
           .setColor("YELLOW")
           .setTimestamp()
           message.channel.send(embed)
        }else
         if(message.content.startsWith(`${prefix}search youtube`)){
           let suche = message.content.split(" ").slice(2).join("");
           if(!suche) return message.channel.send("Bitte gebe an was du Suchen willst!")
           let embed = new Discord.MessageEmbed()
           .setTitle("Youtube Suche")
           .setDescription("Du hast nach `"+suche+"` gesucht.\n Das habe ich gefunden:\n[Deine Suche](https://www.youtube.com/results?search_query="+suche+")")
           .setColor("YELLOW")
           .setTimestamp()
           message.channel.send(embed)
        }else
        if(message.content.startsWith(`${prefix}search twitch`)){
           let suche = message.content.split(" ").slice(2).join("");
           if(!suche) return message.channel.send("Bitte gebe an was du Suchen willst!")
           let embed = new Discord.MessageEmbed()
           .setTitle("Twitch Suche")
           .setDescription("Du hast nach `"+suche+"` gesucht.\n Das habe ich gefunden:\n[Deine Suche](https://www.twitch.tv/search?term="+suche+")")
           .setColor("YELLOW")
           .setTimestamp()
           message.channel.send(embed)
        }else
        if(message.content === prefix+`time`){
          let embed = new Discord.MessageEmbed()
          .setDescription(`Uhrzeit angefordert von ${message.author}`)
          .setTimestamp()
          .setColor("RANDOM")
          message.channel.send(embed)
        }else

        if(message.content === prefix+`ping`){
             let embed = new Discord.MessageEmbed()
       
        .setColor("RANDOM")
        .setTimestamp()
        .setDescription(`<a:PINGGGG:868775480176807977>Der Ping zum Bot beträgt ${bot.ws.ping}ms!<a:PINGGGG:868775480176807977>`)


        message.channel.send(embed)}else

if(message.content === `${prefix}ebilder`){
        message.delete()
        let embed = new Discord.MessageEmbed()
        .setTitle("Enspannungs Bilder")
        .setColor("GREEN")
        .setTimestamp()
        .setDescription(`1. ${serverstats[message.guild.id].prefix}waterfall\n2. ${serverstats[message.guild.id].prefix}lake\n3. ${serverstats[message.guild.id].prefix}oasis\n4. ${serverstats[message.guild.id].prefix}starry sky\n5. ${serverstats[message.guild.id].prefix}sunset\n6. ${serverstats[message.guild.id].prefix}night`)
        message.channel.send(embed)} else
       //commands sachen
        if(message.content.startsWith(`${prefix}wetter`)){
          client.commands.get('weather').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}help`)){
          client.commands.get('help').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}welcomehelp`)){
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
          client.commands.get('welcomehelp').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}dememe`)){
          client.commands.get('dememe').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}mcmeme`)){
          client.commands.get('mcmeme').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}meme`)){
          client.commands.get('almeme').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}love`)){
          client.commands.get('love').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}avatar`)){
          client.commands.get('avatar').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}happy`)){
          client.commands.get('happy').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}night`)){
          client.commands.get('night').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}embed`)){
          client.commands.get('buttont').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}waterfall`)){
          client.commands.get('waterfall').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}lake`)){
          client.commands.get('lake').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}oasis`)){
          client.commands.get('oasis').execute(message, args);
        }else
         if(message.content.startsWith(`${prefix}sunset`)){
          client.commands.get('sunset').execute(message, args);
        }else
         if(message.content.startsWith(`${prefix}starry sky`)){
          client.commands.get('ss').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}clear`)){
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
          client.commands.get('clear').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}gg`)){
          client.commands.get('gg').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}globalchatinfo`)){
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
          client.commands.get('gci').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}regelwerk`)){
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
          client.commands.get('regelwerk').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}rankhelp`)){
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
          client.commands.get('rang').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}userinfo`)){
          client.commands.get('ui').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}kick`)){
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`KICK_MEMBERS\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(premissonembed);
          client.commands.get('kick').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}ban`)){
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`BAN_MEMBERS\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(premissonembed);
          client.commands.get('ban').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}iq`)){
          client.commands.get('iq').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}8ball`)){
          client.commands.get('8ball').execute(message, args);
        }else
         if(message.content.startsWith(`${prefix}vote`)){
          client.commands.get('vote').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}gay`)){
          client.commands.get('gay').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}shiprate`)){
          client.commands.get('sr').execute(message, args);
        }else
         if(message.content.startsWith(`${prefix}roll`)){
          client.commands.get('roll').execute(message, args);
        }else
         if(message.content.startsWith(`${prefix}coronatest`)){
          client.commands.get('ct').execute(message, args);
        }else
         if(message.content.startsWith(`${prefix}impfung`)){
          client.commands.get('impfung').execute(message, args);
        }else
         if(message.content.startsWith(`${prefix}laugh`)){
          client.commands.get('lach').execute(message, args);
        }else
         if(message.content.startsWith(`${prefix}beat`)){
          client.commands.get('beat').execute(message, args);
        }else
         if(message.content.startsWith(`${prefix}kill`)){
          client.commands.get('kill').execute(message, args);
        }else
         if(message.content.startsWith(`${prefix}highfive`)){
          client.commands.get('hf').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}say`)){
          client.commands.get('say').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}repeat`)){
          client.commands.get('repeat').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}shop`)){
          client.commands.get('shop').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}write`)){
          client.commands.get('ascii').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}catmeme`)){
          client.commands.get('cmeme').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}dogmeme`)){
          client.commands.get('dmeme').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}help mod`)){
          client.commands.get('modhelp').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}help fun`)){
          client.commands.get('funhelp').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}help meme`)){
          client.commands.get('meme').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}help settings`)){
          client.commands.get('settings').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}help binfo`)){
          client.commands.get('binfo').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}help eco`)){
          client.commands.get('eco').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}help music`)){
          client.commands.get('music').execute(message, args);
        }else
        if(message.content.startsWith(`${prefix}Abstimmung`)){
          client.commands.get('abstimmung').execute(message, args);
        }else
        if(message.content.startsWith(`testab`)){
          client.commands.get('testab').execute(message, args);
        }else
        
  

    if(message.content.startsWith(prefix+"invite")){
      //https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=8&scope=bot
      let embed = new Discord.MessageEmbed()
      .setTitle("Invite Community Bot")
      .setDescription(`__Invite Link für Community Bot:__\n\n**[Klick here](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=0&scope=bot%20applications.commands)\nOder über diesen Link:**\nhttps://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=0&scope=bot%20applications.commands\n\nFalls etwas nicht geht kannst du gerne dem [Support Server](https://discord.gg/g6GdhJzVGJ) beitreten, das Team hilft dir weiter!\nViel Spaß`)
      .setFooter("Invite für Community Bot")
      .setTimestamp()
      .setColor("GREEN")
      message.channel.send(embed)
    }
if(message.content.startsWith(prefix+"serverlist")){
  let guilds = bot.guilds.cache.map(guild => guild.name).join('\n');
let embed = new Discord.MessageEmbed()
.setTitle("Bot Server Liste")
.setDescription(guilds)
.setColor("GREEN")
message.channel.send(embed)
}else
if(message.content.startsWith(prefix+"addxdp")){
 message.delete()
 let premium = message.guild.id === serverstats[message.guild.id].premiums;
  let premiumembed = new Discord.MessageEmbed()
 .setTitle("❌Kein <a:ServerBoost:890954762231644240>Premium")
 .setDescription(`Der Server: **${message.guild.name}** hat kein Premium!\nWenn du die <a:ServerBoost:890954762231644240>Premium-Befehle für den Bot freischalten willst gehen auf den [Support Server](https://discord.gg/g6GdhJzVGJ), dort finden Regelmäsige Gewinnspiel statt wo du <a:ServerBoost:890954762231644240>Premium gewinnen kannst!\n**Viel Glück**`)
 .setColor("RED")
 .setFooter("❌Kein Premium")
 .setTimestamp()
 .setThumbnail(message.guild.iconURL({dynamic: true}))
    if(!premium || premium.id === "nop") return message.channel.send(premiumembed)
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
let user = message.mentions.users.first() || message.author
if(!user) return message.channel.send(`${user} bitte mache so: `+"`addxp <user> <Xp>`")
        let bounty = message.content.split(" ").slice(2).join("");


        bounty = Number(bounty)

        if(isNaN(bounty)) return message.reply("Du hast keine Zahl für XP angegeben. Du hast Buchstaben angegeben.")

        if(!bounty) return message.channel.send(`${user} bitte mache so: `+"`addxp <user> <Xp>`")

        bounty = bounty * 1

                xpfile[user.id].xp = Number(xpfile[user.id].xp)
                let embed = new Discord.MessageEmbed()
                .setTitle("XP hinzugefügt")
                .setDescription(`Ich habe ${user} **__${bounty}__**  XP hinzugefügt!`)
                .addField(`Hinzugefügte XP:`, "__`"+bounty+"`__", true)
                .addField(`Seine XP jetzt:`, "__`"+xpfile[user.id].xp+"`__", true)
                .setTimestamp()
                .setFooter("XP hinzugefügt")
                .setColor("GREEN")
                .setThumbnail(user.avatarURL({dynamic:true}))
                message.channel.send(embed)
 }else
 
 if(message.content.startsWith(prefix+"timer")){
     let time = args[1]
  if(!time) return message.channel.send("Wie viele Minuten/Stunden soll der Timer dauern?")
  if(ms(time) > ms("1d")) return message.channel.send("Du kannst den Timer nicht höher als 1 Tag setzten!")
  
  let reason = args.slice(2).join(' ')
  if(!reason) return message.reply("Bitte gebe eine Erinnerung an!")
  
  let embed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.tag} Alarm`,message.author.displayAvatarURL({dynamic: true}))
  .setColor("RANDOM")
  .setDescription(`Zeit: \`${time}\`\nErinnerung: \`${reason}\``)
  .setTimestamp()
  message.channel.send(embed)
  
  setTimeout(async () => {
    let embed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.tag} Der Wecker klingelt`,message.author.displayAvatarURL({dynamic: true}))
  .setColor("RANDOM")
  .setDescription(`Zeit: \`${time}\`\nErinnerung: \`${reason}\`\nAlarm gesetzt auf: \`${message.guild.name}\``)
  .setTimestamp()
  message.author.send(embed)
  }, ms(time))
 }else
 if(message.content.startsWith(prefix+"nuke")){
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
  
  let pos = message.channel.position
  let embed = new Discord.MessageEmbed()
  .setTitle("Nuke")
  .setDescription(`Dieser Kanal wurde genuked.\nNuke von: \`${message.author.username}\``)
  .setImage("https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif")
  .setThumbnail("https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif")
  .setFooter(`Genuked von: ${message.author.username}`)
  .setTimestamp()
  
  message.channel.clone().then(c => {
    message.channel.delete()
    c.setPosition(pos)
    /*c.overwritePermissions([
                {
                    id:message.guild.id,
                    deny:["SEND_MESSAGES"]
                }*/
    c.send(embed)
 })
 }else
 

 if(message.content.startsWith(prefix+"resetdddxp")){
 message.delete()
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
let user = message.mentions.users.first() || message.author
if(!user) return message.channel.send(`${user} bitte mache so: `+"`resetxp <user> <Xp>`")

                let embed = new Discord.MessageEmbed()
                .setTitle("XP Resetet")
                .setDescription(`Ich habe ${user} xp zurückgesetzt`)
                .setTimestamp()
                .setFooter("XP resetet")
                .setColor("GREEN")
                .setThumbnail(user.avatarURL({dynamic:true}))
                message.channel.send(embed)
        xpfile[user.id] = {
            xp: 0,
            level: 0,
            reqxp: 100
        }

        fs.writeFile("./xp.json",JSON.stringify(xpfile),function(err){
            if(err) console.log(err)
        })
    }else
 
 if(message.content.startsWith(prefix+"removexp3fff")){
 message.delete()
 let premium = message.guild.id === serverstats[message.guild.id].premiums;
 let premiumembed = new Discord.MessageEmbed()
 .setTitle("❌Kein <a:ServerBoost:890954762231644240>Premium")
 .setDescription(`Der Server: **${message.guild.name}** hat kein Premium!\nWenn du die <a:ServerBoost:890954762231644240>Premium-Befehle für den Bot freischalten willst gehen auf den [Support Server](https://discord.gg/g6GdhJzVGJ), dort finden Regelmäsige Gewinnspiel statt wo du <a:ServerBoost:890954762231644240>Premium gewinnen kannst!\n**Viel Glück**`)
 .setColor("RED")
 .setFooter("❌Kein Premium")
 .setTimestamp()
 .setThumbnail(message.guild.iconURL({dynamic: true}))
    if(!premium || premium.id === "nop") return message.channel.send(premiumembed)
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
let user = message.mentions.users.first() || message.author
if(!user) return message.channel.send(`${user} bitte mache so: `+"`removexp <user> <Xp>`")
        let bounty = message.content.split(" ").slice(2).join("");


        bounty = Number(bounty)

        if(isNaN(bounty)) return message.reply("Du hast keine Zahl für Xp angegeben. Du hast Buchstaben angegeben.")

        if(!bounty) return message.channel.send(`${user} bitte mache so: `+"`removexp <user> <Xp>`")

        bounty = bounty * 1

                xpfile[user.id].xp -= bounty;

                xpfile[user.id].xp = Number(xpfile[user.id].xp)


                let embed = new Discord.MessageEmbed()
                .setTitle("Xp abgezogen")
                .setDescription(`Ich habe ${user} **__${bounty}__**  Xp abgezogen!`)
                .addField(`Abgezogene Xp:`, "__`"+bounty+"`__", true)
                .addField(`Seine Xp jetzt:`, "__`"+xpfile[user.id].xp+"`__", true)
                .setTimestamp()
                .setFooter("Xp abgezogen!")
                .setColor("GREEN")
                .setThumbnail(user.avatarURL({dynamic:true}))
                message.channel.send(embed)
 }else
        if(message.content.startsWith(prefix+"setlevelchanddnel")){
            message.delete()
        if(!serverstats[message.guild.id].levelchannel){
            serverstats[message.guild.id].levelchannel = "nolevelchannel"
        }

        let newchannel = message.mentions.channels.first();

        if(!newchannel) return message.reply("Du hast keinen Kanal angegeben!").then(msg=>msg.delete({timeout:"5000"}));
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
    
        serverstats[message.guild.id].levelchannel = newchannel.name;
        let embed = new Discord.MessageEmbed()
        .setTitle("Levelchannel festgelegt!")
        .setDescription(`Der **neue Levelchannel** ist nun <#${newchannel.id}>\nDu kannst ihn mit **${serverstats[message.guild.id].prefix}resetlevelchannel** zurücksetzten!`)
        .setColor("BLUE")
        .setFooter(`${serverstats[message.guild.id].prefix}help xp`)
        .setTimestamp()

        message.channel.send(embed)

        fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err){
            if(err) console.log(err);
        })
    }else
    if(message.content.startsWith(prefix+"offleveldd")){
            message.delete()
        if(!serverstats[message.guild.id].levels){
            serverstats[message.guild.id].levels = "on"
        }
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
        serverstats[message.guild.id].levels = "off";
        let embed = new Discord.MessageEmbed()
        .setTitle("Levelsystem aktiv")
        .setDescription(`Das Levelsystem ist nun aktive\nAlle weiteren Befehle findest du im Help Menu unter XP!`)
        .setColor("BLUE")
        .setFooter("Auf "+message.guild.name)
        .setTimestamp()

        message.channel.send(embed)

        fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err){
            if(err) console.log(err);
        })
    }else
    if(message.content.startsWith(prefix+"onleveldd")){
            message.delete()
        if(!serverstats[message.guild.id].levels){
            serverstats[message.guild.id].levels = "off"
        }
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
                  let embed = new Discord.MessageEmbed()
        .setTitle("Levelsystem aktiv")
        .setDescription(`Das Levelsystem ist nun aktive\nAlle weiteren Befehle findest du im Help Menu unter XP!`)
        .setColor("BLUE")
        .setFooter("Auf "+message.guild.name)
        .setTimestamp()

        message.channel.send(embed)
        serverstats[message.guild.id].levels = "on";

        fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err){
            if(err) console.log(err);
        })
    }else
    if(message.content.startsWith(prefix+"resetlevelchannel")){
            message.delete()
        if(!serverstats[message.guild.id].levelchannel){
            serverstats[message.guild.id].levelchannel = "nolevelchannel"
        }
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
    
        serverstats[message.guild.id].levelchannel = "nolevelchannel";
        let embed = new Discord.MessageEmbed()
        .setTitle("Levelchannel zurückgesetzt!")
        .setDescription(`Der Levelchannel wurde **zurückgesetzt**!\nDu kannst ihn mit **${serverstats[message.guild.id].prefix}setlevelchannel #channel** festlegen!`)
        .setColor("BLUE")
        .setFooter(`${serverstats[message.guild.id].prefix}help xp`)
        .setTimestamp()

        message.channel.send(embed)

        fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err){
            if(err) console.log(err);
        })
    }else
    
    if(message.content.startsWith(prefix+"levelddd")){
      message.delete()
        let user = message.mentions.users.first() || message.author

        if(user.bot) return message.reply("Bots haben kein XP!")

        const embed = new Discord.MessageEmbed()
        .setTitle(`Level von ${user.tag}`)
        .setColor("GREEN")
        .addField("Level: ",xpfile[user.id].level)
        .addField("XP: ", xpfile[user.id].xp+"/"+xpfile[user.id].reqxp)
        .addField("Xp bis zum nächsten Level: ",xpfile[user.id].reqxp)
        message.channel.send(embed)
    }else
//globalchat
 if(message.content.startsWith(prefix+"setglobalchat")){
   message.delete()
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
   let channel = message.mentions.channels.first();
   if(!channel) return message.channel.send("Kein Channel")
   if(!serverstats[message.guild.id].globalchat){
     serverstats[message.guild.id].globalchat = "noID"
   }
   serverstats[message.guild.id].globalchat = channel.id
   message.channel.send(`Der Globalchat ist nun <#${channel.id}>`)
 }else

  if(message.content.startsWith(prefix+"resetglobalchat")){
   message.delete()
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
   if(!serverstats[message.guild.id].globalchat){
     serverstats[message.guild.id].globalchat = "noID"
   }
   serverstats[message.guild.id].globalchat = "noID"
   message.channel.send(`Der Globalchat wurde zurückgesetzt`)
 }else

 if(message.channel.id === serverstats[message.guild.id].globalchat && !message.content.startsWith(prefix) && !message.author.bot){
   bot.guilds.cache.forEach(guild=>{
     if(guild.id !== message.guild.id){
       if(serverstats[message.guild.id].globalchat){
         if(serverstats[message.guild.id].globalchat != "noID"){
           if(guild.channels.cache.get(serverstats[message.guild.id].globalchat)){
             let embed = new Discord.MessageEmbed()
             .setTitle("GLOBALCHAT")
             .setAuthor(message.author.tag)
             .setColor("RANDOM")
             .setDescription(message.content)
             .setFooter("Server: "+message.guild.name, message.guild.iconURL({dynamic:true}))
             .setThumbnail(message.author.avatarURL({dynamic:true}))
             .setTimestamp()
             guild.channels.cache.find(ch=>ch.id === serverstats[message.guild.id].globalchat).send(embed);
           }
         }
       }
     }
   })
 }else


        /*module.exports = {
  name: 'ping',
  description: 'ping command',
  execute(message, args){
    const discord = require('discord.js')
  }
}*/

 /*if(message.content.startsWith(prefix+"level")){
 message.delete()
 const Canvas = require("discord-canvas")
 let user = message.mentions.users.first() || message.author
if(user.bot) return message.reply("Bots haben kein XP!")
const image = await new Canvas.RankCard()
    .setXP("current", xpfile[user.id].reqxp)
    .setXP("has", xpfile[user.id].xp)
    .setLevel(xpfile[user.id].level)
    .setRank(2)
    .setRankName("Levler")
    .setReputation(xpfile[user.id].reqxp)
    .setUsername(user.tag)
    .setBackground("http://images.unsplash.com/photo-1522865080725-2a9ea1fcb94e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max")
    .toAttachment();
 
const attachment = new Discord.MessageAttachment(image.toBuffer(), "rank-card.png");
 
message.channel.send(attachment)}*/
//eco game

if(message.content.startsWith(prefix+"ratenumber")){
 message.delete()
 let coins = message.content.split(" ").slice(2).join("");
 if(!coins) return message.channel.send("Bitte schreibe so: `ratenumber <number> <coins>`")
if(coinfile[message.author.id].coins < coins) return message.reply("Du hast zu wenig Coins!");

 let number = message.content.split(" ").slice(1).join("");
 if(!number) return message.channel.send("Bitte gebe eine Nummer von 1-10 an!")
 if(number >= 11) return message.channel.send("Deine Zahl lag über 10")
 
        coinfile[message.author.id].coins -= coins;

        coinfile[message.author.id].coins = Number(coinfile[message.author.id].coins)

 let zahl = Math.floor(Math.random() * 10) + 1;//es werden zu viele coins abgezogen
 if(number == zahl) return message.channel.send("NO")
 let embed = new Discord.MessageEmbed()
 .setTitle("Falsch")
 .setDescription("Deine Zahl war nicht die gleiche wie die des Bots!")
 .setAuthor(`${message.author.tag}`)
 .addField("Deine Zahl:","**__`"+number+"`__**", true)
 .addField("Zahl des Bots: ","**__`"+zahl+"`__**",true)
 .setThumbnail(message.author.avatarURL({dynamic: true}))
 .setFooter("Falsch")
message.channel.send(embed)
 //**${numbers[Math.floor(Math.random() * numbers.length)]}**
}else
if(message.content.startsWith(prefix+"addcoins")){
 message.delete()
 let premium = message.guild.id === serverstats[message.guild.id].premiums;
  let premiumembed = new Discord.MessageEmbed()
 .setTitle("❌Kein <a:ServerBoost:890954762231644240>Premium")
 .setDescription(`Der Server: **${message.guild.name}** hat kein Premium!\nWenn du die <a:ServerBoost:890954762231644240>Premium-Befehle für den Bot freischalten willst gehen auf den [Support Server](https://discord.gg/g6GdhJzVGJ), dort finden Regelmäsige Gewinnspiel statt wo du <a:ServerBoost:890954762231644240>Premium gewinnen kannst!\n**Viel Glück**`)
 .setColor("RED")
 .setFooter("❌Kein Premium")
 .setTimestamp()
 .setThumbnail(message.guild.iconURL({dynamic: true}))
    if(!premium || premium.id === "nop") return message.channel.send(premiumembed)
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
let user = message.mentions.users.first() || message.author
if(!user) return message.channel.send(`${user} bitte mache so: `+"`addcoins <user> <Coins>`")
        let bounty = message.content.split(" ").slice(2).join("");


        bounty = Number(bounty)

        if(isNaN(bounty)) return message.reply("Du hast keine Zahl für Coins angegeben. Du hast Buchstaben angegeben.")

        if(!bounty) return message.channel.send(`${user} bitte mache so: `+"`addcoins <user> <Coins>`")

        bounty = bounty * 1

                coinfile[user.id].coins += bounty;

                
                let embed = new Discord.MessageEmbed()
                .setTitle("Coins hinzugefügt")
                .setDescription(`Ich habe ${user} **__${bounty}__**  Coins hinzugefügt!`)
                .addField(`Hinzugefügte Coins:`, "__`"+bounty+"`__", true)
                .addField(`Sein Kontostand jetzt:`, "__`"+coinfile[user.id].coins+"`__", true)
                .setTimestamp()
                .setFooter("Coins hinzugefügt")
                .setColor("GREEN")
                .setThumbnail(user.avatarURL({dynamic:true}))
                message.channel.send(embed)
 }else

 if(message.content.startsWith(prefix+"removecoins")){
 message.delete()
 let premium = message.guild.id === serverstats[message.guild.id].premiums;
  let premiumembed = new Discord.MessageEmbed()
 .setTitle("❌Kein <a:ServerBoost:890954762231644240>Premium")
 .setDescription(`Der Server: **${message.guild.name}** hat kein Premium!\nWenn du die <a:ServerBoost:890954762231644240>Premium-Befehle für den Bot freischalten willst gehen auf den [Support Server](https://discord.gg/g6GdhJzVGJ), dort finden Regelmäsige Gewinnspiel statt wo du <a:ServerBoost:890954762231644240>Premium gewinnen kannst!\n**Viel Glück**`)
 .setColor("RED")
 .setFooter("❌Kein Premium")
 .setTimestamp()
 .setThumbnail(message.guild.iconURL({dynamic: true}))
    if(!premium || premium.id === "nop") return message.channel.send(premiumembed)
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
let user = message.mentions.users.first() || message.author
if(!user) return message.channel.send(`${user} bitte mache so: `+"`removecoins <user> <Coins>`")
        let bounty = message.content.split(" ").slice(2).join("");


        bounty = Number(bounty)

        if(isNaN(bounty)) return message.reply("Du hast keine Zahl für Coins angegeben. Du hast Buchstaben angegeben.")

        if(!bounty) return message.channel.send(`${user} bitte mache so: `+"`removecoins <user> <Coins>`")

        bounty = bounty * 1

                coinfile[user.id].coins -= bounty;

                coinfile[user.id].coins = Number(coinfile[user.id].coins)


                let embed = new Discord.MessageEmbed()
                .setTitle("Coins abgezogen")
                .setDescription(`Ich habe ${user} **__${bounty}__**  Coins abgezogen!`)
                .addField(`Abgezogene Coins:`, "__`"+bounty+"`__", true)
                .addField(`Sein Kontostand jetzt:`, "__`"+coinfile[user.id].coins+"`__", true)
                .setTimestamp()
                .setFooter("Coins abgezogen!")
                .setColor("GREEN")
                .setThumbnail(user.avatarURL({dynamic:true}))
                message.channel.send(embed)
 }else
 if(message.content.startsWith(prefix+"addpremium")){
   message.delete()
           if(!serverstats[message.guild.id].premiums){
            serverstats[message.guild.id].premiums = "nop"
        }
   let key1 = "f34gg3dk2mm5"
   let key2 = "rggdw4mn5hvs"
   let key3 = "r884n5nzq2tv"
  let key = message.content.split(" ").slice(1).join(" ");
  if(!key1) return
  let embed = new Discord.MessageEmbed()
  .setTitle("<a:lulgewinnspiel:880070211804471377>Hurra<a:lulgewinnspiel:880070211804471377>")
  .setDescription(`Der Server: __**${message.guild.name}**__ hat nun **Premium**.\nIch wünsche viel Spaß damit!`)
  .setFooter("Auf: "+message.guild.name)
  .setTimestamp()
  .setColor("GOLD")
  if(key == key1 ||key == key2 || key == key3) message.channel.send(embed)
  serverstats[message.guild.id].premiums = message.guild.id
  fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err){
            if(err) console.log(err);
        })
  
 }
 if(message.content.startsWith(prefix+"unmute")){
        message.delete()
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
                let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let user2 = message.author.username
                        let user3 = message.author
            if(!user) return message.reply("bitte gebe einen User an!")
            let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
            await user.roles.remove(role)
let embed = new Discord.MessageEmbed()
.setTitle("Entmute")
.setDescription(`${user} du wurdest entmuted!`)
.setColor("GREEN")
.setFooter(`Entmuted von ${user2}`)
.setTimestamp()
            message.channel.send(embed)
  
 


   let embede = new Discord.MessageEmbed()
            .setTitle("**Du wurdest entmuted**")
            .setColor("GREEN")
            .setThumbnail(server.logo)
            .setDescription(`**Hallo ${user}!**\nDu wurdest gerade auf dem Server **${server.name}** entmuted! Mehr Details hier:\n\n🎛️**Server:**\n${server.name}\n\n👮‍♂️**Moderator:**\n${user3}`)
            .setFooter(`Entmuted von ${user2}`)
            .setTimestamp()
            user.send(embede)

    }else
if(message.content.startsWith(prefix+"mute")){
        message.delete()
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
                let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }
                let grund = message.content.split(" ").slice(2).join(" ");
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let user2 = message.author.username
                        let user3 = message.author
            if(!user) return message.reply("bitte gebe einen User an!")
            let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
            if(!role){
              try {
            let muterole = await message.guild.roles.create({
              data: {
                name: "muted",
                permissions: []
              }
            })
            message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
              await channel.createOverwrite(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
              })
            })
            user.roles.add(muterole)
            message.channel.send(`Ich habe die Rolle ${muterole} erstellt!`)
              } catch(error){
              console.log(error)
              }
            }
            let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
            await user.roles.add(role2)
            if(!grund) grund="Nicht genannt"
let embed = new Discord.MessageEmbed()
.setTitle("Mute")
.setDescription(`${user} du wurdest gemuted!`)
.setColor("RED")
.setFooter(`Gemuted von ${user2}`)
.setTimestamp()
message.channel.send(embed)


   let embede = new Discord.MessageEmbed()
            .setTitle("**Du wurdest gemuted**")
            .setColor("RED")
            .setThumbnail(server.logo)
            .setDescription(`**Hallo ${user}!**\nDu wurdest gerade auf dem Server **${server.name}** gemuted! Mehr Details hier:\n\n🎛️**Server:**\n${server.name}\n\n👮‍♂️**Moderator:**\n${user3}\n\n📰**Grund:**\n${grund}`)
            .setFooter(`Gemuted von ${user2}`)
            .setTimestamp()
            user.send(embede)

    }else
    if(message.content.startsWith(prefix+"timemute")){
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
        let Member = message.mentions.members.first()
        let time = message.content.split(" ").slice(2).join(" ");
        if(!Member) return message.channel.send('Ich konnte keinen User finden!')
        if(!time) return message.channel.send('Bitte gebe eine Zeit an!')
        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'timedmuted')
        if(!role) {
            try {
              

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'timedmuted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send("Ich konnte keine mute rolle finden deshalt habe ich eine erstellt!")
              
            } catch (error) {
                console.log(error)
            }
        };
      
        if(Member.roles.cache.has(role.id)) return message.channel.send(`${Member} Der User ist bereits gemuted`)
        await Member.roles.add(role)
        message.channel.send(`${Member} ist nun gemuted!`)

        setTimeout(async () => {
            await Member.roles.remove(role)
            message.channel.send(`${Member} ist nun nicht mehr gemuted!`)
        }, ms(time))
    }

     if(message.content.startsWith(prefix+"vunmute")){
        message.delete()
        let premium = message.guild.id === serverstats[message.guild.id].premiums;
 let premiumembed = new Discord.MessageEmbed()
 .setTitle("❌Kein <a:ServerBoost:890954762231644240>Premium")
 .setDescription(`Der Server: **${message.guild.name}** hat kein Premium!\nWenn du die <a:ServerBoost:890954762231644240>Premium-Befehle für den Bot freischalten willst gehen auf den [Support Server](https://discord.gg/g6GdhJzVGJ), dort finden Regelmäsige Gewinnspiel statt wo du <a:ServerBoost:890954762231644240>Premium gewinnen kannst!\n**Viel Glück**`)
 .setColor("RED")
 .setFooter("❌Kein Premium")
 .setTimestamp()
 .setThumbnail(message.guild.iconURL({dynamic: true}))
    if(!premium || premium.id === "nop") return message.channel.send(premiumembed)
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
                let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let user2 = message.author.username
                        let user3 = message.author
            if(!user) return message.reply("bitte gebe einen User an!")
            let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'vmuted')
            await user.roles.remove(role)
let embed = new Discord.MessageEmbed()
.setTitle("Voiceentmute")
.setDescription(`${user} du wurdest voiceentmuted!`)
.setColor("GREEN")
.setFooter(`voiceentmuted von ${user2}`)
.setTimestamp()
            message.channel.send(embed)
  
 


   let embede = new Discord.MessageEmbed()
            .setTitle("**Du wurdest voiceentmuted**")
            .setColor("GREEN")
            .setThumbnail(server.logo)
            .setDescription(`**Hallo ${user}!**\nDu wurdest gerade auf dem Server **${server.name}** voiceentmuted! Mehr Details hier:\n\n🎛️**Server:**\n${server.name}\n\n👮‍♂️**Moderator:**\n${user3}`)
            .setFooter(`Voiceentmuted von ${user2}`)
            .setTimestamp()
            user.send(embede)

    }else
if(message.content.startsWith(prefix+"vmute")){
        message.delete()
          let premium = message.guild.id === serverstats[message.guild.id].premiums;
 let premiumembed = new Discord.MessageEmbed()
 .setTitle("❌Kein <a:ServerBoost:890954762231644240>Premium")
 .setDescription(`Der Server: **${message.guild.name}** hat kein Premium!\nWenn du die <a:ServerBoost:890954762231644240>Premium-Befehle für den Bot freischalten willst gehen auf den [Support Server](https://discord.gg/g6GdhJzVGJ), dort finden Regelmäsige Gewinnspiel statt wo du <a:ServerBoost:890954762231644240>Premium gewinnen kannst!\n**Viel Glück**`)
 .setColor("RED")
 .setFooter("❌Kein Premium")
 .setTimestamp()
 .setThumbnail(message.guild.iconURL({dynamic: true}))
    if(!premium || premium.id === "nop") return message.channel.send(premiumembed)
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
                let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }
                let grund = message.content.split(" ").slice(2).join(" ");
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let user2 = message.author.username
                        let user3 = message.author
            if(!user) return message.reply("bitte gebe einen User an!")
            let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'vmuted')
            if(!role){
              try {
            let muterole = await message.guild.roles.create({
              data: {
                name: "vmuted",
                permissions: []
              }
            })
            message.guild.channels.cache.filter(c => c.type === 'voice').forEach(async (channel, id) => {
              await channel.createOverwrite(muterole, {
                CONNECT: false,
                SPEAK: false
              })
            })
            user.roles.add(muterole)
            message.channel.send(`Ich habe die Rolle ${muterole} erstellt!`)
              } catch(error){
              console.log(error)
              }
            }
            let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'vmuted')
            await user.roles.add(role2)
            if(!grund) grund="Nicht genannt"
let embed = new Discord.MessageEmbed()
.setTitle("Voicemute")
.setDescription(`${user} du wurdest gevoicemuted!`)
.setColor("RED")
.setFooter(`Gevoicemuted von ${user2}`)
.setTimestamp()
            message.channel.send(embed)
  
 


   let embede = new Discord.MessageEmbed()
            .setTitle("**Du wurdest gevoicemuted**")
            .setColor("RED")
            .setThumbnail(server.logo)
            .setDescription(`**Hallo ${user}!**\nDu wurdest gerade auf dem Server **${server.name}** gevoicemuted! Mehr Details hier:\n\n🎛️**Server:**\n${server.name}\n\n👮‍♂️**Moderator:**\n${user3}\n\n📰**Grund:**\n${grund}`)
            .setFooter(`Gevoicemuted von ${user2}`)
            .setTimestamp()
            user.send(embede)

    }else
    if(message.content.startsWith(prefix+"serversettings")){
      let embed = new Discord.MessageEmbed()
      .setTitle("Serversettings auf "+message.guild.name)
      .addField("Welcomechannel:", serverstats[message.guild.id].welcomechannel || `**Kein Welcomechannel** -> ${serverstats[message.guild.id].welcomechannel}setwelcomechannel #channel`)
      message.channel.send(embed)
    }
    
    
/*if(message.content.startsWith(`${prefix}spam`)){
  message.delete()
  let spam =  message.content.split(" ").slice(1).join(" ");
  if(!spam) return setInterval(function(){bot.channels.cache.get('882640689849073735').send("<@655537768654438412> Das ist ein Spam von Fabi")}, 1000)
  setInterval(function(){message.channel.send(text);}, 100)
}*/
if(message.content.startsWith(`${prefix}uptime`)){
     let days = Math.floor(bot.uptime / 86400000 );
    let hours = Math.floor(bot.uptime / 3600000 ) % 24;
    let minutes = Math.floor(bot.uptime / 60000) % 60;
    let seconds = Math.floor(bot.uptime / 1000) % 60;
    
    let upembed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle(`My Uptime is **${days}d ${hours}h ${minutes}m ${seconds}s**`)
    
    message.channel.send(upembed)
    }else



if(message.content.startsWith(`${prefix}about`)){
      let d = Math.floor(bot.uptime / 86400000 );
    let h = Math.floor(bot.uptime / 3600000 ) % 24;
    let m = Math.floor(bot.uptime / 60000) % 60;
    let s = Math.floor(bot.uptime / 1000) % 60;
    let embed = new Discord.MessageEmbed()
    .setTitle("🤖Bot Info")
    .addField("<:dev:880831420359118919>Developer:", "**`TheRedEnd2000#9641`**", true)
    .addField("📁Server:", "**`"+bot.guilds.cache.size+"`**", true)
    .addField(":boy: User gerade:", "**`"+bot.users.cache.size+"`**", true)
    .addField("<:js:880834852541313115>JavaScript:", "**`discord.js | 12.5.3`**", true)
    .addField(":grey_exclamation: Prefix:", "**`"+serverstats[message.guild.id].prefix+"`**", true)
    .addField(":gear: Alle Commands:", "**`65`**", true)
    .addField("<:version:880885559873126430> Version", "**`3.1.0`**", true)
    .addField("Online seit:", "**`"+d+"d "+h+"h "+m+"m "+s+"s "+"`**", true)
    message.channel.send(embed)}else




 //pivate nahricht message.author.send("eine Nachricht")


    if(message.content.startsWith(`${prefix}flip`)){
        message.delete()

        if(!coinfile[message.author.id]){
            coinfile[message.author.id] = {
                coins: 1000
            }
        }

        let bounty = message.content.split(" ").slice(1, 2).join("");

        let val = message.content.split(" ").slice(2, 3).join("");

        bounty = Number(bounty)

        if(isNaN(bounty)) return message.reply("Du hast keine Zahl für Coins angegeben. Du hast **"+ bounty+"** angegeben.")

        if(!bounty) return message.reply("Du hast keine Coins angegeben.");

        if(!val) return message.reply("Du hast kein Kopf oder zahl angegeben.");

        if(coinfile[message.author.id].coins < bounty) return message.reply("Du hast zu wenig Coins!");

        coinfile[message.author.id].coins -= bounty;

        coinfile[message.author.id].coins = Number(coinfile[message.author.id].coins)

        let chance = Math.floor(Math.random() * 2);

        if(chance == 0){
            if(val.toLowerCase() == "kopf"){
                message.reply("Und es ist... **Kopf**! Dein Einsatz verdoppelt sich.");

                bounty = bounty *2

                coinfile[message.author.id].coins += bounty;

                coinfile[message.author.id].coins = Number(coinfile[message.author.id].coins)

            }else{

                if(val.toLowerCase() == "zahl"){
                    message.reply("Und es ist... **Kopf**! Du hast verloren.")
                }else{
                    coinfile[message.author.id].coins += bounty

                    coinfile[message.author.id].coins = Number(coinfile[message.author.id].coins)
                    message.reply("Du hast **Kopf** oder **Zahl** falsch geschrieben oder an die falsche Stelle gesetzt.")
                }

            }
        }else{

            if(val.toLowerCase() == "zahl"){
                message.reply("Und es ist... **Zahl**! Dein Einsatz verdoppelt sich.");

                bounty = bounty *2

                coinfile[message.author.id].coins += bounty;

                coinfile[message.author.id].coins = Number(coinfile[message.author.id].coins)

            }else{

                if(val.toLowerCase() == "kopf"){
                    message.reply("Und es ist... **Zahl**! Du hast verloren.")
                }else{
                    coinfile[message.author.id].coins += bounty

                    coinfile[message.author.id].coins = Number(coinfile[message.author.id].coins)

                    message.reply("Du hast **Kopf** oder **Zahl** falsch geschrieben oder an die falsche Stelle gesetzt.")

                   
                }

            }
            
        }

        fs.writeFile("./coins.json", JSON.stringify(coinfile), err =>{
            if(err){
                console.log(err);
            }
            
        })

       
    }else

    
  if(message.content == prefix+'daily'){
     let daily = Math.floor(Math.random() * 200) + 100;
     let user = message.author
     if(cooldown.has(message.author.id)){

       message.channel.send(`${user} bitte warte noch bis du deine Tägliche belohnung wieder abholen kannst! Die gesammte wartezeit beträgt: 24h`)
     }else{
     let embed2 = new Discord.MessageEmbed()
      .setTitle("Tägliche Belohnung!")
      .setDescription(`${user}, dein Täglicher Reward beträgt:**__${daily}__**`)
    .setColor("GOLD")
    .setTimestamp()
    message.channel.send(embed2)
    coinfile[message.author.id].coins += daily
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id)
    }, 86400000)
     }


  }else
        if(message.content.startsWith(`${prefix}serverinfo`)){
        let roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        let members = message.guild.members.cache;
        let channels = message.guild.channels.cache;
        let emojis = message.guild.emojis.cache;

        let embed = new Discord.MessageEmbed()
        .setDescription(`**Serverinfo auf __${message.guild.name}__**`)
        .setColor("RANDOM")
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .addField('Allgemein', [
          `**> <a:Pfeil:865239783743291403> Name:** ${message.guild.name}`,
          `**> :id: ID:** ${message.guild.id}`,
          `**> <a:Owner:890959046075637850> Owner:** ${message.guild.owner.user} (${message.guild.ownerID})`,
          `**> <:Region:890958661273415710> Region:** ${[message.guild.region]}`,
          `**> <a:ServerBoost:890954762231644240> Booster Level:** ${message.guild.premiumTier ? `Level: ${message.guild.premiumTier}` : 'Keine Boosts'}`,
         `**> <:Filter:890958306498195556> Explizit Filter:** ${[message.guild.explicitContentFilter]}`,
          `**> <:Veri:890957960614916096> Verifizierungs Level:** ${[message.guild.verificationLevel]}`,
          `**> :heavy_plus_sign: Erstellt am:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} (${moment(message.guild.createdTimestamp).fromNow()})`,
          '\u200b'
        ])
        .addField('Statistiken', [
          `**> <:Rollen:890957557257089047> Alle Rollen:** ${roles.length}`,
          `**> <a:AllEmojis:868531497609592842> Alle Emojis:** ${emojis.size}`,
          `**> :smile: Unanimierte Emojis:** ${emojis.filter(emoji => !emoji.animated).size}`,
          `**> <a:AniEmojis:890956484895203369> Animierte Emojis:** ${emojis.filter(emoji => emoji.animated).size}`,
          `**> :family_mwbb: Alle User:** ${message.guild.memberCount}`,
          `**> <:Member:890956146062524417> Mitglieder:** ${members.filter(member => !member.user.bot).size}`,
          `**> :robot: Bots:** ${members.filter(member => member.user.bot).size}`,
          `**> <:Text:890955886179270676> Text Kanäle:** ${channels.filter(channel => channel.type === 'text').size}`,
          `**> <:Voice:890955247797796894> Voice Kanäle:** ${channels.filter(channel => channel.type === 'voice').size}`,
          `**> <a:ServerBoost:890954762231644240> Booster Level:** ${message.guild.premiumSubscriptionCount || '0'}`
        ])
        .addField('Online', [
          `**> <:Online:890954304112963634> Online:** ${members.filter(member => member.presence.status === 'online').size}`,
          `**> <:Abwesend:890954041482428437> Abwesend:** ${members.filter(member => member.presence.status === 'idle').size}`,
          `**> <:Bittenichtstren:890953780982579221> Bitte nicht stören:** ${members.filter(member => member.presence.status === 'dnd').size}`,
          `**> <:Offline:890953501998452806> Offline:** ${members.filter(member => member.presence.status === 'offline').size}`
        ])
        .setTimestamp()
        .setFooter(`Serverinfo auf ${message.guild.name}`)
        message.channel.send(embed)
      }else
    if(message.content.startsWith(prefix+"teamkick")){
      let user = message.mentions.members.first();
                let user3 = message.author
                let user2 =message.author.username
        let grund = message.content.split(" ").slice(2).join(" ");

                let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }
        if(!user) return message.reply("Du hast vergessen einen Nutzer anzugeben!").then(msg=>msg.delete({timeout:"5000"}));
        if(!grund) grund = "Nicht genannt"
        let role = user.guild.roles.cache.find(rl=>rl.id === "897487283928846336");
user.roles.remove(role)
let embed = new Discord.MessageEmbed()
.setTitle("TEAMKICK")
.setDescription(`Hallo ${user}\n Du wurdest aus dem **\`Community Support und Helfer Team\`** gekickt!\nGrund: **${grund}**`)
user.send(embed)
    }
    
  


if(message.content.startsWith(prefix+"bal")){
      message.delete()
        let user = message.mentions.users.first() || message.author

        if(user.bot) return message.reply("Bots haben kein Coins!")

        let embed = new Discord.MessageEmbed()
        .setTitle(`Coins von ${user.tag}`)
        .setColor("YELLOW")
        .addField("Coins: ",coinfile[user.id].coins)
        .addField("Bank: ", coinfile[user.id].bank)
        message.channel.send(embed)
    }else


if(message.content == `${prefix}tickethelp`){
        message.delete()
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
        let embed = new Discord.MessageEmbed()
        .setTitle("<:Ticket:869271484563066910>Tickethilfe<:Ticket:869271484563066910>")
        .setDescription(`Wie erstelle ich ein Ticket?\n\nGanz einfach mache einfach **${serverstats[message.guild.id].prefix}**createticket um ein Ticket zu erstellen Achtung du musst in dem Ticketkanal sein!\nViel Spaß!`)
        .setColor("BLACK")
        .setTimestamp()
        message.channel.send(embed)}else

    
    if(message.content == `${prefix}ticketi`){
        message.delete()
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
      
        let embed = new Discord.MessageEmbed()
        .setTitle("<:Ticket:869271484563066910>Ticketinfo<:Ticket:869271484563066910>")
        .setTimestamp()
        .setDescription(`Du kannst mit **${serverstats[message.guild.id].prefix}setticketchannel #channel** einen Ticketchannel festlegen und mit **${serverstats[message.guild.id].prefix}resetticketchannel** den Ticket Kanal zurückzetzten!\n\n__**Tickets eröffnene und schließen**__\nTicket eröffnen: **${serverstats[message.guild.id].prefix}createticket**\nTicket schließen: **${serverstats[message.guild.id].prefix}closeticket**\n\nAktueller Ticket Kanal: **${serverstats[message.guild.id].ticketchannel}**`)
        .setColor("RANDOM")
        message.channel.send(embed)
    }else

    //warn system

    if(message.content.startsWith(`${prefix}warn`)){
      message.delete()
      let user2 = message.mentions.users.first() || message.author
       let avatar = {
            avatar: user2.avatarURL({dynamic:true})
       }

          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
      let grund = message.content.split(" ").slice(2).join(" ");
      let user = message.mentions.users.first();
      if(!grund) grund = "Nicht genannt"
      if(!user) return message.reply("Bitte gebe einen User an!").then(msg=>msg.delete({timeout:"5000"}));


      let embed = new Discord.MessageEmbed()

      .setDescription(`**<@!${user.id}> wurde gewarnt!**<a:Warnung:869269858456571974>\n**Grund:** ${grund}`)
      .setColor("RED")
      .setTimestamp()
      .setFooter(`Warnung`, `${avatar.avatar}`)

      message.channel.send(embed)

          fs.writeFile("./warns.json", JSON.stringify(warnFile),function(err){
      if(err) console.log(err)
    })

    }
  //bug
  if(message.content.startsWith(prefix+"bugreport")){
    let bug = message.content.split(" ").slice(1).join(" ");
    let user = message.author
    let embed = new Discord.MessageEmbed()
    .setTitle("ERROR")
    .setDescription(`${user} bitte gebe einen Bug an den du reporten möchtest!`)
    if(!bug) return message.channel.send(embed) 
    let embed2 = new Discord.MessageEmbed()
    .setTitle("Bug eingesendet!")
    .setColor("GREEN")
    .setDescription(`Danke fürs einsenden ${user}\nWir werden user um den Bug kümmern, und ihr möglichst schnell fixen!\nHier kannnst du deinen Bug auch finden: [Dein Bug](https://discord.gg/UZs4g7Gk6r)`)
    message.channel.send(embed2)
    let embed3 = new Discord.MessageEmbed()
    .setTitle("__Neuer Bug__")
    .setColor("GREEN")
    .setDescription(`**${message.author.username}** hat uns einen Bug mit: **${serverstats[message.guild.id].prefix}bugreport [Bug] geschickt!**\n\nMessage:\n**${bug}**`)  
    bot.channels.cache.get('897494422919454740').send(embed3);
  }else
  if(message.content.startsWith(prefix+"sendkey")){
    let embed = new Discord.MessageEmbed()
    .setTitle("Dein Community Bot Premium Key")
    .setDescription("Hallo <@795247263618170901>\nCool du hast Community Bot Premium Gewonnen!\n**Dein Key: ||f34gg3dk2mm5||** Zeige ihn niemand!\nMache `addpremium [key]`. Wenn nichts kommt war der Key falsch...\nViel Spaß mit Premium!")
    .setColor("GREEN")
    .setFooter("PREMIUM")
    bot.users.cache.get("767994933465317387").send(embed)
  }
    //idee
  if(message.content.startsWith(prefix+"idee")){
    let idee = message.content.split(" ").slice(1).join(" ");
    let user = message.author
    let embed = new Discord.MessageEmbed()
    .setTitle("ERROR")
    .setColor("RED")
    .setDescription(`${user} bitte gebe eine Idee an den du einsenden möchtest!`)
    if(!idee) return message.channel.send(embed) 
    let embed2 = new Discord.MessageEmbed()
    .setTitle("Idee eingesendet!")
    .setColor("GREEN")
    .setDescription(`Danke fürs einsenden ${user}\nWir werden deine Idee wenn möglich umsetzten!\nHier kannnst du deine Idee auch finden: [Deine Idee](https://discord.gg/xCDuRpuS4U)`)
    message.channel.send(embed2)
    let embed3 = new Discord.MessageEmbed()
    .setTitle("__Neue Idee__")
    .setColor("GREEN")
    .setDescription(`**${message.author.username}** hat uns eine Idee mit: **${serverstats[message.guild.id].prefix}idee [Idee] geschickt!**\n\nMessage:\n**${idee}**`)  
    bot.channels.cache.get('897494727220428873').send(embed3);
  }else

    if(message.content.startsWith(`${prefix}buy`)){
      message.delete()
        let rank;
        let mrank = message.content.split(" ").slice(1).join(" ");
        if(!mrank) return message.reply("Bitte gebe an welchen Rang du kaufen willst! Bekomme die Liste der Ränge mit: " +serverstats[message.guild.id].prefix+ "shop.").then(msg=>msg.delete({timeout:"5000"}));
        for(var i=0;i<ranks.length;i++){
            message.delete()
            if(isNaN(ranks[i])){
                if(mrank.toLowerCase() == ranks[i].toLowerCase()){
                    rank = ranks[i];
                    break;
                    
                }
            }
        }
if(!rank){
return message.reply("Diesen Rang gibt es nicht oder du hast ihn falsch geschrieben!")
          }else{
            for(var i=0;i<ranks.length;i++){
                if(isNaN(ranks[i]) && ranks[i] !== "list"){
                    if(rank == ranks[i]){
                        if(coinfile[message.author.id].coins < ranks[i+1]){
                            return message.reply("Du hast zu wenig Geld dafür!").then(msg=>msg.delete({timeout:"5000"}));
                        }
                        let buyembed = new Discord.MessageEmbed()
                        .setTitle("Rank gekauft!")
                        .setDescription(`Du hast dir den Rang **${rank}** gekauft.\nEr ist nun in deinem Inventar. Viel Spaß.\n\nFalls du ihn nicht hast musst du einen Mod oder so fragen ob er Ihn erstellt und dann dann dir gibt!`)
                        .setFooter("JUHU")
                        .setColor("GREEN")
                        .setTimestamp()
                        message.channel.send(buyembed)
                    }
                }
            }
    }
        

        fs.writeFile("./coins.json",JSON.stringify(coinfile),function(err){
            if(err) console.log(err)
        })

    }else
    if(message.content.startsWith(prefix+"dep")){
      let menge = message.content.split(" ").slice(1).join("")
      if(!menge) return message.channel.send("Bitte gebe an wie viel Coins du in die Bank legen willst!")
      if(isNaN(menge)) return message.channel.send("Du hast keine Zahl angegeben sondern Buchstaben!")
      if(coinfile[message.author.id].coins < menge) return message.channel.send("Du hast zu viel Coins angegeben!")
      menge = Number(menge)
      coinfile[message.author.id].bank += menge
      coinfile[message.author.id].coins -= menge
      let embed = new Discord.MessageEmbed()
      .setTitle("Coins Depponiert")
      .setDescription("Ich habe deine Coins auf die Bank gelegt")
      .addField("Deine Coins jetzt", "**`"+coinfile[message.author.id].coins+"`**")
      .addField("Auf der Bank jetzt", "**`"+coinfile[message.author.id].bank+"`**")
      .setTimestamp()
      .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
      .setColor("GREEN")
      message.channel.send(embed)
    }else
    if(message.content.startsWith(prefix+"with")){
      let menge = message.content.split(" ").slice(1).join("")
      if(!menge) return message.channel.send("Bitte gebe an wie viel Coins du von der Bank holen willst!")
      if(isNaN(menge)) return message.channel.send("Du hast keine Zahl angegeben sondern Buchstaben!")
      if(coinfile[message.author.id].bank < menge) return message.channel.send("Du hast zu viel Coins angegeben!")
      menge = Number(menge)
      coinfile[message.author.id].bank -= menge
      coinfile[message.author.id].coins += menge
      let embed = new Discord.MessageEmbed()
      .setTitle("Coins Abgehoben")
      .setDescription("Ich habe deine Coins von der Bank geholt")
      .addField("Deine Coins jetzt", "**`"+coinfile[message.author.id].coins+"`**")
      .addField("Auf der Bank jetzt", "**`"+coinfile[message.author.id].bank+"`**")
      .setTimestamp()
      .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
      .setColor("GREEN")
      message.channel.send(embed)
    }else
    
    


    if(message.content === "prefix"){
      message.delete()
        message.channel.send("Der Prefix ist **"+serverstats[message.guild.id].prefix+"** Du kannst ihn mit: "+serverstats[message.guild.id].prefix+"setprefix [neuer prefix] ändern. Wenn du das getan hast mache: "+serverstats[message.guild.id].prefix+"help um in das Hilfemenü zu kommen!").then(msg=>msg.delete({timeout:"60000"}));
    }else

    if(message.content.startsWith(prefix+"setprefix")){
      
        let newprefix = message.content.split(" ").slice(1).join("");
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);

        serverstats[message.guild.id].prefix = newprefix;

        message.channel.send("Die neue Prefix ist **"+newprefix+"**.").then(msg=>msg.delete({timeout:"60000"}));

        fs.writeFile("./servers.json",JSON.stringify(serverstats),function(err){
            if(err) console.log(err);
        })
    }else

//leave
  
        if(message.content.startsWith(prefix+"setleavechannel")){
            message.delete()
        if(!serverstats[message.guild.id].leavechannel){
            serverstats[message.guild.id].leavechannel = "nochannel"
        }

        let newchannel = message.mentions.channels.first();

        if(!newchannel) return message.reply("Du hast keinen Kanal angegeben!").then(msg=>msg.delete({timeout:"5000"}));
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
    
        serverstats[message.guild.id].leavechannel = newchannel.name;
        let embed = new Discord.MessageEmbed()
        .setTitle("Leavechannel festgelegt!")
        .setDescription(`Der **neue Leavechannel** ist nun <#${newchannel.id}>\nDu kannst ihn mit **${serverstats[message.guild.id].prefix}resetleavechannel** zurücksetzten!\nAuserdem kannst du, wenn die dies noch nicht getan hast den Welcomechannel mit: **${serverstats[message.guild.id].prefix}setwelcomechannel #channel** festlegen!`)
        .setColor("BLUE")
        .setFooter(`${serverstats[message.guild.id].prefix}welcomehelp`)
        .setTimestamp()

        message.channel.send(embed)

        fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err){
            if(err) console.log(err);
        })
    }else

    if(message.content.startsWith(prefix+"resetleavechannel")){
        message.delete()
          let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
        if(!serverstats[message.guild.id].leavechannel){
            serverstats[message.guild.id].leavechannel = "nochannel"
        }
        serverstats[message.guild.id].leavechannel = "nochannel";
        let embed = new Discord.MessageEmbed()
        .setTitle("Leavechannel zurückgesetzt!")
        .setDescription(`Der **Leavechannel** wurde zurückgesetzt!\nDu kannst ihn mit **${serverstats[message.guild.id].prefix}setleavechannel #channel** wieder festlegen!`)
        .setColor("BLUE")
        .setFooter(`${serverstats[message.guild.id].prefix}welcomehelp`)
        .setTimestamp()

        message.channel.send(embed)
    }else
            if(message.content.startsWith(prefix+"setwelcomerole")){
            message.delete()
              let premium = message.guild.id === serverstats[message.guild.id].premiums;
 let premiumembed = new Discord.MessageEmbed()
 .setTitle("❌Kein <a:ServerBoost:890954762231644240>Premium")
 .setDescription(`Der Server: **${message.guild.name}** hat kein Premium!\nWenn du die <a:ServerBoost:890954762231644240>Premium-Befehle für den Bot freischalten willst gehen auf den [Support Server](https://discord.gg/g6GdhJzVGJ), dort finden Regelmäsige Gewinnspiel statt wo du <a:ServerBoost:890954762231644240>Premium gewinnen kannst!\n**Viel Glück**`)
 .setColor("RED")
 .setFooter("❌Kein Premium")
 .setTimestamp()
 .setThumbnail(message.guild.iconURL({dynamic: true}))
    if(!premium || premium.id === "nop") return message.channel.send(premiumembed)
        if(!serverstats[message.guild.id].wrole){
            serverstats[message.guild.id].wrole = "norole"
        }
                  let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);

        let newrole = message.mentions.roles.first()

        if(!newrole) return message.reply("Du hast keine Rolle angegeben!").then(msg=>msg.delete({timeout:"5000"}));

    
        serverstats[message.guild.id].wrole = newrole.name;
        let embed = new Discord.MessageEmbed()
        .setTitle("Welcomerole festgelegt!")
        .setDescription(`Die neue **Welcomerole** ist nun <@&${newrole.id}>\nDu kannst ihn mit **${serverstats[message.guild.id].prefix}resetwelcomerole** zurücksetzten!`)
        .setColor("BLUE")
        .setFooter(`${serverstats[message.guild.id].prefix}welcomehelp`)
        .setTimestamp()

        message.channel.send(embed)

        fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err){
            if(err) console.log(err);
        })
    }else
        if(message.content.startsWith(prefix+"resetwelcomerole")){
        message.delete()
          let premium = message.guild.id === serverstats[message.guild.id].premiums;
 let premiumembed = new Discord.MessageEmbed()
 .setTitle("❌Kein <a:ServerBoost:890954762231644240>Premium")
 .setDescription(`Der Server: **${message.guild.name}** hat kein Premium!\nWenn du die <a:ServerBoost:890954762231644240>Premium-Befehle für den Bot freischalten willst gehen auf den [Support Server](https://discord.gg/g6GdhJzVGJ), dort finden Regelmäsige Gewinnspiel statt wo du <a:ServerBoost:890954762231644240>Premium gewinnen kannst!\n**Viel Glück**`)
 .setColor("RED")
 .setFooter("❌Kein Premium")
 .setTimestamp()
 .setThumbnail(message.guild.iconURL({dynamic: true}))
    if(!premium || premium.id === "nop") return message.channel.send(premiumembed)
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Du hast keien Rechte dafür.").then(msg=>msg.delete({timeout:"5000"}));
        if(!serverstats[message.guild.id].wrole){
            serverstats[message.guild.id].wrole = "norole"
        }
        serverstats[message.guild.id].wrole = "norole";
        let embed = new Discord.MessageEmbed()
        .setTitle("Welcomerole zurückgesetzt!")
        .setDescription(`Die **Welcomerole** wurde zurückgesetzt!\nDu kannst ihn mit **${serverstats[message.guild.id].prefix}setwelcomerole @role** wieder festlegen!`)
        .setColor("BLUE")
        .setFooter(`${serverstats[message.guild.id].prefix}welcomehelp`)
        .setTimestamp()

        message.channel.send(embed)
    }else
  //welcome     

    if(message.content.startsWith(prefix+"resetwelcomechannel")){
      message.delete()
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Du hast keien Rechte dafür.").then(msg=>msg.delete({timeout:"5000"}));
        if(!serverstats[message.guild.id].welcomechannel){
            serverstats[message.guild.id].welcomechannel = "Keinen Festgelegt -> setwelcomechannel #channel"
        }
        serverstats[message.guild.id].welcomechannel = "Keinen Festgelegt -> setwelcomechannel #channel";
        let embed = new Discord.MessageEmbed()
        .setTitle("Welcomechannel zurückgesetzt!")
        .setDescription(`Der **Welcomechannel** wurde zurückgesetzt!\nDu kannst ihn mit **${serverstats[message.guild.id].prefix}setwelcomechannel #channel** wieder festlegen!`)
        .setColor("BLUE")
        .setFooter(`${serverstats[message.guild.id].prefix}welcomehelp`)
        .setTimestamp()
        message.channel.send(embed)
    }else
        if(message.content.startsWith(prefix+"setwelcomechannel")){
            message.delete()
        if(!serverstats[message.guild.id].welcomechannel){
            serverstats[message.guild.id].welcomechannel = "Keinen Festgelegt -> setwelcomechannel #channel"
        }

        let newchannel = message.mentions.channels.first();

        if(!newchannel) return message.reply("Du hast keinen Kanal angegeben!").then(msg=>msg.delete({timeout:"5000"}));
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Du hast keine Rechte dafür!");
    
        serverstats[message.guild.id].welcomechannel = newchannel.name;
        let embed = new Discord.MessageEmbed()
        .setTitle("Welcomechannel festgelegt!")
        .setDescription(`Der **neue Welcomechannel** ist nun <#${newchannel.id}>\nDu kannst ihn mit **${serverstats[message.guild.id].prefix}resetwelcomechannel** zurücksetzten!\nAuserdem kannst du, wenn die dies noch nicht getan hast den Leavechannel mit: **${serverstats[message.guild.id].prefix}setleavechannel #channel** festlegen!`)
        .setColor("BLUE")
        .setFooter(`${serverstats[message.guild.id].prefix}welcomehelp`)
        .setTimestamp()

        message.channel.send(embed)

        fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err){
            if(err) console.log(err);
        })
    }else
    if(message.content.startsWith(prefix+"setticketchannel")){
            message.delete()
        if(!serverstats[message.guild.id].ticketchannel){
            serverstats[message.guild.id].ticketchannel = "noticket"
        }

        let newchannel = message.mentions.channels.first();

        if(!newchannel) return message.reply("Du hast keinen Kanal angegeben!").then(msg=>msg.delete({timeout:"5000"}));
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Du hast keine Rechte dafür!");
    
        serverstats[message.guild.id].ticketchannel = newchannel.name;
        let embed = new Discord.MessageEmbed()
        .setTitle("Ticketchannel festgelegt!")
        .setDescription(`Der **neue Ticketchannel** ist nun <#${newchannel.id}>\nDu kannst ihn mit **${serverstats[message.guild.id].prefix}resetticketchannel** zurücksetzten!`)
        .setColor("BLUE")
        .setFooter(`${serverstats[message.guild.id].prefix}ticketi`)
        .setTimestamp()

        message.channel.send(embed)

        fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err){
            if(err) console.log(err);
        })
    }else
        if(message.content.startsWith(prefix+"resetticketchannel")){
            message.delete()
        if(!serverstats[message.guild.id].ticketchannel){
            serverstats[message.guild.id].ticketchannel = "noticket"
        }
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Du hast keine Rechte dafür!");
    
        serverstats[message.guild.id].ticketchannel = "noticket";
        let embed = new Discord.MessageEmbed()
        .setTitle("Ticketchannel zurückgesetzt!")
        .setDescription(`Der Ticketchannel wurde **zurückgesetzt**!\nDu kannst ihn mit **${serverstats[message.guild.id].prefix}setticketchannel** festlegen!`)
        .setColor("BLUE")
        .setFooter(`${serverstats[message.guild.id].prefix}ticketi`)
        .setTimestamp()

        message.channel.send(embed)

        fs.writeFile("./servers.json", JSON.stringify(serverstats), function(err){
            if(err) console.log(err);
        })
    }else

              if(message.content.startsWith(`${prefix}gstart`)){
              let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
                  let time = args[1]
                  if (!time) return message.channel.send('Bitte gebe eine Zeit an!');
          
                  if (
                      !args[1].endsWith("d") &&
                      !args[1].endsWith("h") &&
                      !args[1].endsWith("m") &&
                      !args[1].endsWith("s") 
                  )
                      return message.channel.send("Benutze `d-> Tage, h-> Stunden, m-> Minuten, s-> Sekunden!`")
          
                      let gchannel = message.mentions.channels.first();
                      if (!gchannel) return message.channel.send("Bitte gebe einen Kanal an!")
          
                      let prize = args.slice(3).join(" ")
                      if (!prize) return message.channel.send('Was ist der Preis?')
          
                      message.delete()
                      gchannel.send(":tada: **NEUES GIVEAWAY** :tada:")
                      let gembed = new Discord.MessageEmbed()
                          .setTitle("Neues Giveaway!")
                          .setDescription(`Reagiere mit :tada: um am Gewinnspiel teizunehmen!\nGiveaway von: **${message.author}**\nZeit: **${time}**\nPreis: **${prize}**`)
                          .setTimestamp(Date.now + ms(args[1]))
                          .setColor("GOLD")
                      let n = await gchannel.send(gembed)
                      n.react("🎉")
                      setTimeout(() => {
                          if(n.reactions.cache.get("🎉").count <= 1) {
                              return message.channel.send("Ich konnte keinen Gewinner ermitteln")
                          }
          
                          let winner = n.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
                          gchannel.send(`Gratulation ${winner}! Du gewinnst: **${prize}**!`
                          );
                      }, ms(args[1]));
              }


        


  
    //ticket system
if(message.content.startsWith(prefix+"serverstats")){
   message.delete()
   let members = message.guild.members.cache;
   let channels = message.guild.channels.cache;
        let rawusername = message.author.username.split("").slice(0);

        let username = "";
        

        for(i=0;i<rawusername.length;i++){
            if(rawusername[i].toLowerCase() == "a"
            || rawusername[i].toLowerCase() == "b"
            || rawusername[i].toLowerCase() == "c"
            || rawusername[i].toLowerCase() == "d"
            || rawusername[i].toLowerCase() == "e"
            || rawusername[i].toLowerCase() == "f"
            || rawusername[i].toLowerCase() == "g"
            || rawusername[i].toLowerCase() == "h"
            || rawusername[i].toLowerCase() == "i"
            || rawusername[i].toLowerCase() == "j"
            || rawusername[i].toLowerCase() == "k"
            || rawusername[i].toLowerCase() == "l"
            || rawusername[i].toLowerCase() == "m"
            || rawusername[i].toLowerCase() == "n"
            || rawusername[i].toLowerCase() == "o"
            || rawusername[i].toLowerCase() == "p"
            || rawusername[i].toLowerCase() == "q"
            || rawusername[i].toLowerCase() == "r"
            || rawusername[i].toLowerCase() == "s"
            || rawusername[i].toLowerCase() == "t"
            || rawusername[i].toLowerCase() == "u"
            || rawusername[i].toLowerCase() == "v"
            || rawusername[i].toLowerCase() == "w"
            || rawusername[i].toLowerCase() == "x"
            || rawusername[i].toLowerCase() == "y"
            || rawusername[i].toLowerCase() == "z"
            || rawusername[i].toLowerCase() == "0"
            || rawusername[i].toLowerCase() == "1"
            || rawusername[i].toLowerCase() == "2"
            || rawusername[i].toLowerCase() == "3"
            || rawusername[i].toLowerCase() == "4"
            || rawusername[i].toLowerCase() == "5"
            || rawusername[i].toLowerCase() == "6"
            || rawusername[i].toLowerCase() == "7"
            || rawusername[i].toLowerCase() == "8"
            || rawusername[i].toLowerCase() == "9"){
                username+=rawusername[i].toLowerCase();
            }
        }
        let category = message.guild.channels.cache.find(ct=>ct.name === "📊Serverstats📊" && ct.type === "category");

        if(!category) await message.guild.channels.create("📊Serverstats📊", {type:"category"}).then(cat=>category = cat);
        let test = message.guild.channels.cache.find(ch=>ch.name === `👦Alle Mitgielder: ${message.guild.memberCount}` && ch.type === "voice");

        if(test) return message.channel.send("Ich habe die Serverstats bereits erstellt")

        let test2 = message.guild.channels.cache.find(ch=>ch.name === `😁Mitglieder: ${members.filter(member => !member.user.bot).size}` && ch.type === "voice");

        if(test2) return message.channel.send("Ich habe die Serverstats bereits erstellt")
        
        let test3 = message.guild.channels.cache.find(ch=>ch.name === `🤖Bots: ${members.filter(member => member.user.bot).size}` && ch.type === "voice");

        if(test3) return message.channel.send("Ich habe die Serverstats bereits erstellt")

        let test4 = message.guild.channels.cache.find(ch=>ch.name === `💬Text Känale: ${channels.filter(channel => channel.type === 'text').size}` && ch.type === "voice");

        if(test4) return message.channel.send("Ich habe die Serverstats bereits erstellt")

        let test5 = message.guild.channels.cache.find(ch=>ch.name === `🔊Voice Känale: ${channels.filter(channel => channel.type === 'voice').size}` && ch.type === "voice");

        if(test5) return message.channel.send("Ich habe die Serverstats bereits erstellt")

        await message.guild.channels.create(`👦Alle Mitgielder: ${message.guild.memberCount}`,{type:"voice"}).then(ch=>{
          ch.setParent(category);
            ch.overwritePermissions([
                {
                    id:message.guild.id,
                    deny:["CONNECT", "SPEAK"]
                }
            ])})
                      message.guild.channels.create(`😁Mitglieder: ${members.filter(member => !member.user.bot).size}`,{type:"voice"}).then(ch=>{
          ch.setParent(category);
            ch.overwritePermissions([
                {
                    id:message.guild.id,
                    deny:["CONNECT", "SPEAK"]
                }
            ])})//channels.filter(channel => channel.type === 'text').size
            await message.guild.channels.create(`🤖Bots: ${members.filter(member => member.user.bot).size}`,{type:"voice"}).then(ch=>{
          ch.setParent(category);
            ch.overwritePermissions([
                {
                    id:message.guild.id,
                    deny:["CONNECT", "SPEAK"]
                }
            ])})
            await message.guild.channels.create(`💬Text Känale: ${channels.filter(channel => channel.type === 'text').size}`,{type:"voice"}).then(ch=>{
          ch.setParent(category);
            ch.overwritePermissions([
                {
                    id:message.guild.id,
                    deny:["CONNECT", "SPEAK"]
                }
            ])})
            await message.guild.channels.create(`🔊Voice Känale: ${channels.filter(channel => channel.type === 'voice').size}`,{type:"voice"}).then(ch=>{
          ch.setParent(category);
            ch.overwritePermissions([
                {
                    id:message.guild.id,
                    deny:["CONNECT", "SPEAK"]
                }
            ])})

        message.channel.send(`✅ Ich habe die Serverstatistigen erstellt viel Spaß! Mache am besten ab und zu \`${serverstats[message.guild.id].prefix}supdate\` um Alle Rolle zu Updaten!`)
    }
    if(message.content.startsWith(prefix+"supdate")){
         let members = message.guild.members.cache;
   let channels = message.guild.channels.cache;
      let test = message.guild.channels.cache.find(ch=>ch.name === `👦Alle Mitgielder: ${message.guild.memberCount}` && ch.type === "voice");

        if(!test) return message.channel.send("Bitte erstelle erst die Serverstatistigen um diesen Befehl zu nutzen!")

        let test2 = message.guild.channels.cache.find(ch=>ch.name === `😁Mitglieder: ${members.filter(member => !member.user.bot).size}` && ch.type === "voice");

        if(!test2) return message.channel.send("Bitte erstelle erst die Serverstatistigen um diesen Befehl zu nutzen!")
        
        let test3 = message.guild.channels.cache.find(ch=>ch.name === `🤖Bots: ${members.filter(member => member.user.bot).size}` && ch.type === "voice");

        if(!test3) return message.channel.send("Bitte erstelle erst die Serverstatistigen um diesen Befehl zu nutzen!")

        let test4 = message.guild.channels.cache.find(ch=>ch.name === `💬Text Känale: ${channels.filter(channel => channel.type === 'text').size}` && ch.type === "voice");

        if(!test4) return message.channel.send("Bitte erstelle erst die Serverstatistigen um diesen Befehl zu nutzen!")

        let test5 = message.guild.channels.cache.find(ch=>ch.name === `🔊Voice Känale: ${channels.filter(channel => channel.type === 'voice').size}` && ch.type === "voice").then(channel => channel.edit === ``)

        if(!test5) return message.channel.send("Bitte erstelle erst die Serverstatistigen um diesen Befehl zu nutzen!")

        message.guild.channels.cache.edit(ch=>ch.name === `🔊Voice Känale: ${channels.filter(channel => channel.type === 'voice').size}` && ch.type === "voice")
    }

if(message.content.startsWith(prefix+"createticket")){
   message.delete()
      let embed6 = new Discord.MessageEmbed()
   .setTitle("❌ERROR")
   .setColor("RED")
   .setDescription(`Du hast noch keinen **__Ticket__** Kanal!\nDu kannst mit: **${serverstats[message.guild.id].prefix}setticketchannel #channel** festlegen!`)
   .setTimestamp()
   .setThumbnail(message.author.avatarURL({dynamic: true}))
   .setFooter("❌Error Meldung!")

    let channel = message.guild.channels.cache.find(ch => ch.name === serverstats[message.guild.id].ticketchannel);
    if(!channel || channel.name === "noticket") return message.channel.send(embed6)
        let rawusername = message.author.username.split("").slice(0);

        let username = "";
        

        for(i=0;i<rawusername.length;i++){
            if(rawusername[i].toLowerCase() == "a"
            || rawusername[i].toLowerCase() == "b"
            || rawusername[i].toLowerCase() == "c"
            || rawusername[i].toLowerCase() == "d"
            || rawusername[i].toLowerCase() == "e"
            || rawusername[i].toLowerCase() == "f"
            || rawusername[i].toLowerCase() == "g"
            || rawusername[i].toLowerCase() == "h"
            || rawusername[i].toLowerCase() == "i"
            || rawusername[i].toLowerCase() == "j"
            || rawusername[i].toLowerCase() == "k"
            || rawusername[i].toLowerCase() == "l"
            || rawusername[i].toLowerCase() == "m"
            || rawusername[i].toLowerCase() == "n"
            || rawusername[i].toLowerCase() == "o"
            || rawusername[i].toLowerCase() == "p"
            || rawusername[i].toLowerCase() == "q"
            || rawusername[i].toLowerCase() == "r"
            || rawusername[i].toLowerCase() == "s"
            || rawusername[i].toLowerCase() == "t"
            || rawusername[i].toLowerCase() == "u"
            || rawusername[i].toLowerCase() == "v"
            || rawusername[i].toLowerCase() == "w"
            || rawusername[i].toLowerCase() == "x"
            || rawusername[i].toLowerCase() == "y"
            || rawusername[i].toLowerCase() == "z"
            || rawusername[i].toLowerCase() == "0"
            || rawusername[i].toLowerCase() == "1"
            || rawusername[i].toLowerCase() == "2"
            || rawusername[i].toLowerCase() == "3"
            || rawusername[i].toLowerCase() == "4"
            || rawusername[i].toLowerCase() == "5"
            || rawusername[i].toLowerCase() == "6"
            || rawusername[i].toLowerCase() == "7"
            || rawusername[i].toLowerCase() == "8"
            || rawusername[i].toLowerCase() == "9"){
                username+=rawusername[i].toLowerCase();
            }
        }
        if(message.channel.name !== serverstats[message.guild.id].ticketchannel) return message.reply(`Du kannst in diesem Kanal kein ticket erstellen! Begebe dich bitte dazu in den Ticket Kanal`).then(msg=>msg.delete({timeout:"5000"}));

        message.delete();

        if(message.guild.channels.cache.find(cha=>cha.name===`ticket-${username.toLowerCase()}`)) return message.reply("Du hast bereits ein ticket erstellt!").then(msg=>msg.delete({timeout:"5000"}));

        //let moderatorRole = message.guild.roles.cache.find(rl=>rl.name ==="Moderator");
        let category = message.guild.channels.cache.find(ct=>ct.name === "tickets" && ct.type === "category");

        if(!category) await message.guild.channels.create("tickets", {type:"category"}).then(cat=>category = cat);

        //if(!moderatorRole) return message.reply("Ich konnte keine Moderator rolle finden!").then(msg=>msg.delete({timeout:"5000"}));Hey <@&${moderatorRole.id}>

        await message.guild.channels.create(`ticket-${message.author.username}`,{type:"text"}).then(ch=>{
          ch.setParent(category);
            ch.overwritePermissions([
                {
                    id:message.guild.id,
                    deny:["SEND_MESSAGES","VIEW_CHANNEL","ATTACH_FILES"]
                },
                {
                    id:message.author.id,
                    allow:["SEND_MESSAGES","VIEW_CHANNEL","ATTACH_FILES"]
                }
            ]);

            ch.send(`Hey @here, hier braucht jemand Hilfe!`);
        }).catch(err=>{
            if(err) return message.channel.send("Ein fehler ist aufgetreten: "+err);
        })

        message.reply("Ein Ticket wurde erstellt. Bitte begebe dich in diesem text kanal und beschreibe dein Problem").then(msg=>msg.delete({timeout:"9000"}));
    }else


    if(message.content.startsWith(prefix+"closeticket")){
      let premissonembed = new Discord.MessageEmbed()
          .setTitle("❌NO PERMISSIONS")
          .setDescription(`Für diesen Befehl benötigst du \`ADMINISTRATOR\` Rechte!`)
          .setFooter("❌| WARNING |❌")
          .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("RED")
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(premissonembed);
        let rawusername = message.author.username.split("").slice(0);

        let username = "";

        for(i=0;i<rawusername.length;i++){
            if(rawusername[i].toLowerCase() == "a"
            || rawusername[i].toLowerCase() == "b"
            || rawusername[i].toLowerCase() == "c"
            || rawusername[i].toLowerCase() == "d"
            || rawusername[i].toLowerCase() == "e"
            || rawusername[i].toLowerCase() == "f"
            || rawusername[i].toLowerCase() == "g"
            || rawusername[i].toLowerCase() == "h"
            || rawusername[i].toLowerCase() == "i"
            || rawusername[i].toLowerCase() == "j"
            || rawusername[i].toLowerCase() == "k"
            || rawusername[i].toLowerCase() == "l"
            || rawusername[i].toLowerCase() == "m"
            || rawusername[i].toLowerCase() == "n"
            || rawusername[i].toLowerCase() == "o"
            || rawusername[i].toLowerCase() == "p"
            || rawusername[i].toLowerCase() == "q"
            || rawusername[i].toLowerCase() == "r"
            || rawusername[i].toLowerCase() == "s"
            || rawusername[i].toLowerCase() == "t"
            || rawusername[i].toLowerCase() == "u"
            || rawusername[i].toLowerCase() == "v"
            || rawusername[i].toLowerCase() == "w"
            || rawusername[i].toLowerCase() == "x"
            || rawusername[i].toLowerCase() == "y"
            || rawusername[i].toLowerCase() == "z"
            || rawusername[i].toLowerCase() == "0"
            || rawusername[i].toLowerCase() == "1"
            || rawusername[i].toLowerCase() == "2"
            || rawusername[i].toLowerCase() == "3"
            || rawusername[i].toLowerCase() == "4"
            || rawusername[i].toLowerCase() == "5"
            || rawusername[i].toLowerCase() == "6"
            || rawusername[i].toLowerCase() == "7"
            || rawusername[i].toLowerCase() == "8"
            || rawusername[i].toLowerCase() == "9"){
                username+=rawusername[i].toLowerCase();
            }
        }
                if(!message.channel.name.includes("ticket") || message.channel.name === serverstats[message.guild.id].ticketchannel) return message.channel.send("ERROR")


        await message.channel.send("Ticket wird geschlossen...");

        await message.channel.delete().catch(err=>{
            if(err) return console.error("Es ist ein fehler beim löschen des kanals passiert: "+err);
        })

    }
})
bot.on("message", async(message) => {
let prefix = serverstats[message.guild.id].prefix;
 
    const serverQueue = queue.get(message.guild.id);
 
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();
 
    switch(command){
        case 'play':
            execute(message, serverQueue);
            break;
        case 'stop':
            stop(message, serverQueue);
            break;
        case 'skip':
            skip(message, serverQueue);
            break;
        case 'pause':
            pause(serverQueue);
            break;
        case 'resume':
            resume(serverQueue);
            break;
         case 'queue':
          Queue(serverQueue);
            break;
    }
 
    async function execute(message, serverQueue){
        let vc = message.member.voice.channel;
        if(!vc){
            return message.channel.send("Bitte gehe zurest in einen Voice Channel");
        }else{
            let result = await searcher.search(args.join(" "), { type: "video" })
            const songInfo = await ytdl.getInfo(result.first.url)
 
            let song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url
            };
 
            if(!serverQueue){
                const queueConstructor = {
                    txtChannel: message.channel,
                    vChannel: vc,
                    connection: null,
                    songs: [],
                    volume: 10,
                    playing: true
                };
                queue.set(message.guild.id, queueConstructor);
 
                queueConstructor.songs.push(song);
 
                try{
                    let connection = await vc.join();
                    queueConstructor.connection = connection;
                    play(message.guild, queueConstructor.songs[0]);
                }catch (err){
                    console.error(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(`Irgent was ist schiefgegenagen: ${err}`)
                }
            }else{
            let embed = new Discord.MessageEmbed()
              .setTitle(`Song hinzugefügt`)
              .setDescription(`[${song.title}](${serverQueue.songs[0].url})`)
              .setFooter(`Hinzugefügt von ${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
              .setColor("BLUE")
                serverQueue.songs.push(song);
                return message.channel.send(embed);
            }
        }
    }
    function play(guild, song){
        const serverQueue = queue.get(guild.id);
        if(!song){
            serverQueue.vChannel.leave();
            queue.delete(guild.id);
            return;
        }
        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on('finish', () =>{
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            let embed2 = new Discord.MessageEmbed()
              .setTitle(`Spielt nun`)
              .setDescription(`[${song.title}](${serverQueue.songs[0].url})`)
              .setFooter(`Hinzugefügt von ${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
              .setColor("BLUE")
            serverQueue.txtChannel.send(embed2)
    }
    function stop (message, serverQueue){
        if(!message.member.voice.channel)
            return message.channel.send("Bitte gehe zurest in einen Voice Channel")
            
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        let embed3 = new Discord.MessageEmbed()
        .setTitle("Musik Gestoppt")
        .setDescription("Ich habe den Voicechannel verlassen und habe das Lied gestoppt!")
        .setColor("RED")
        .setFooter(`Gestoppt von ${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
        message.channel.send(embed3)
    }
    function skip (message, serverQueue){
        if(!message.member.voice.channel)
            return message.channel.send("Bitte gehe zurest in einen Voice Channel");
        if(!serverQueue)
            return message.channel.send("Es gibt nichts zum skippen");
        serverQueue.connection.dispatcher.end();
    }
    function pause(serverQueue){
            if(!message.member.voice.channel) return message.channel.send("Bitte gehe zurest in einen Voice Channel")
      if(!serverQueue.connection) return message.channel.send("Es spielt gerade keine Music!")
      if(serverQueue.connection.dispatcher.paused) return message.channel.send("Der Song ist bereits Pausiert!")
      serverQueue.connection.dispatcher.pause();
      let embed4 = new Discord.MessageEmbed()
        .setTitle("Musik Pausiert")
        .setDescription("Ich habe die Music Pausiert!")
        .setColor("RED")
        .setFooter(`Pausiert von ${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
        message.channel.send(embed4)
    }
    function resume(serverQueue){
            if(!message.member.voice.channel) return message.channel.send("Bitte gehe zurest in einen Voice Channel")
    if(!serverQueue.connection) return message.channel.send("Es spielt gerade keine Music!")
      if(serverQueue.connection.dispatcher.resumed) return message.channel.send("Es spielt bereits ein Song!")
      serverQueue.connection.dispatcher.resume();
      let embed5 = new Discord.MessageEmbed()
        .setTitle("Musik spiet weiter")
        .setDescription("Ich habe die Music weiter spielen lassen!")
        .setColor("GREEN")
        .setFooter(`Weiter spielen lassen von ${message.author.tag}`, `${message.author.avatarURL({dynamic: true})}`)
        message.channel.send(embed5)
    }
    function Queue(serverQueue){
            if(!message.member.voice.channel) return message.channel.send("Bitte gehe zurest in einen Voice Channel")
      if(!serverQueue.connection) return message.channel.send("Es spielt gerade keine Music!")
      if(!serverQueue) return message.channel.send("Es gibt keine Warteschlange!")
      

      let nowPlaying = serverQueue.songs[0];
      let qMsg = `Spielt nun: ${nowPlaying.title}\n----------------------\n`
      for(var i = 1; i < serverQueue.songs.length; i++){
        qMsg += `${serverQueue.songs[i].title}\n`
      }
    message.channel.send("```"+qMsg+"``` Angefordert von "+message.author.tag)
    }
})






/*bot.on("guildMemberAdd", function(member){
    let channel = member.guild.channels.cache.find(ch => ch.name === serverstats[member.guild.id].welcomechannel);
    if(!channel || channel.name === "nochannel") return;
                let embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTimestamp()
                .setTitle(`<a:welcome:869273549280522270>Willkommen **${member.displayName}**<a:welcome:869273549280522270>`)
                .setDescription(`<a:Pfeil:865239783743291403>Wichtige Regeln:\n<a:Pfeil:865239783743291403> Keine Beleidigungen!\n<a:Pfeil:865239783743291403> Keine Werbung auser in die dafür vorgesehenen Channel!\n<a:Pfeil:865239783743291403>Kein Spam und massen Pings!\n\n<a:Pfeil:865239783743291403>Sonst Viel Spaß auf dem Server:\n<a:Pfeil:865239783743291403>Fragen stellen/Support\n<a:Pfeil:865239783743291403>...`)
                .setImage("https://2.bp.blogspot.com/-SuwI8q5KwLc/V0fJMT3TPoI/AAAAAAAAADc/8ppco-KcLbw11G0WgOJQ25XjWh7Cv3ohwCLcB/s1600/146202.gif")
                channel.send(embed)

    let role = member.guild.roles.cache.find(rl=>rl.name === "Mitglied");
   if(!role) return
    member.roles.add(role)

})*/
bot.on("guildCreate", (guild) => {
  let sendchannel
  guild.channels.cache.forEach((channel) => {
    if(
      channel.type === "text" &&
      !sendchannel &&
      channel.permissionsFor(guild.me).has("SEND_MESSAGES")
    )
    sendchannel = channel
  })
  if(!sendchannel);
  const newGuildEmbed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setAuthor(guild.name, guild.iconURL({dynamic: true}))
  .setTitle(`Danke das du ${bot.user.username} eingeladen hast!`)
  .setDescription(`**Benutze %help um alle meine Befehle zu sehen oder ändere den Prefix mit: %setprefix [neuer Prefix]**\n**__WICHTIG: WENN DER SERVER KEIN PROFILBILD HAT SENDET ER FAST KEINE NAHRRICHTEN!__**`)
  .setTimestamp()
  .setFooter(bot.user.username, bot.user.displayAvatarURL())
  sendchannel.send(newGuildEmbed)
})
const canvacord = require('canvacord')
bot.on("guildMemberAdd", async member => {
let channel = member.guild.channels.cache.find(ch => ch.name === serverstats[member.guild.id].welcomechannel);
    if(!channel || channel.name === "Keinen Festgelegt -> setwelcomechannel #channel") return;
  const welcomeCard = new canvacord.Welcomer()
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setAvatar(member.user.displayAvatarURL({format: "png"}))
  .setColor("title", "#68048a")
  .setColor("username-box", "#68048a")
  .setColor("discriminator-box", "#68048a")
  .setColor("message-box", "#68048a")
  .setColor("border", "#34068a")
  .setColor("avatar", "#550dd1")
  .setBackground("http://images.unsplash.com/photo-1522865080725-2a9ea1fcb94e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max")
  .setMemberCount(member.guild.memberCount)
  let attachment = new Discord.MessageAttachment(await
  welcomeCard.build(), "welcome.png")
  channel.send(member.user.toString()+" joined the server!", attachment)
  let role = member.guild.roles.cache.find(r => r.name === serverstats[member.guild.id].wrole)
  if(!channel || role.name === "norole") return;
  await member.roles.add(role)

})
bot.on("guildMemberRemove", async member => {
let channel = member.guild.channels.cache.find(ch => ch.name === serverstats[member.guild.id].leavechannel);
    if(!channel || channel.name === "nochannel") return;
  const welcomeCard = new canvacord.Leaver()
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setAvatar(member.user.displayAvatarURL({format: "png"}))
  .setColor("title", "#68048a")
  .setColor("username-box", "#68048a")
  .setColor("discriminator-box", "#68048a")
  .setColor("message-box", "#68048a")
  .setColor("border", "#34068a")
  .setColor("avatar", "#550dd1")
  .setBackground("http://images.unsplash.com/photo-1522865080725-2a9ea1fcb94e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max")
  .setMemberCount(member.guild.memberCount)
  let attachment = new Discord.MessageAttachment(await
  welcomeCard.build(), "bye.png")
  channel.send(member.user.toString()+" left the server!", attachment)
})



/*bot.on("guildMemberRemove", function(member){
    let channel = member.guild.channels.cache.find(ch => ch.name === serverstats[member.guild.id].leavechannel);
    if(!channel || channel.name === "nochannel") return;
                    let embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTimestamp()
                .setTitle(`Bye Bye ${member.displayName}`)
                .setDescription(`Schade das uns **${member.displayName}** schon verlassen hat.😵\n Das ist sehr sehr schade, er war nur so kurz bei uns!😢\n Wir hoffen alle er kommt wieder!:thumbsup: `)
                .setImage("https://gifimage.net/wp-content/uploads/2017/10/bye-animated-gif-12.gif")
                channel.send(embed)

    let role = member.guild.roles.cache.find(rl=>rl.name === "Mitglied");
    if(!role) return;
    member.roles.remove(role);
})*/


bot.login(process.env.tocken)
      const embed = new Discord.MessageEmbed()
      .setTitle("Invite Community Bot")
      .setDescription(`__Invite Link für Community Bot:__\n\n**[Klick here](https://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=0&scope=bot%20applications.commands)\nOder über diesen Link:**\nhttps://discord.com/api/oauth2/authorize?client_id=826106313175203931&permissions=0&scope=bot%20applications.commands\n\nFalls etwas nicht geht kannst du gerne dem [Support Server](https://discord.gg/g6GdhJzVGJ) beitreten, das Team hilft dir weiter!\nViel Spaß`)
      .setFooter("Invite für Community Bot")
      .setTimestamp()
      .setColor("GREEN")
new slash.slashCommand(bot)
.setName("invite")
.setDescription("Invite Command")

slash.onExecute(bot, (message) => {
    if(message.content == "invite"){
        message.reply(embed,true)
        } 
    })
/*    if(message.content.startsWith(prefix+"mute")){
        message.delete()
                let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }
                let grund = message.content.split(" ").slice(2).join(" ");
        let user = message.mentions.members.first();
        let user2 = message.author.username
                        let user3 = message.author
            let role = user.guild.roles.cache.find(rl=>rl.name === "muted");
            if(!user) return message.reply("bitte gebe einen User an!")
  if(!role) await  
  user.guild.roles.create({
    data: {
      name: 'muted',
      color: 'GREY',
    }
  })
 
  if(!grund) grund="Nicht genannt"

user.roles.add(role)
let embed = new Discord.MessageEmbed()
.setTitle("Mute")
.setDescription(`${user} du wurdest gemuted!`)
message.channel.send(embed)
   let embede = new Discord.MessageEmbed()
            .setTitle("**Du wurdest gemuted**")
            .setColor("RED")
            .setThumbnail(server.logo)
            .setDescription(`**Hallo ${user}!**\nDu wurdest gerade auf dem Server **${server.name}** gemuted! Mehr Details hier:\n\n🎛️**Server:**\n${server.name}\n\n👮‍♂️**Moderator:**\n${user3}\n\n📰**Grund:**\n${grund}`)
            .setFooter(`Gemuted von ${user2}`)
            .setTimestamp()
            user.send(embede)

    }
    //unmute 
        if(message.content.startsWith(prefix+"unmute")){
        message.delete()
                let server = {
            logo: message.guild.iconURL({dynamic:true}),
            name: message.guild.name
        }
        let user = message.mentions.members.first();
        let user2 = message.author.username
            let role = user.guild.roles.cache.find(rl=>rl.name === "muted");
            if(!user) return message.reply("bitte gebe einen User an!")
user.roles.remove(role)
let embed = new Discord.MessageEmbed()
.setTitle("Entmute")
.setDescription(`${user} wurde entmuted, er kann nun wieder die die Channel schreiben!`)
.setFooter(`Entmuted von ${user2}!`)
message.channel.send(embed)
   let embede = new Discord.MessageEmbed()
            .setTitle("**Du wurdest Entmuted**")
            .setColor("RED")
            .setThumbnail(server.logo)
            .setDescription(`**Hallo ${user}!**\nDu wurdest gerade auf dem Server **${server.name}** Entmuted! Mehr Details hier:\n\n🎛️**Server:**\n${server.name}\n\n👮‍♂️**Moderator:**\n${user3}`)
            .setFooter(`Gemuted von ${user2}`)
            .setTimestamp()
            user.send(embede)
    }

 
//ssp
  if(message.content.toLowerCase().startsWith(prefix+"ssp")){
    message.delete()
    let sspm = message.content.split(" ").slice(1).join(" ");
        let ssp = ["schere", "stein", "papier", "schere", "stein", "papier"]

   if(!["schere","stein","papier"].includes(sspm)) return message.channel.send("Bitte gebe an was du hast: Schere, Stein, Papier")

    let antwort = ssp[Math.floor(Math.random()*ssp.length)]
    if(antwort == "stein" && sspm == "papier")  
    if(antwort == "schere" && sspm == "papier")  
    message.channel.send(`Ich habe ${antwort} und du ${sspm}, der gewinner ist: `)
  }*/
//const ttembed1 = new discord.MessageEmbed() .setTitle('TikTok-Werbung\n') .setDescription('Schaut gerne bei <@723575258514194502> auf TikTok vorbei:\nhttps://vm.tiktok.com/ZMdRkNp57/') .setColor('WHITE') .setFooter('Schreibt dhaslwanter#6614 an, um auch Promoted zu werden.') cron.schedule("0 */18 * * *", async () => { bot.channels.cache.get("856242602987094016").send(ttembed1); }, { timezone: "Europe/Berlin" }); const ttembed2 = new discord.MessageEmbed() .setTitle('TikTok-Werbung\n') .setDescription('Schaut gerne bei <@771120966406766612> auf TikTok vorbei:\nhttps://www.tiktok.com/@dergamer.gmz?lang=de-DE&is_copy_url=1&is_from_webapp=v1') .setColor('WHITE') .setFooter('Schreibt dhaslwanter#6614 an, um auch Promoted zu werden.') cron.schedule("20 */18 * * *", async () => { bot.channels.cache.get("856242602987094016").send(ttembed2); }, { timezone: "Europe/Berlin" }); const ttembed3 = new discord.MessageEmbed() .setTitle('YouTube-Werbung\n') .setDescription('Schaut gerne bei <@795038687980290048> auf YouTube vorbei:\nhttps://youtube.com/channel/UC0VF0jUD3pfqcc4Oy6zPBag') .setColor('WHITE') .setFooter('Schreibt dhaslwanter#6614 an, um auch Promoted zu werden.') cron.schedule("30 */18 * * *", async () => { bot.channels.cache.get("856242602987094016").send(ttembed3); }, { timezone: "Europe/Berlin" }); const ytembed1 = new discord.MessageEmbed() .setTitle('YouTube-Werbung') .setDescription('Schaut gerne bei <@723575258514194502> auf YouTube vorbei: \nhttps://www.youtube.com/channel/UCzZbky0TslGHE62YIm4MKqw') .setColor('WHITE') .setFooter('Schreibt dhaslwanter#6614 an, um auch Promoted zu werden.') cron.schedule("40 */18 * * *", async () => { bot.channels.cache.get("856242602987094016").send(ytembed1); }, { timezone: "Europe/Berlin" }); const ytembed2 = new discord.MessageEmbed() .setTitle('YouTube-Werbung') .setDescription('Schaut gerne bei <@790611800776245298> auf YouTube vorbei: \nhttps://www.youtube.com/channel/UCcfJW7jN6VYFP4bTV5nMwxw') .setColor('WHITE') .setFooter('Schreibt dhaslwanter#6614 an, um auch Promoted zu werden.') cron.schedule("0 */21 * * *", async () => { bot.channels.cache.get("856242602987094016").send(ytembed1); }, { timezone: "Europe/Berlin" }); const dcembed = new discord.MessageEmbed() .setTitle('Server-Werbung') .setDescription('Schaut gerne bei <@805818247811301457> auf seinem Server vorbei: \nhttps://discord.gg/EcUV4ahN') .setColor('WHITE') .setFooter('Schreibt dhaslwanter#6614 an, um auch Promoted zu werden.') cron.schedule("0 */20 * * *", async () => { bot.channels.cache.get("856242602987094016").send(dcembed); }, { timezone: "Europe/Berlin" }); const wbembed1 = new discord.MessageEmbed() .setTitle("Wir suchen dich als Developer, Builder oder Supporter") .addField("Was musst du als Dev können?", "Ein Mindestalter von 13 Jahren (Ausnahmen möglich)\n× Teamfähigkeit und Motivation\n× geistige Reife\n× Erfahrung im Bereich Development\n× Kenntnisse im Umgang mit MySQL\n× Erfahrung mit Java/SpigotAPI") .addField("Was musst du als Builder können?","Ein Mindestens von 13 Jahren (Ausnahmen möglich)\n× Teamfähigkeit und Motivation\n× geistige Reife\n× Minecraft kenntnisse besitzen\n× Sollte in allen Versionen bauen können\n× Sollte mit anderen Buildern gut zusammen arbeiten können\n× Sollte viel Zeit mitbringen") .addField("Was musst du als Supporter können?","Ein Mindestens von 13 Jahren (Ausnahmen möglich)\n× Aktiv sein\n× Freundlich sein\n× Eine gute Rechtschreibung\n× Spaß am Supporten") .addField("Was sind wir eigentlich für ein Server?","Wir sind ein deutscher 1.8 - 1.16 PvP Minigames Server mit Bedwars, KnockFFA, Skyblock und Citybuild. Mehr kommt noch. Er ist noch im aufbau und sollte so in 2 Monaten released werden.\nNatürlich soll unserer Server self made gemacht werden. heißt das wir alles selber bauen und programmieren.Wir haben auch schon eine kleine Community aufgebaut") .setFooter("Falls du Interesse hast schreibe Timpro2871#0001 gerne eine DM") cron.schedule("0 */15 * * *", async () => { bot.channels.cache.get("856242602987094016").send(wbembed1); }, { timezone: "Europe/Berlin" });
/*module.exports = {
  name: 'userinfo',
  description: 'ping command',
  async execute(message, args){
    const discord = require('discord.js')
    const canvas = require('canvas')
    const bot = new discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']})

    if(!args[0]) {
      var user = message.author;
    } else {
      var user = message.mentions.users.first() || bot.users.cache.get(args[0])
    }
    var member = message.guild.member(user)

    const Canvas = canvas.createCanvas(500, 200);
    const ctx = Canvas.getContext('2d')

    const background = await canvas.loadImage('https://cdn.discordapp.com/attachments/846755698666897459/881668345353629746/th.png')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.heighth);


    ctx.strokeRect(0, 0, canvas.width, canvas.heigth);

    ctx.fillStyle = 'WHITE'
    var size1 = 40;
    var size2 = 30;
    var size3 = 30;

    var name = user.tag;
    do {
      ctx.front = `${size1 -= 5}px sans-serif`;
    } while (ctx.measureText(name).whidth > canvas.width - 225);
    ctx.fillText(name, 200, 65)
    
    var created = 'Created: ' + user.createdAt.toLocaleString();
    do {
      ctx.front = `${size2 -= 5}px sans-serif`;
    } while (ctx.measureText(created).whidth > canvas.width - 225);
    ctx.fillText(created, 200, 110)
    var joined = 'Joined: ' + member.joinedAt.toLocaleString();
    do {
      ctx.front = `${size3 -= 5}px sans-serif`;
    } while (ctx.measureText(joined).whidth > canvas.width - 225);
    ctx.fillText(joined, 200, 145)

    ctx.beginPath();
    ctx.arc(100, 100, 75, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();


    const avatar = await canvas.loadImage(user.displayAvatarURL({format: 'jpg'}));
    ctx.drawImage(avatar, 25, 25, 150, 150)

    const final = new discord.MessageAttachment(Canvas.toBuffer(), 'userinfo.png');

    return message.channel.send(final)

  }
}*/