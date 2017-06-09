"use strict"

//Client ID: 2s3o8o681qxk9kf6142w86k0i5x8a7
//stremears: ESL_SC2, nalcs1, pgl

/*const streamers = ['ESL_SC2', 'nalcs1', 'pgl'];
console.log("Streamers: " + streamers[1]);*/

class Stream{
    constructor(){
        this.streamers = ['ESL_SC2', 'nalcs1', 'pgl'];
    }
    get people(){
        return this.streamers;
    }
}

var myStream = new Stream();
console.log(myStream.people[0]); //interesting

function myAsyncFunction(url) {
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
let myPromise = myAsyncFunction('https://api.twitch.tv/kraken/streams/nalcs1');
myPromise.then(function(tweets){
    console.log(tweets)
    console.log("BOOOYA");
    return myAsyncFunction('https://api.twitch.tv/kraken/streams/ESL_SC2')
}).then(function(friends){
    console.log(friends)
    console.log("Freindsyyy");
}).catch(function(error){
    console.log("catch error: " + error);
});


