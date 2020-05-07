const Discord = require('discord.js');
const client = new Discord.Client();
const tw = require('twilio')(process.env.accountSid,process.env.authToken);
const filter = (reaction,user)=>['▶️','⏸️','⏭️'].includes(reaction.emoji.name)&&(user.id!=client.user.id);


client.on('guildCreate',(guild)=>{
    
    let musica =guild.channels.cache.find(channel=>channel.name=="musica");
    if(musica){                                        
        musica.send("**LISTO PARA ESCUCHAR MUSICA SEMPAII!** \nhttps://tenor.com/view/listening-to-music-dancing-music-notes-enjoying-gif-14460643");                        
    }
    else{
        // CREAR EL CANAL DE MUSICA        
    }
})


client.once('ready', () => {    
    console.log('Ready!');                              
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
            setTimeout(()=>{message.delete();},10000);                       
        }        
        else{
            setTimeout(()=>{message.delete();},300);                       
        }

    }/*
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
    else if(message.content===".console"&&message.channel.name=="musica"){                               
        message.channel.send("**LISTO PARA ESCUCHAR MUSICA SEMPAII!** \nhttps://tenor.com/view/listening-to-music-dancing-music-notes-enjoying-gif-14460643").then(async message=>{                                                                                
        })                                                                                            
    .catch(error=>console.log(error.message))                            
    }
    if(message.content===".cls"){               
        message.channel.messages.fetch()
            .then(collection=>{                                
                collection.map(message=>{
                    message.delete()                        
                        .catch(error=>console.log(error))
                })                   
            })                        
            .catch(error=>console.log(error))    
    }
});

client.login(process.env.token);