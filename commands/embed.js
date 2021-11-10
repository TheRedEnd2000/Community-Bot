module.exports = {
  name: 'buttont',
  description: 'love command',
  execute(message, args){
    const discord = require('discord.js')
const disbut = require("discord-buttons")
        let title = message.content.split(" ").slice(1, 2).join(" ");
        let description = message.content.split(" ").slice(2).join(" ");
        let user = message.author.username
        if(!title) return message.channel.send("Bitte mache `embed [Title] [Description]`")
        let embed = new discord.MessageEmbed()
        .setTitle(`${title}`)
        .setDescription(`${description}`)
        .setFooter(`Embed von ${user}`)
        .setTimestamp()
        let embed2 = new discord.MessageEmbed()
        .setTitle(`${title}`)
        .setDescription(`${description}`)
        .setFooter(`Embed von ${user}`)
        .setColor("GREEN")
        .setTimestamp()
        let embed3 = new discord.MessageEmbed()
        .setTitle(`${title}`)
        .setDescription(`${description}`)
        .setFooter(`Embed von ${user}`)
        .setColor("RED")
        .setTimestamp()
        let embed4 = new discord.MessageEmbed()
        .setTitle(`${title}`)
        .setDescription(`${description}`)
        .setFooter(`Embed von ${user}`)
        .setColor("BLUE")
        .setTimestamp()
        let embed5 = new discord.MessageEmbed()
        .setTitle(`${title}`)
        .setDescription(`${description}`)
        .setFooter(`Embed von ${user}`)
        .setColor("YELLOW")
        .setTimestamp()
const btn = new disbut.MessageButton()
    .setID("greenButton")
    .setStyle('grey')
    .setLabel('Grün')
    .setEmoji('🟢')
    const btn2 = new disbut.MessageButton()
    .setID("redButton")
    .setStyle('grey')
    .setLabel('Rot')
    .setEmoji('🔴')
     const btn3 = new disbut.MessageButton()
    .setID("blueButton")
    .setStyle('grey')
    .setLabel('Blau')
    .setEmoji('🔵')
     const btn4 = new disbut.MessageButton()
    .setID("yellowButton")
    .setStyle('grey')
    .setLabel('Gelb')
    .setEmoji('🟡')
    let row = new disbut.MessageActionRow()
    .addComponents(btn, btn2, btn3,btn4)
    message.channel.send(embed, row).then(msg=>{
      const collector = new disbut.ButtonCollector(msg,button=>1+1==2, {time:2147483647})
      collector.on('collect', button=>{
        if(button.id == 'greenButton'){

          msg.edit(embed2)
        }
        if(button.id == 'redButton'){
          msg.edit(embed3)
        }
        if(button.id == 'blueButton'){
          msg.edit(embed4)
        }
        if(button.id == 'yellowButton'){
          msg.edit(embed5)
        }
        button.reply.defer()
      })
    })    
    }
}
