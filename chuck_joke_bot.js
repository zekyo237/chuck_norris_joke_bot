const Discord = require("discord.js");
const axios = require("axios");
const client = new Discord.Client();
const {TOKEN} = require("./config")

let prefix ="%";

client.on("ready",()=>{
    console.log(" c est bon le bot de chuck norris joke a bien été lancé");

});

client.on("message",message =>{
    if(message.content=="help")message.channel.send("%joke: pour avoir une blage \n %joke[id]: pour avoir une blague en fonction de son id \n %jokeCategories:affiche les categories \n %joke[categorie]:affiche une blague en fonction de sa categorie");
    if(!message.content.startsWith(prefix)|| message.author.bot) return;

    if(message.content == (prefix + 'joke')) 
    {
         axios.get("http://api.icndb.com/jokes/random")
            .then(response => {
                
                let tampon= response.data.value.joke
                if(tampon !=  undefined)  message.channel.send(tampon)
               
                
            }
            
            )
            .catch(error => console.log(error))
    }
    if(message.content == (prefix + 'jokeCount'))
    {
        axios.get("http://api.icndb.com/jokes/count")
            .then(response =>
                {
                let longueur;
                longueur =response.data.value;
                if(longueur != undefined) message.channel.send(longueur)
                })
            .catch(error => console.log(error))
    }
    if(message.content == (prefix + 'jokeCategories'))
    {
        axios.get("http://api.icndb.com/categories")
            .then(response =>
                {
                let categorie;
                categorie =response.data.value;
                if(categorie != undefined) message.channel.send(categorie)
                })
            .catch(error => console.log(error))
    }
    if(message.content.match(new RegExp(prefix + 'joke\[[0-9]*\]')))
    {
        let regexp = /\[(.*?)\]/g;
        let toto = regexp.exec(message.content);
        if((toto[1]>0)&&(toto[1]<=574))
        {
        axios.get("http://api.icndb.com/jokes/"+toto[1])
            .then(response =>
                {
                let joke;
                joke =response.data.value.joke;
                if(joke != undefined) message.channel.send(joke)
                })
            .catch(error => console.log(error))
            }
        
    }
    if(message.content.match( new RegExp(prefix +'joke\[[a-z]{5,9}\]')))
    {
        let regexp = /\[(.*?)\]/g;
        let tampon = regexp.exec(message.content);
        if((tampon[1]=="explicit")||(tampon[1]=="nerdy"))
        {
        axios.get("http://api.icndb.com/jokes/random?limitTo=["+tampon[1]+"]")
            .then(response =>
                {
                let joke;
                joke =response.data.value.joke;
                if(joke != undefined) message.channel.send(joke)
                })
            .catch(error => console.log(error))
        }
        else message.channel.send("% :commande de base \n veuillez saisir %jokeCategories afin de voir les categories disponible")
        
    }
    if(message.content.match( new RegExp(prefix +'prefix\[[^~,]\]')))
    {
        let regexp = /\[(.*?)\]/g;
        let tampon = regexp.exec(message.content);
        prefix = tampon[1]
        
    }
    if(message.content==prefix + "ping")
    {
        const axios = require('axios').default;


        axios.interceptors.request.use( x => {
        x.meta = x.meta || {}
        x.meta.requestStartedAt = new Date().getTime();
        return x;
                                            })

        axios.interceptors.response.use( x => {
        message.channel.send(`votre latence est de : ${ new Date().getTime() - x.config.meta.requestStartedAt} ms`)
        return x;
    },
    //
    x => {
        console.error(`Erreur survenue sur cet url: ${x.config.url} - ${new Date().getTime() - x.config.meta.requestStartedAt} ms`)
        throw x;})


        const run  = async () => {
        await axios.get('http://api.icndb.com/jokes')}

        run()
    }
    
    if(message.content.startsWith(prefix + 'chien')) message.channel.send('meurs saloperie');

});

client.login(TOKEN);

