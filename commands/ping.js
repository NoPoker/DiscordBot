const { MessageEmbed } = require("discord.js")
const { COLOR } = require("../config.json");



module.exports = {
  name: "ping",
  description: "Ping",
  execute(client, message, args) {
    
    let deStruct = Date.now() - message.createdTimestamp
    let beStruct
    
    if(deStruct >= 1400) {
        beStruct = 140
    }
    
    if(deStruct >= 1300) {
        beStruct = 130
    }

    if(deStruct >= 1200) {
        beStruct = 120
    }

    if(deStruct >= 1100) {
        beStruct = 110
    }

    if(deStruct >= 1000) {
        beStruct = 100
    }

    if(deStruct <= 900) {
        beStruct = deStruct / 2
    }


    let embed = new MessageEmbed()
    .setColor(COLOR)
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor("Vertage Bot", `${client.user.displayAvatarURL()}`)
    .addField("Ping:", `${beStruct} \`ms`)
    console.log(client.user.presence)
    message.channel.send(embed)
  }
};
