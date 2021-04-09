const discord = require("discord.js")
const os = require('os')
const cpu = os.cpus()
const osConfigurate = os.platform()



module.exports = {
  name: "serverinfo",
  description: "Get Server Info",
  execute(client, message) {

    const infoServ ={ 

      serverOs: '',
      serverName: message.guild.name,
      serverCpu: cpu[0].model,
      guildIcon: message.guild.iconURL,
      serverRegion: message.guild.region
      
    }
    


    if (osConfigurate == 'darwin') {infoServ.serverOs = 'MacOS'} 
    if (osConfigurate == 'win32') {infoServ.serverOs= 'Windows'}
    

    let embed = new discord.MessageEmbed()
    .setAuthor( "Vertage Server Info", client.user.displayAvatarURL() )
    .addField( "Server Name",infoServ.serverName,true )
    .addField( "Server created at",message.guild.createdAt,true )
    .addField( "You joined at",message.guild.joinedAt )
    .addField( "Member count",message.guild.memberCount,true )
    .addField( "Region",infoServ.serverRegion,true )
    .addField( "OS", infoServ.serverOs, true )
    .addField( "Server CPU", infoServ.serverCpu )
    .setThumbnail(infoServ.guildIcon,true)

    message.channel.send(embed);
    console.log(client.user.presence)

  }
};