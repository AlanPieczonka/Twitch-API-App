"use strict"

//Client ID: 2s3o8o681qxk9kf6142w86k0i5x8a7

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


var bodyHTML = document.getElementById('myid');

//https://www.youtube.com/watch?v=yswb4SkDoj0
var promise = myAsyncFunction('https://api.twitch.tv/kraken/streams/loserfruit');
promise.then(function(tweets){
    console.log(tweets)
    console.log("BOOOYA");
});


