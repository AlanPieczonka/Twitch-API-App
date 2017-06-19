'use strict';

//Client ID: 2s3o8o681qxk9kf6142w86k0i5x8a7
//stremears: ESL_SC2, nalcs1, pgl

/*const streamers = ['ESL_SC2', 'bobross', 'esportnow', 'syndicate', nalcs1', 'pgl'];
console.log("Streamers: " + streamers[1]);*/


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
    functionDom(bobross, "BobRoss", "iconclass0", "additionalclass0", "iconcloseclass0");
    console.log("bobross")
    return myAsyncFunction('https://api.twitch.tv/kraken/streams/' + myStream.people[1]);
}).then((eslsc2) => {
    console.log(eslsc2)
    functionDom(eslsc2, "eslc2", "iconclass1", "additionalclass1", "iconcloseclass1");
    console.log("eslsc2");
    return myAsyncFunction('https://api.twitch.tv/kraken/streams/' + myStream.people[2]);
}).then((twitch) =>{
    console.log(twitch);
    functionDom(twitch, "twitch", "iconclass2", "additionalclass2", "iconcloseclass2");
    console.log("twitch");
}).catch((error) => {
    console.log("catch error: " + error);
});




//make this function to take 2 parametres, data and name to always display streamer's name;
const functionDom = (data, name, iconClass, additionalClass, iconCloseClass) => {
    
    const main = document.getElementById('mainDiv');
    const loadingIcon = document.getElementById('loadingicon');
    
    loadingIcon.style.display = 'none';
    
    if(data.stream!==null){

        let div__general__online = `<div class="div__general div__flexbox div__flexbox--center div__flexbox--spacebetween "><span class="span__online"><a href="${data.stream.channel.url}" target="_blank">online</a></span><span class="span__name">${name}</span><img class="img__thumbnail" src="${data.stream.channel.video_banner}"><i id="testing" class="fa fa-expand expandicon ${iconClass}" aria-hidden="true"></i></div>`
        
        let div__additional__online = `<div class="div__additional ${additionalClass}"><div class="div__additional__child div__additional__child--game position--relative"><i class="fa fa-times-circle-o icon__close--breakpoint ${iconCloseClass}" aria-hidden="true"></i><i class="fa fa-gamepad div__additional__icon" aria-hidden="true"></i><h1 class="additional__title">game</h1><h1 class="additional__info--span">${data.stream.channel.game}</h1></div><div class="div__additional__child div__additional__child--viewers position--relative">                        <i class="fa fa-times-circle-o icon__close ${iconCloseClass}" aria-hidden="true"></i>
<i class="fa fa-gamepad div__additional__icon" aria-hidden="true"></i><h1 class="additional__title">viewers</h1><h1 class="additional__info--span">${data.stream.viewers}</h1></div><div class="clearfix"></div><div class="div__additional__child div__additional__child--url"><a href="${data.stream.channel.url}" target="_blank"><i class="fa fa-external-link div__additional__icon" aria-hidden="true"></i></a><h1 class="additional__title">url</h1><h1 class="additional__info--span">${data.stream.channel.url}</h1></div><div class="div__additional__child div__additional__child--status"><i class="fa fa-comment div__additional__icon" aria-hidden="true"></i><h1 class="additional__title">status</h1><h1 class="additional__info--span">${data.stream.channel.status}</h1></div></div>`
        
        
        $(main).append(div__general__online);
        $(main).append(div__additional__online);
        
        //make the same thing like uniqe class for the expandicon and it should fucking work
        let isClosed= true;
    
       $('.' + iconClass).click(function(){
           if(isClosed){
            $('.' + additionalClass).css('display', 'block');
            isClosed = false;
           }else{
            $('.' + additionalClass).css('display', 'none');
            isClosed = true;
           }
       });
        
       $('.' + iconCloseClass).click(function(){
          $('.' + additionalClass).css('display', 'none'); 
           isClosed = true;
       });
       
        
    }
    else{
        console.log("test");
        
        const div__general__offline = `<div class="div__general div__flexbox div__flexbox--center div__flexbox--spacebetween"><span class="span__offline">offline</span><span class="span__name">${name}</span><img class="img__thumbnail" src="css/img/no-thumbnail.jpg"><i class="fa fa-expand expandicon ${iconClass}" aria-hidden="true"></i></div>`;
        
        const div__additional__offline = `<div class="div__additional div__additional--offline position--relative ${additionalClass}"><i class="fa fa-times-circle-o icon__close--const ${iconCloseClass}" aria-hidden="true"></i><h2>no additional info :/</h2></div>`;

        
        //online doesn't work because it has display none in ss
        $(main).append(div__general__offline); 
        $(main).append(div__additional__offline); 
        //that's the key, using jQuery because Vanilla JS is too tricky in this one
        
       let isClosed= true;
    
       $('.' + iconClass).click(function(){
           if(isClosed){
            $('.' + additionalClass).css('display', 'flex');
            isClosed = false;
           }else{
            $('.' + additionalClass).css('display', 'none');
            isClosed = true;
           }
       });
        
       $('.' + iconCloseClass).click(function(){
          $('.' + additionalClass).css('display', 'none'); 
           isClosed = true;
       });
       
        
    }

}




/*
display:none 
-div__additional
-div__additional--offline


/*
Additional info:
-game (data.stream.channel.game;)
-viewers (data.stream.viewers);
-url (data.stream.channel.url);
-status (data.stream.channel.status);
*/