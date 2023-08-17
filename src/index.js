require('dotenv').config();
const { loadImage , createCanvas, GlobalFonts} = require('@napi-rs/canvas');
const { Client, IntentsBitField , ChannelType , AttachmentBuilder , Events , EmbedBuilder  } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const { serverId }= require('../config.json');
const config = require('../config.json');
const path = require('path');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);
client.on('ready',async()=>{
client.user.setUsername('AGXY');
GlobalFonts.registerFromPath(path.join(__dirname, '..', 'fonts', 'GONjURING.ttf'), 'conjuring');
GlobalFonts.registerFromPath(path.join(__dirname, '..', 'fonts', 'Blazed.ttf'), 'blazed');
guild =   client.guilds.cache.find((guild)=>guild.id === config.serverId); 


});

client.on(Events.GuildMemberAdd, async (member) => {
 



  const author =  member.user.username;
  
  const canvas = createCanvas(600,600);
  const ctx = canvas.getContext('2d');
  const background = await loadImage('./space.png');
  const radius = canvas.height/2;

  ctx.save();
  
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.clip(); 
  ctx.drawImage(background,0,0,620,620);
  ctx.restore();
 
  
  const distance = canvas.width/4;
  
  ctx.save();
  ctx.beginPath();
  ctx.arc(radius, radius, 80, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.clip(); 
           
 const useravatar =  member.displayAvatarURL({ extension: 'png' });
 const avatarload = await loadImage(useravatar);

 ctx.drawImage(avatarload, radius-100, radius-100, 200, 200);
 ctx.restore();
  ctx.font = "28px blazed";
  var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
  grd.addColorStop(0, "yellow");
  grd.addColorStop(1, "orange");
  ctx.fillStyle = grd;
  ctx.textAlign = "center";
  ctx.fillText(` ${author}`, canvas.width/2 , 450);
  

  const attachment =  new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });
  const channel = await client.channels.cache.get(config.welcomechannel);
  const iconurl = await guild.iconURL();
  const welcomeEmbed = new EmbedBuilder()
	.setColor('#653386')
	.setTitle(`✦✦**Welcome to**✦✦ \n✦✰.｡${guild} \n ▬▬▬▬▬▬▬▬`)
	.setThumbnail(iconurl)
	.addFields(
		{ name: '✰.｡.✵°✵welcome', value: member.user.username },
	)
  .setImage('attachment://profile-image.png')
	.setFooter({ text: `▬▬▬▬▬▬▬▬\n@2023 ${guild}`, iconURL: iconurl });



  await channel.send({ content:`${member.user}`,embeds:[welcomeEmbed] , files:[attachment] });

    
  
});
client.login(process.env.TOKEN);

