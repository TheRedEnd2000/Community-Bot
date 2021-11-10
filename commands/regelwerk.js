module.exports = {
  name: 'regelwerk',
  description: 'regelwerk',
  execute(message, args){
    const discord = require('discord.js')
        let embed = new discord.MessageEmbed()
        .setTitle("Regelwerk")
        .setThumbnail(message.guild.iconURL({dynamic:true}))
        .setDescription(`§ 1 Rechtsverletzendes Verhalten\n\n§ 1.1 Beleidigungen und anstößiges Verhalten
Beleidigungen jeweiliger Art dazu zählt(Provokantes, Sexistisches, Beleidigendes ,Rassistisches, oder Misanthropische (Religion ablehnende)
Äußerungen sind zu unterlassen und dem Team bitte zu melden.\n\n§ 2 Anweisungen von Teammitgliedern\n\n§ 2.1 Den Anweisungen von Teammitglieder ist folge zu leisten, hiermit ausgeschlossen (Unsinnige oder Unbegründete) Anweisungen.\n\n§ 3 Allgemeine Verhaltensbedingungen\n\n(siehe zusätzlich § 1.1)
§ 3.1 Das Springen zwischen Sprech-Kanälen (Channel-Hopping) ist verboten.
§ 3.2 Das Überdramatisieren von Situationen ohne Entschuldigung(Psychischer-Krankheiten, o. ä.) ist zu unterlassen.
§ 3.3 Das Drohen gegenüber Usern oder Teammitglieder in jeglicher Form ist strengstens Verboten !
§ 3.4 Das Benutzen eines Soundboards ist verboten (ausgenommen sind Bots).
§ 3.4¹ Das Benutzen eines Stimmverzerrers ist untersagt!
§ 3.4² Das Aufzeichnen ohne die Zustimmung von Usern in ausgewiesenen Kanälen ist untersagt.
§ 3.5 Das imitieren von allen Personen auf dem Discord(Teammitgliedern & Usern) ist untersagt.
§ 3.6 Das Fremd-Bewerben von Dritten, dass gilt für(Webseiten, Discords o. ä.) ist untersagt.
§ 3.7 Das Irreführen von Personen ist untersagt.
§ 3.8 Das übermäßige Senden von Nachrichten oder Reaktionen ist zu unterlassen.
§ 3.9 Beleidigende oder anstößige Namen sind strengstens Verboten!
§ 3.10 Caps sind untersagt! Jeder der Caps macht bekommt einen Mute von 24h!\n\n§ 4 Das Recht zur Vorbehaltung\n\n§ 4.1 Die Administration behält sich das Recht vor gegebenenfalls Anpassungen am Regelwerk vorzunehmen.
Ausgenommen sind hier große Änderungen, diese werden Angekündigt.\n\nMit dem Betreten von diesem Server werden die Regeln akzeptiert.`)
.setFooter("Serverregeln von "+message.guild.name)
.setTimestamp()
        .setColor("BLACK")
        message.channel.send(embed)
  }
}