module.exports = {
  name: 'weather',
  description: '???',
  execute(message, args){
    const discord = require('discord.js')
    const weather = require('weather-js')
    const stadt = message.content.split(" ").slice(1).join(" ");
    weather.find({ search: message.content.split(" ").slice(1).join(" "), degreeType: "C" }, function (error, result) {

      if (!stadt) return message.channel.send("Bitte gebe eine Stadt oder ein Dorf an!")

      if (result === undefined || result.length === 0) return message.channel.send("Du hast keinen Ort angegeben.")

      let current = result[0].current
      let location = result[0].location

      const embed = new discord.MessageEmbed()
        .setTitle(`Das Wetter in ${current.observationpoint}`)
        .setDescription(current.skytext)
        .setThumbnail(current.imageUrl)
        .setColor("WITE")
        .setTimestamp()
        .addField("Temperatur: ", current.temperature + "*C", true)
        .addField("Windstärke: ", current.winddisplay, true)
        .addField("Luftfeuchtigkeit: ", `${current.humidity}%`, true)
        .addField("Zeitzone:: ", `UTC${location.timezone}`, true)

      message.channel.send(embed)
    })
  }
}
