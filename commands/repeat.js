module.exports = {
  name: 'repeat',
  description: 'repeat command',
  execute(message, args){
    const discord = require('discord.js')
    message.reply("Sage was ich sagen soll, du hast 30 Sekunden oder schreibe `cancel` um abzubrechen!").then(msg=>msg.delete({timeout:"30000"}));


        const filter = m => m.author.id === message.author.id;
        

        message.channel.awaitMessages(filter, {max:1,time:30000}).then(collections=>{
          
            let gesmessage = collections.first().content;
            

            if(gesmessage === "cancel") return message.channel.send("Erfolgreich abgebrochen!").then(msg=>msg.delete({timeout:"5000"}));

            message.channel.send("Du sagtest: "+gesmessage);
        }).catch(err=>{
            if(err) return message.reply("Die zeit ist abgelaufen!").then(msg=>msg.delete({timeout:"5000"}));
        })
  }
    }