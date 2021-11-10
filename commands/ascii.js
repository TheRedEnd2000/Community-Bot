module.exports = {
  name: 'ascii',
  description: 'ascii command',
  execute(message, args){
    const discord = require('discord.js')
    const ascii = require("ascii-art");
            let content = message.content.split(" ").slice(1).join(" ");

        if(!content) return message.reply("Du hast vergessen anzugeben was ich schreiben soll.").then(msg=>msg.delete({timeout:"5000"}));

        ascii.font(content,"Doom",function(err,result){
            if(err){
                return message.channel.send("Error: "+err);
            }
            message.channel.send(result,{ 
                code: "md"
            })
        })
  }
    }