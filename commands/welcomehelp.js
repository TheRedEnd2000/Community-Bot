module.exports = {
  name: 'welcomehelp',
  description: 'help command for welcome and leave',
  execute(message, args){
    const discord = require('discord.js')
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Du hast keine Rechte dafür!");
            let embed = new discord.MessageEmbed()
        .setTitle("<a:welcome:869273549280522270>Welcome/Leave Hilfe<a:welcome:869273549280522270>")
        .setColor("RANDOM")
        .setTimestamp()
        .addField("`setwelcomechannel`", "Lege den Willkommenschannel fest!")
        .addField("`resetwelcomechannel`", "Lege den Welcomechannel zurück!")
        .addField("`setleavechannel`", "Lege den Leaveschannel fest!")
        .addField("`resetleavechannel`", "Lege den Leavechannel zurück!")
        .addField("`resetwelcomerole`(PREMIUM)", "Setzte die Willkommens Rolle zurück!")
        .addField("`setwelcomerole`(PREMIUM)", "Lege die Welcome Rolle fest!")
        message.channel.send(embed)
  }
}