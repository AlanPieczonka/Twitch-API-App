'use strict';

//Client ID: 2s3o8o681qxk9kf6142w86k0i5x8a7
//stremears: ESL_SC2, nalcs1, pgl

/*const streamers = ['ESL_SC2', 'bobross', 'esportnow', 'syndicate', nalcs1', 'pgl'];
console.log("Streamers: " + streamers[1]);*/


/*

let div__general_offline = '<div class="row"><div class="div__general div__flexbox div__flexbox--center div__flexbox--spacebetween"><span class="span__offline">offline</span><span class="span__name">name</span><img class="img__thumbnail" src="css/img/no-thumbnail.jpg"><i class="ion-arrow-down-b icon"></div></div>';

//online doesn't work because it has display none in ss
$(main).append(div__general_offline); //that's the key, using jQuery because Vanilla JS is too tricky in this one

*/


class Stream {
    constructor(){
        this.streamers = ['bobross', 'ESL_SC2', 'twitch', 'nalcs1', 'pgl'];
    }
    get people(){
        return this.streamers;
    }
}

const myStream = new Stream();

for(let i=0; i<5; i++){
    console.log(myStream.people[i]);
}


const myAsyncFunction = (url) => {
  return new Promise((resolve, reject) => { 
    const request = new XMLHttpRequest(); 
    request.open("GET", url, true); 
    request.setRequestHeader('Client-ID', '2s3o8o681qxk9kf6142w86k0i5x8a7');
    request.onload = () => {
        if(request.status == 200){
            resolve(JSON.parse(request.response)); 
        } else{
            reject(request.statusText);
        }
    }
    request.onerror = () => reject(request.statusText); 
    request.send();
  });
}



//https://www.youtube.com/watch?v=yswb4SkDoj0
let myPromise = myAsyncFunction('https://api.twitch.tv/kraken/streams/' + myStream.people[0]);
myPromise.then((bobross) => {
    console.log(bobross);
    functionDom(bobross, "BobRoss");
    console.log("bobross")
    return myAsyncFunction('https://api.twitch.tv/kraken/streams/' + myStream.people[1]);
}).then((eslsc2) => {
    console.log(eslsc2)
    functionDom(eslsc2, "eslc2");
    console.log("eslsc2");
    return myAsyncFunction('https://api.twitch.tv/kraken/streams/' + myStream.people[2]);
}).then((twitch) =>{
    console.log(twitch);
    functionDom(twitch, "twitch");
    console.log("twitch");
}).catch((error) => {
    console.log("catch error: " + error);
});




//make this function to take 2 parametres, data and name to always display streamer's name;
const functionDom = (data, name) => {
    
    const main = document.getElementsByTagName('main')[0];
    const loading__icon = document.getElementsByClassName('loadingicon')[0];
    
    loading__icon.style.display = 'none';
    
    if(data.stream!==null){

        let div__general__online = `<div class="row"><div class="div__general div__flexbox div__flexbox--center div__flexbox--spacebetween"><span class="span__online"><a href="${data.stream.channel.url}" target="_blank">online</a></span><span class="span__name">${name}</span><img class="img__thumbnail" src="${data.stream.channel.video_banner}"><i class="fa fa-expand expandicon" aria-hidden="true"></i></div></div>`
        
        let div__additional__online = `<div class="row"><div class="div__additional"><div class="div__additional__child div__additional__child--game"><i class="fa fa-gamepad div__additional__icon" aria-hidden="true"></i><h1 class="viewers">game</h1><h1 class="viewers">${data.stream.channel.game}</h1></div><div class="div__additional__child div__additional__child--viewers"><i class="fa fa-gamepad div__additional__icon" aria-hidden="true"></i><h1 class="viewers">viewers</h1><h1 class="viewers">${data.stream.viewers}</h1></div><div class="clearfix"></div><div class="div__additional__child div__additional__child--url"><i class="fa fa-external-link div__additional__icon" aria-hidden="true"></i><h1 class="viewers">url</h1><h1 class="viewers">${data.stream.channel.url}</h1></div><div class="div__additional__child div__additional__child--status"><i class="fa fa-comment div__additional__icon" aria-hidden="true"></i><h1 class="viewers">status</h1><h1 class="viewers">${data.stream.channel.status}</h1></div></div>$</div>`
        
        $(main).append(div__general__online);
        $(main).append(div__additional__online);
    }
    else{
        let div__general__offline = `<div class="row"><div class="div__general div__flexbox div__flexbox--center div__flexbox--spacebetween"><span class="span__offline">offline</span><span class="span__name">${name}</span><img class="img__thumbnail" src="css/img/no-thumbnail.jpg"><i class="fa fa-expand expandicon" aria-hidden="true"></i></div></div>`;
        
        let div__additional__offline = `<div class="row"><div class="div__additional div__additional--offline"><h2>no additional info :/</h2></div></div>`;

        
        //online doesn't work because it has display none in ss
        $(main).append(div__general__offline); 
        $(main).append(div__additional__offline); 
        //that's the key, using jQuery because Vanilla JS is too tricky in this one
    }
}


/*
Additional info:
-game (data.stream.channel.game;)
-viewers (data.stream.viewers);
-url (data.stream.channel.url);
-status (data.stream.channel.status);
*/