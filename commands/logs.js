const { MessageEmbed } = require("discord.js")
const { readdirSync } = require("fs")
const { COLOR } = require("../config.json")
const path = require('path')
const filePath = path.join(__dirname, 'info', 'info.txt')
const fs = require('fs')
module.exports = {
  name: "logs",
  execute (client, message, args) {

fs.readFile(filePath, 'utf-8' , (err,content) => {
    if (err) {
        throw err
    }

    let embed = new MessageEmbed()

.setAuthor("Vertage Logs")
.addField("Logs:", content)
.setColor(COLOR)
.setFooter("Vertage(US)", `${client.user.displayAvatarURL()}`)
    message.channel.send(embed);
})
    
  }
}