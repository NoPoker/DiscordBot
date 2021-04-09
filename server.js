
/**
 * @description Librares
 */
const discord = require('discord.js')
const client = new discord.Client({ disableEveryone: true, disabledEvents: ['TYPING_START'], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require('fs');
const Canvas = require('canvas');
const { readdirSync } = require('fs');
const { join } = require('path');
const path = require('path')
const filePath = path.join('./commands/', 'info', 'info.txt')


/**
 * @description for a logs file
 */
fs.writeFile(filePath , 'Messages:\n', err => {
  if (err) {
    throw err
  }
})

fs.readdir('./commands/',(err,files)=>{

  if(err) console.log(err);


  let jsfiles = files.filter(f => f.split(".").pop() === 'js');
  
  if(jsfiles.length <=0) console.log('Нет комманд для загрузки!');
  
  console.log(`Загружено ${jsfiles.length} комманд`);
  
  jsfiles.forEach((f,i) =>{
      // let props = require(`./commands/${f}`);
      console.log(`${i+1}.${f} Загружен!`);
      // client.commands.set(props.help.name,props);
  });
});

const { TOKEN, PREFIX } = require("./config.json")
let profile = require('./profile.json');


/**
 * @name Cient(Ready)
 * @description if client 'ready' return this:
 */
client.on('ready', () => {

  console.log(`Запустился бот ${client.user.username}`);
  client.generateInvite(["ADMINISTRATOR"]).then(link =>{
      console.log(link);
  })
});

client.on('ready', () => {
  let status = ['Vertage US Network','Vertage US Network | #help']
  let status_res = Math.floor(Math.random() * status.length)
 client.user.setActivity(status[status_res], {type: "PLAYING",url:'https://www.twitch.tv/NotPoker',}, 1)
})

client.on("warn", info => {
  console.log(info)
});

client.on("error", console.error)


/**
 * @description  definiting
 */
client.commands = new discord.Collection()
client.prefix = PREFIX
client.queue = new Map();
client.vote = new Map();

/**
 * @description  LOAD ALL FILES
 */
const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for (const file of cmdFiles) {
  const command = require(join(__dirname, "commands", file))
  client.commands.set(command.name, command)
} //LOADING DONE


/**
 * @name guildCreate
 * @description will be creating a bot('vertage') chennel when his undefined or null
 */
client.on('guildCreate', guild => {
  const channel = guild.channels.find("name","vertage")
  if (channel == undefined || channel == null) {
      guild.createChannel("vertage")
  }
})


/**
 * @name Messgae
 * @description if someone message
 */
client.on("message", message => {

  if (message.author.bot) return;
  if (!message.guild) return;

  const Discord = require("discord.js")

  let uid = message.author.id;
  const forInfoFile = message.author.tag;


  /**
   * @description for a logs(writting on the file(Logs.txt) this messge)
   */
  fs.appendFile(filePath ,"      — " + forInfoFile + ": " + `${message.content}\n`, err => {
    if (err) {
      throw err
    }
  })

/**
 * @description give coins,xp,lvl,warns for profile.json
 */
  client.send = function (msg) {
    message.channel.send(msg);
  };
  let uid2 = profile[uid];
  if (!uid2) {
    uid2 = {
      coins: 10,
      warns: 0,
      xp: 0,
      lvl: 1,
    };
  };


  uid2.coins++;
  uid2.xp++;

  if (uid2.xp >= (uid2.lvl * 5)) {
    uid2.xp = 0;
    uid2.lvl += 1;
  };


  fs.writeFile('./profile.json', JSON.stringify(profile), err => {
    if (err) console.log(err);
  });

  /**
   * @description IF MESSSAGE STARTS WITH MINE BOT PREFIX
   */
  if (message.content.startsWith(PREFIX)) {

    const args = message.content.slice(PREFIX.length).trim().split(/ +/) //removing prefix from args
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
      return
    }

    try { //TRY TO GET COMMAND AND EXECUTE
      client.commands.get(command).execute(client, message, args)
      //COMMAND LOGS
      console.log(`${message.guild.name}: ${message.author.tag} Used ${client.commands.get(command).name} in #${message.channel.name}`)
    } catch (err) { //IF IT CATCH ERROR
      console.log(err)
      let embed = new Discord.MessageEmbed()
        .setAuthor("Vertage Bot Commands", `${client.user.displayAvatarURL()}`)
        .addField("WARNING", "I am getting error on using this command")
        .addField("Error:", `${err}`)
        .addField("CONSOLE", "```" + `${console.error}\n` + "```")
        .setFooter("Vertage(US)", "https://cdn.discordapp.com/avatars/726790345265774673/f06205d8612068386f5926ec3fcccff3.png?size=2048")
      message.reply(embed)
    }

  }


});



/**
 * @name Canvas
 * @description creating new canvas for create new img with a
 */
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 50;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

client.on('guildMemberAdd', async member => {
  const Discord = require('discord.js');
	const channel = member.guild.channels.cache.find(ch => ch.id === '730056753873551431') // yor channel ID
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the Vertage Network,', canvas.width / 3.0, canvas.height / 2.8);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}`, canvas.width / 2.0, canvas.height / 1.5);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

  let newGM = new Discord.MessageEmbed()
  .setAuthor("Vertage", "https://cdn.discordapp.com/avatars/726790345265774673/951e2b43bbc1b31af443a197d97f5182.png?size=128")
  .setTitle(`Hey, ${member.user.tag} ! Welcome to the Vertage Network!`)
  channel.send(newGM)
	channel.send(attachment);
});

/**
 * @description DETECT VERIFICATION
 */
client.on('messageReactionAdd', async (reaction, user) => {

  if(reaction.message.partial) await reaction.message.fetch()
  if(reaction.partial) await reaction.fetch()
  if(user.bot) return

  if(reaction.message.channel.id === "748531369377923094"){
    if(reaction.emoji.name === '🇺🇸'){
      await reaction.message.guild.members.cache.get(user.id).roles.add("748532612229890059")
      await reaction.message.guild.members.cache.get(user.id).roles.remove("748532687416852530")
    }
    if(reaction.emoji.name === "🇷🇺") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("748532687416852530")
      await reaction.message.guild.members.cache.get(user.id).roles.remove("748532612229890059")
    }
  }

});

client.on('messageReactionRemove', async (reaction, user) => {
  if(reaction.message.partial) await reaction.message.fetch()
  if(reaction.partial) await reaction.fetch()
  if(user.bot) return

  if(reaction.message.channel.id === "748531369377923094"){
    if(reaction.emoji.name === '🇺🇸') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("748532612229890059")

    } 
    if(reaction.emoji.name === "🇷🇺"){
      await reaction.message.guild.members.cache.get(user.id).roles.remove("748532687416852530")

    }

  }

})

client.login(TOKEN)