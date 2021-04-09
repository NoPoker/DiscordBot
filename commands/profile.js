const Discord = require("discord.js");
let profile = require("../profile.json");
module.exports.run = async (bot,message,args) => {
    let a = message.author
    let embed = new Discord.MessageEmbed()
    .setAuthor("Vertage Statistics", "https://cdn.discordapp.com/avatars/726790345265774673/f06205d8612068386f5926ec3fcccff3.png?size=2048")
    .setColor("RANDOM")
    .addField("Your balance",`${profile[message.author.id].coins}`,true)
    .addField("Warns",`${profile[message.author.id].warns}`,true)
    .addField("LVL",`${profile[message.author.id].lvl}`,true)
    .setFooter("Vertage(US)", "https://cdn.discordapp.com/avatars/726790345265774673/f06205d8612068386f5926ec3fcccff3.png?size=2048")
    
    message.channel.send(embed);
}

module.exports.help = {
    name: 'profile'
}
