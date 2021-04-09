const Discord = require("discord.js");
const os = require('os')
const cpu = os.cpus()

module.exports = {
  name: "userinfo",
  execute (client, message, args) {
    
    let inline = true
    let resence = true
    const status = {
        online: "Online",
        idle: "Idle",
        dnd: "Do not distrub",
        offline: "Offline"
      }
    
        
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
let target = message.mentions.users.first() || message.author
const osConfigurate = os.platform()
let osSend

if (member.user.bot === true) {
    bot = " Yes";
  } else {
    bot = " Not";
  }
  if (osConfigurate == 'darwin') {osSend = 'MacOS'} 
  if (osConfigurate == 'win32') {osSend = 'Windows'}
            let embed = new Discord.MessageEmbed()
                .setAuthor("Vertage User INFO", `${client.user.displayAvatarURL()}`)
                //.setAuthor(target.displayAvatarURL)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor('WHITE')
                .addField("Name", `${member.user.tag}`, inline)
                .addField("ID", member.user.id, inline)
                .addField("OS", `${osSend}`, true)
                .addField("Bot?", `${bot}`,inline, true)
                .addField("Status", `${status[member.user.presence.status]}`, inline, true)
                .addField("Playing", `${member.user.presence.game ? `:video_game: ${member.user.presence.game.name}` : "Does not play"}`,inline, true)
                .addField("Join the discord", member.user.createdAt)
      
                .setFooter(`Vertage Information: ${member.user.username}`)
              
              
              
            message.channel.send(embed);

            message.delete();
    }
  }


