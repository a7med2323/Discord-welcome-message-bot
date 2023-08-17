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
console.log(client.guilds.cache.find((guild)=>guild.id === config.serverId))
guild =  client.guilds.cache.find((guild)=>guild.id === config.serverId);
//guild.emojis.create({attachment:`${path.join(__dirname,'..','amongus.gif')}`,name:'amongus'}).then(emoji=>console.log('created new emoji')).catch(console.error);
//console.log(path.join(__dirname, '..', 'fonts', 'GONjURING.ttf'))
});

client.on(Events.GuildMemberAdd, async (member) => {
 
console.log(member);

  
  const author =  member.user.username;
  
  const canvas = createCanvas(600,600);
  const ctx = canvas.getContext('2d');
  const background = await loadImage('./space.png');
  const radius = canvas.height/2;

  ctx.save();
  //ctx.translate(radius,radius);
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.clip(); 
  ctx.drawImage(background,0,0,620,620);
  ctx.restore();
 
  //const spaceship = await canva.loadImage('./spaceship.png');
  const distance = canvas.width/4;
  //ctx.drawImage(spaceship, canvas.width/4 , canvas.width/2.15, canvas.width/2 , canvas.height/2);
  ctx.save();
  ctx.beginPath();
  ctx.arc(radius, radius, 80, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.clip(); 
           //ctx.fillStyle = "red";
          //ctx.fillRect(0, 0, 150, 100);
              //const background = await canva.loadImage('./wallpaper.png');
 const useravatar =  member.displayAvatarURL({ extension: 'png' });
 const avatarload = await loadImage(useravatar);
 //const avatarload = await canva.loadImage('./wallpaper.png');
             //const backtopng = await background.encode('png');
 ctx.drawImage(avatarload, radius-100, radius-100, 200, 200);
 ctx.restore();
  ctx.font = "28px blazed";
  var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
  grd.addColorStop(0, "yellow");
  grd.addColorStop(1, "orange");
  ctx.fillStyle = grd;
  ctx.textAlign = "center";
  ctx.fillText(` ${author}`, canvas.width/2 , 450);
  /*
  ctx.fillStyle = "#D5A446";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "90px Comic Sans MS";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(`welcome ${author}`, canvas.width/2, canvas.height/2);
   //ctx.rect(100, 500, 500, 120);
   ctx.save();
   ctx.beginPath();
   ctx.arc(109, 109, 100, 0, 2 * Math.PI);
   ctx.stroke();
   ctx.clip(); 
//ctx.fillStyle = "red";
//ctx.fillRect(0, 0, 150, 100);
  //const background = await canva.loadImage('./wallpaper.png');
  const background = await message.author.displayAvatarURL({ extension: 'png' });
  const backgroundload = await canva.loadImage(background);
    //const backtopng = await background.encode('png');
  ctx.drawImage(backgroundload, 9, 9, 200, 200);
  ctx.restore();*/
  //canvas.toBuffer()
  
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
	.setFooter({ text: '▬▬▬▬▬▬▬▬\n@2023 AGXY STORE', iconURL: iconurl });



  await channel.send({ content:`${member.user}`,embeds:[welcomeEmbed] , files:[attachment] });

    
  
});
client.login(process.env.TOKEN);

