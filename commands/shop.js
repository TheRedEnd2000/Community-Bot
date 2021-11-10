module.exports = {
  name: 'shop',
  description: 'shop command',
  execute(message, args){
    const discord = require('discord.js')
let embed = new discord.MessageEmbed()
                    .setTitle(":shopping_bags:Shop:shopping_bags:")
                    .addField("Coin Master: ", "500 Coins")
                    .addField("Coin Master 2: ", "2000 Coins")
                    .addField("Coin Master 3: ", "3000 Coins")
                    .addField("Coin Master 4: ", "4000 Coins")
                    .addField("Coin Master 5: ", "5000 Coins")
                    .addField("Coin Suchti: ", "100000 Coins")
                    .setTimestamp()
                    .setColor("RANDOM")
                    
                    message.channel.send(embed)
  }
    }