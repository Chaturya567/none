const fs = require('fs');
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const { default_prefix, token } = require('./config.json');
const db = require('quick.db')

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);
});

client.on('message', async (message) => {
        
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);
    
    if (prefixes == null) {
        prefix = "AB"
    } else {
        prefix = prefixes;
    }
    
		if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
});

client.on('guildMemberAdd', member => {
        
  let chx = db.get(`welchannel_${member.guild.id}`); 
  
    let msg = db.get(`wlcmsg_${member.guild.id}`)
    
  if(chx === null) { 
    return;
  }
  
  let wembed = new Discord.MessageEmbed() 
  .setAuthor(member.user.username, member.user.avatarURL())
  .setColor("#ff2050")
  .setDescription(`${msg}`);
  
        client.channels.cache.get(chx).send(wembed) 
}); 

client.login(token);