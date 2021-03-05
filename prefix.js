const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const { default_prefix } = require('./config.json');

module.exports = {
    name: 'setprefix',
    description: 'Set Prefix For General Commands',
    aliases: ['setgprefix'],
    cooldown: 10,
    usage: 'setprefix <prefix less than 4 words>',
    category: 'Guild Mangment',
    run: async (client, message, args) => {
        
        let error = new MessageEmbed()
        .setDescription(`You Don\'t Have Permissions To Change Prefix For General Commands Of Bot In This Server!`)
        
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send(error)
        }
        
        let error1 = new MessageEmbed()
        .setDescription(`Please Give The New Prefix To Set!`)
        
        if(!args[0]) {
      return message.channel.send(error1)
    }
        
        let extra = new MessageEmbed()
        .setDescription(`Prefix Shouldn\'t Contain Space In Between!`)
        
        if(args[1]) {
      return message.channel.send(extra)
    }
        
        let morethan = new MessageEmbed()
        .setDescription(`Pls Set Prefix Not More Than 4 Charecters`)
        
        if(args[0].length > 4) {
      return message.channel.send(morethan)
    }
    
    if(args.join("") === default_prefix) {
      db.delete(`prefix_${message.guild.id}`)
     return await message.channel.send("Reseted Prefix ✅")
    }
    
    let success = new MessageEmbed()
    .setColor('#39FF14')
    .setTitle(`Set Prefix`)
    .setDescription(`**${message.author.username}** Has Set The Guild Prefix Of Bot For General Commands To **\`${args[0]}\`** Successfully :tada:`)
    
    db.set(`prefix_${message.guild.id}`, args[0])
  await message.channel.send(success)
        
    }
}