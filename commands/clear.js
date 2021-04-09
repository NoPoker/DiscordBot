const { MessageEmbed } = require("discord.js")
const { COLOR } = require("../config.json");



module.exports = {
  name: "clear",
  description: "Clear",
  execute(client, message, args) {
    
    const amount = args.join(" ");

    if(!amount) return message.reply('please provide an amount of messages for me to delete')

    if(amount > 100) return message.reply(`you cannot clear more than 100 messages at once`)

    if(amount < 1) return message.reply(`you need to delete at least one message`)

        message.channel.messages.fetch({limit: amount}).then(messages => {
        message.channel.bulkDelete(messages
)});


    let embed = new MessageEmbed()
    .setColor(COLOR)
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor("Vertage Bot", `${client.user.displayAvatarURL()}`)
    .addField("State:", 'Success!')
    console.log(client.user.presence)
    message.channel.send(embed)
  }
};
