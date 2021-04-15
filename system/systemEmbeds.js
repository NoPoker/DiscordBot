
  module.exports = {

        embedErr(name = '', field1 = '', field2 = '', footer, footerImg) {

        if (field1  || field2 || footer || footerImg == undefined || null) {
            return new Error(`You are don't give the parameters`)
        } 
    
        new discord.MessageEmbed()
        .setAuthor(`Vertage ${name}`, `${client.user.displayAvatarURL()}`)
        .addField(`${field1}`,`${field2}`)
        // .addField("WARNING", "I am getting error on using this command")
        .addField("Error:", `${err}`)
        .addField("CONSOLE", "```" + `${console.error}\n` + "```")
        .setFooter(footer, footerImg) // "https://cdn.discordapp.com/avatars/726790345265774673/f06205d8612068386f5926ec3fcccff3.png?size=2048"
    
      },

       embedTitle(name = '', img, field = '') {
        
        if (img || field1  || field2 == undefined || null) {
            return new Error(`You are don't give the parameters`)
        } 

        new discord.MessageEmbed()
        .setAuthor(`Vertage ${name}`, img)       //"https://cdn.discordapp.com/avatars/726790345265774673/951e2b43bbc1b31af443a197d97f5182.png?size=128"
        .setTitle(`${field} ! Welcome to the Vertage Network!`) //member.user.tag

      },

      embedAFKF(author = '', field, field2, color = '', footer, footerImg) {

        if (author || field || field2 || color || footer || footerImg == undefined || null) {
            return new Error(`You are don't give the parameters`)
        } 

        new discord.MessageEmbed()
        .setAuthor(`Vertage ${author}`)
        .addField(field, field2) // "Logs", content
        .setColor(color) // COLOR
        .setFooter(footer, footerImg)// "Vertage(US)", `${client.user.displayAvatarURL()}`


      }

  }