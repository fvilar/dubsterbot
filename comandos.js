const fetch = require('node-fetch');
const {MessageAttachment} = require('discord.js');

module.exports = {
    comandos:{
        '.meme': {
            nombre:".meme",
            descripcion:"Muestra memes normi aleatorio",
            ejecutar:(comando)=>{
                mostrarMemes(comando.channel,comando.content);
            }
        },
        '.dank': {
            nombre:".dank",
            descripcion:"Muestra memes|gifts|videos mas fuertes",
            ejecutar:(comando)=>{
                mostrarMemes(comando.channel,comando.content);
            }
        },
        '.moderate': {
            nombre:".dank",
            descripcion:"Muestra memes|gifts|videos mas moderados",
            ejecutar:(comando)=>{
                mostrarMemes(comando.channel,comando.content);
            }
        },
        '.light': {
            nombre:".dank",
            descripcion:"Muestra memes|gifts|videos mas sueves",
            ejecutar:(comando)=>{
                mostrarMemes(comando.channel,comando.content);
            }
        },
        '.sbubby': {
            nombre:".dank",
            descripcion:"Muestra memes|gifts|videos normi",
            ejecutar:(comando)=>{
                mostrarMemes(comando.channel,comando.content);
            }
        },
        '.furry': {
            nombre:".dank",
            descripcion:"Muestra memes|gifts|videos normi",
            ejecutar:(comando)=>{
                mostrarMemes(comando.channel,comando.content);
            }
        },
        '.cls': {
            nombre:".cls",
            descripcion:"Limpia todo el chat",
            ejecutar:(comando)=>{
                comando.channel.bulkDelete(100,false)
                    .then(()=>comando.channel.send("mensajes eliminados correctamente"));
            },
          '.pedison': {
                nombre:".pedison",
                descripcion:"Putear a Edison",
                ejecutar:(comando)=>{
                    comando.channel.send("Ptm Edison me tienes hasta la vrg!");
                }
          }
        }
    }
}

/**
 * https://meme-api.glitch.me
 *                           /dank
 *                           /moderate
 *                           /light
 *                           /furry
 *                           /sbubby
 */

async function mostrarMemes(channel,tipo){
    if(channel.name==="memes"){
        if(tipo===".meme"){
            fetch("https://meme-api.herokuapp.com/gimme")
            .then(res=>res.json())
            .then(json=>channel.send(json.title,new MessageAttachment(json.url)))        
            .catch(error=>console.error(error))                        
        }else{
            fetch("https://meme-api.glitch.me/"+tipo.substring(1))
            .then(res=>res.json())
            .then(json=>{
                json.meme.endsWith("mp4")?channel.send(json.meme):channel.send(new MessageAttachment(json.meme))                
                    .catch(error=>{
                        console.error(error);
                        channel.send("Ocurrio un error, intentalo de nuevo en unos segundos :worried:");                    
                    })
            })
            .catch(error=>console.error(error))                        
        }    
    }else{
        channel.send("Si estas intentando pedirme un meme, intentalo de nuevo en el canal de memes, ayuda a mantener el server libre de spam :upside_down:");
    }
}
