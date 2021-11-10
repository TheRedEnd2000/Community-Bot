module.exports = {
  name: 'ban',
  description: 'ban command',
  execute(message, args){
    const discord = require('discord.js')
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

        message.guild.member(user).ban().catch(err=>{
            if(err) return message.channel.send("Konnte den Nutzer nicht kicken: "+err)})
            
            
             message.guild.member(user).ban()
                        let embed = new Discord.MessageEmbed()
            .setTitle("Neuer Ban!")
            .setThumbnail(server.logo)
            .setColor("RED")
            .setDescription(`${user} wurde von ${user3} gebannt!\nGrund: ${grund}`)
            .setTimestamp()
            message.channel.send(embed)
                         let embede = new Discord.MessageEmbed()
            .setTitle("**Du wurdest gebannt**")
            .setColor("RED")
            .setThumbnail(server.logo)
            .setDescription(`**Hallo ${user}!**\nDu wurdest gerade von **${server.name}** gebannt! Mehr Details hier:\n\n🎛️**Server:**\n${server.name}\n\n👮‍♂️**Moderator:**\n${user3}\n\n📰**Grund:**\n${grund}`)
            .setFooter(`Gebannt von ${user2}`)
            .setTimestamp()
            user.send(embede)
  }
    }