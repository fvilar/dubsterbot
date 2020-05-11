const Discord = require('discord.js');
require('dotenv').config()
const {comandos} = require('./comandos.js');

const client = new Discord.Client();


client.login(process.env.token)    
const tw = require('twilio')(process.env.accountSid,process.env.authToken);



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
        //    .then(channel=>mostrarMemes(channel,"dank"));                     
    }    
    else{
        //mostrarMemes(memes,"dank");
    }    

})

client.once('ready', () => {        
    console.log('Ready!');            
    client.guilds.cache.map(guild=>{
        memes = guild.channels.cache.find(channel=>channel.name=="memes");               

        })            
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
        
    let mensajeText = message.content;
    if(mensajeText.startsWith('.')){        
        comandos[mensajeText]?comandos[mensajeText].ejecutar(message):message.channel.send("Ese comando no existe :confused:");
    }


});