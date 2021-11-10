module.exports = {
  name: 'abstimmung',
  description: 'abstimmung command',
  execute(message, args){
    const discord = require('discord.js')
const disbut = require("discord-buttons")
        message.channel.send("||@everyone ||")
   let embed = new discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle(`<:Abstimmung:867840318972231740>Neue Abstimmung<:Abstimmung:867840318972231740>`)
                .setTimestamp()
                .setDescription("__Findet ihr den Server unnötig?__\n\n**<a:YES:879778582870761503>JA<a:YES:879778582870761503>**\n **oder**\n**<a:NO:879778447096959047>NEIN<a:NO:879778447096959047>**\n\n1️⃣ -> <a:YES:879778582870761503>JA\n2️⃣ -> <a:NO:879778447096959047>NEIN\n\n**STIMMT JETZT AB**")
                .setImage("https://cdn.discordapp.com/attachments/841356860832350261/883696258701729802/jaundnein.PNG")
const btn = new disbut.MessageButton()
    .setID("greenButton")
    .setStyle('green')
    .setLabel('Ja')
    .setEmoji('1️⃣')
    const btn2 = new disbut.MessageButton()
    .setID("redButton")
    .setStyle('red')
    .setLabel('Nein')
    .setEmoji('2️⃣')
    let row = new disbut.MessageActionRow()
    .addComponents(btn, btn2)
    message.channel.send(embed, row).then(msg=>{
      const collector = new disbut.ButtonCollector(msg,button=>1,{max:1}, {time:2147483647})
      collector.on('collect', button=>{
        if(button.id == 'greenButton'){
        message.channel.send(` Jemand hat mit <a:YES:879778582870761503>JA abgestimmt!`)
        }
        if(button.id == 'redButton'){
          message.channel.send(`Jemand hat mit <a:NO:879778447096959047>NEIN abgestimmt!`)
        }
        button.reply.defer()
      })
    })  
  }
}
