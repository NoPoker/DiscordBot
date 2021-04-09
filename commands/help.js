const { MessageEmbed } = require("discord.js")
const { readdirSync } = require("fs")
const { COLOR } = require("../config.json");
module.exports = {
  name: "help",
  description: "Get all commands name and description",
  execute (client, message, args) {
    
    
let embed = new MessageEmbed()
.setThumbnail(client.user.displayAvatarURL())
.setAuthor("Vertage Bot Commands", "https://cdn.discordapp.com/avatars/726790345265774673/f06205d8612068386f5926ec3fcccff3.png?size=2048")
.addField("Admin commands","Ban | Kick | Clear | Warn/UnWarn | Mute/Unmute")
.addField("Information", "Userinfo | Serverinfo | Version",true)
.addField("More", "Profile | Bonus | Support | InviteBot | Ticket",true)
.addField("Music","play | stop | jump | pause")
.setColor(COLOR)
.setFooter("Vertage(US)", `${client.user.displayAvatarURL()}`)

// .setDescription(`These are the command ${client.user.username} Bot, INVITE ME - LINK`)
// let command = readdirSync("./commands")    

// let i;
//     for(i = 0; i < command.length; i++) {
//       console.log(command[i])
      
//       const cmd = client.commands.get(command[i].replace(".js", ""))
//       embed.addField(`**${cmd.name}**`, cmd.description, true)
      
//     }

    message.channel.send(embed);
    
  }
}