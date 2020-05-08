const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()
const tw = require('twilio')(process.env.accountSid,process.env.authToken);
const filter = (reaction,user)=>['▶️','⏸️','⏭️'].includes(reaction.emoji.name)&&(user.id!=client.user.id);



const fb = require('fb');
fb.setAccessToken(process.env.fbkey);
                    
var ultimo_meme = {};

async function mostrarMemes(channel){
    let guild = channel.guild;
    let sigue = true;
    fb.api(
        "/417445035653004/posts/?fields=full_picture&limit=20",
        function (response) {
          if (response && !response.error) {            
            response.data.map(async value=>{
                if(sigue&&value&&value.full_picture){
                    if(ultimo_meme[guild]===value.id){
                        sigue = false;
                    }
                    else{
                        await channel.send({
                            files: [{
                                attachment: value.full_picture                                             
                            }]
                        }) 
                    }
                }                         
            });
            ultimo_meme[guild]=response.data[0].id;
            setTimeout(()=>{mostrarMemes(channel)},18000);
          }else{
              console.log(response.error);              
          }
        }
    );
}




/*
FB.api(
  '/me',
  'GET',
  {"fields":"posts.limit(20){message,attachments.limit(1){target,subattachments,type,media,unshimmed_url}}"},
  function(response) {
      // Insert your code here
  }
);

*/





client.on('guildCreate',(guild)=>{
    
    let musica =guild.channels.cache.find(channel=>channel.name=="musica");
    let memes =guild.channels.cache.find(channel=>channel.name=="memes");
    let parent = guild.channels.cache.find(channel=>channel.name=="general").parent;
    if(!musica){                                        
        guild.channels.create("musica",{type:"text",parent:parent,position:1})
            .then(channel=>channel.send("**LISTO PARA ESCUCHAR MUSICA SEMPAII!** \nhttps://tenor.com/view/listening-to-music-dancing-music-notes-enjoying-gif-14460643"));
    }
    else{
        musica.send("**LISTO PARA ESCUCHAR MUSICA SEMPAII!** \nhttps://tenor.com/view/listening-to-music-dancing-music-notes-enjoying-gif-14460643");                        
    }
    if(!memes){
        guild.channels.create("memes",{type:"text",parent:parent,position:2})
            .then(channel=>mostrarMemes(channel));                     
    }    
    else{
        mostrarMemes(memes);
    }    

})


client.once('ready', () => {    
    console.log('Ready!');   

    client.guilds.cache.map(guild=>{
         memes = guild.channels.cache.find(channel=>channel.name=="memes");
         if(memes)
            mostrarMemes(memes);
    });
});

client.on('message',(message)=>{        
//////   CONTROL DEL CANAL DE MUSICA    ///////////////////////////////////////////////////////////////////////////    
    if(message.channel.name=="musica"){                
        if(!message.author.bot){           
            setTimeout(()=>{message.delete();},300);                                                       
        }        
        else if(message.author!=client.user){ // Los mensajes de los bots desaparecen en 30 segundos
            setTimeout(()=>{message.delete();},30000);
        }
    }               
    else if(message.content.startsWith("-")){ // NO SE PERMITE ESCRIBIR '-comando' en otros canales de texto que no sea el de musica        
        let ms = new Discord.MessageEmbed({
            title:"**"+message.author.username+"** usa los comandos de musica solo en el `CANAL DE MUSICA` onegaishimasu",
            color:'#ff0000'                  
        })
        ms.setImage("https://i.imgur.com/4bn36.jpg");
        setTimeout(()=>{message.delete();},300);                       
        message.channel.send(ms);
    }
    else if(message.author.bot){
        if(message.author==client.user){
            if(message.channel.name!="memes"){
                setTimeout(()=>{message.delete();},10000);                       
            }           
        }        
        else{
            setTimeout(()=>{message.delete();},300);                       
        }

    }
    else if(!message.author.bot){

    }
    /*
    else if(!message.author.bot&&message.content.startsWith(".")){
     message.channel.send("enviando mensaje...");
     let mensaje = message.content;     
     tw.messages.create({
         from: '+12057369682',
         body: mensaje.substr(15),
         to: mensaje.substr(1,13)
       })
      .then(message => console.log(message.sid));
    }
    */
    

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
   /* else if(message.content===".console"&&message.channel.name=="musica"){                               
        message.channel.send("**LISTO PARA ESCUCHAR MUSICA SEMPAII!** \nhttps://tenor.com/view/listening-to-music-dancing-music-notes-enjoying-gif-14460643").then(async message=>{                                                                                
        })                                                                                            
    .catch(error=>console.log(error.message))                            
    }
    */
    
    if(message.content===".cls"){       
        message.channel.bulkDelete(100,false)
            .then(()=>message.channel.send("mensajes eliminados correctamente"));
        /*                
        message.channel.messages.fetch()
            .then(async collection=>{                                
                 await collection.map(async message=>{
                     if(message){
                      await message.delete()                        
                        .catch(error=>console.log(error))
                    }
                })                   
            })
            .then(canCls=true)                        
            .catch(error=>{console.log(error);canCls=true;})    */
    }
});

client.login(process.env.token);
