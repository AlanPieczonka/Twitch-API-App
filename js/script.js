'use strict';

//Client ID: 2s3o8o681qxk9kf6142w86k0i5x8a7
//stremears: ESL_SC2, nalcs1, pgl

/*const streamers = ['ESL_SC2', 'bobross', 'esportnow', 'syndicate', nalcs1', 'pgl'];
console.log("Streamers: " + streamers[1]);*/

const main = document.getElementsByTagName('main')[0];
console.log(main);

let div__general_offline = '<div class="row"><div class="div__general div__flexbox div__flexbox--center div__flexbox--spacebetween"><span class="span__offline">offline</span><span class="span__name">name</span><img class="img__thumbnail" src="css/img/no-thumbnail.jpg"><i class="ion-arrow-down-b icon"></div></div>';

//online doesn't work because it has display none in ss
$(main).append(mydivv); //that's the key, using jQuery because Vanilla JS is too tricky in this one



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
    console.log(myStream.people[i]); //interesting
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
    functionDom(bobross);
    console.log("bobross")
    return myAsyncFunction('https://api.twitch.tv/kraken/streams/' + myStream.people[1]);
}).then((eslsc2) => {
    console.log(eslsc2)
    functionDom(eslsc2);
    console.log("eslsc2");
}).catch((error) => {
    console.log("catch error: " + error);
});

const icon = document.querySelector('.icon');



//make this function to take 2 parametres, data and name to always display streamer's name;
const functionDom = (data) => {
    
    if(data.stream!==null){
    document.querySelector('.span__name').innerHTML = data.stream.channel.display_name;
    document.querySelector('.img__thumbnail').src = data.stream.channel.video_banner;
    document.querySelector('.span__offline').style.display = "none";
    document.querySelector('.span__online').style.display = "block";
    }
    else{
    
    }
    
}
