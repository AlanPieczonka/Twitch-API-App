'use strict';

const main = document.getElementById('main__div');
const loadingIcon = document.getElementById('loadingicon');

class StreamPeople{
    constructor(){
        this.streamers = ['bobross', 'ESL_SC2', 'twitch', 'nalcs1', 'pgl'];
    }
    get people(){
        return this.streamers;
    }
}

class Stream{
    constructor(data,name,iconClass, additionalClass, iconCloseClass){
        this.data = data;
        this.name = name;
        this.iconClass = iconClass;
        this.additionalClass = additionalClass;
        this.iconCloseClass = iconCloseClass;
    }
    
    buttonOnline(){
       let isClosed= true;
       const additionalClassPlaceholder = this.additionalClass;
        
       $('.' + this.iconClass).click(function(){
           if(isClosed){
            $('.' + additionalClassPlaceholder).css('display', 'block');
            isClosed = false;
           }else{
            $('.' + additionalClassPlaceholder).css('display', 'none');
            isClosed = true;
           }
       });
        
       $('.' + this.iconCloseClass).click(function(){
          $('.' + additionalClassPlaceholder).css('display', 'none'); 
           isClosed = true;
       }); 
    }
    
    buttonOffline(){
        
       let isClosed= true;
       const additionalClassPlaceholder = this.additionalClass;

       $('.' + this.iconClass).click(function(){
           if(isClosed){
            $('.' + additionalClassPlaceholder).css('display', 'flex');
            isClosed = false;
           }else{
            $('.' + additionalClassPlaceholder).css('display', 'none');
            isClosed = true;
           }
       });
        
       $('.' + this.iconCloseClass).click(function(){
          $('.' + additionalClassPlaceholder).css('display', 'none'); 
           isClosed = true;
       });
    }
    
}

class StreamOnline extends Stream {
    
    constructor(data,name,iconClass, additionalClass, iconCloseClass){
        super(data,name,iconClass, additionalClass, iconCloseClass);
    }
    appendDom(){
        $(main).append(`<div class="div__general flexbox flexbox--center flexbox--spacebetween "><span class="span span--online"><a href="${this.data.stream.channel.url}" target="_blank">online</a></span><span class="span span--name">${this.name}</span><img class="img__thumbnail" src="${this.data.stream.channel.video_banner}"><i id="testing" class="fa fa-expand icon--expand ${this.iconClass}" aria-hidden="true"></i></div>`);
        
        $(main).append(`<div class="div__additional ${this.additionalClass}"><div class="div__additional__child div__additional__child--game position--relative"><i class="fa fa-times-circle-o icon__close--breakpoint ${this.iconCloseClass}" aria-hidden="true"></i><i class="fa fa-gamepad div__additional__icon" aria-hidden="true"></i><h1 class="additional__title">game</h1><h1 class="additional__info--span">${this.data.stream.channel.game}</h1></div><div class="div__additional__child div__additional__child--viewers position--relative">                        <i class="fa fa-times-circle-o icon__close ${this.iconCloseClass}" aria-hidden="true"></i>
<i class="fa fa-gamepad div__additional__icon" aria-hidden="true"></i><h1 class="additional__title">viewers</h1><h1 class="additional__info--span">${this.data.stream.viewers}</h1></div><div class="clearfix"></div><div class="div__additional__child div__additional__child--url"><a href="${this.data.stream.channel.url}" target="_blank"><i class="fa fa-external-link div__additional__icon" aria-hidden="true"></i></a><h1 class="additional__title">url</h1><a href="${this.data.stream.channel.url}"target="_blank"><h1 class="additional__info--span">${this.data.stream.channel.url}</h1></a></div><div class="div__additional__child div__additional__child--status"><i class="fa fa-comment div__additional__icon" aria-hidden="true"></i><h1 class="additional__title">status</h1><h1 class="additional__info--span">${this.data.stream.channel.status}</h1></div></div>`);
        
        this.buttonOnline();
    }
    
    buttonOnline(){
        super.buttonOnline();
    }
    
}

class StreamOffline extends Stream{
    
    //constructor doesn't need all the data so we don't inherit it
    constructor(name,iconClass, additionalClass, iconCloseClass){
        super(name,iconClass, additionalClass, iconCloseClass);
    }
    
    
    appendDom(){
        $(main).append(`<div class="div__general flexbox flexbox--center flexbox--spacebetween"><span class="span span--offline">offline</span><span class="span span--name">${this.name}</span><img class="img__thumbnail" src="css/img/no-thumbnail.jpg"><i class="fa fa-expand icon--expand ${this.iconClass}" aria-hidden="true"></i></div>`);
        
        $(main).append(`<div class="div__additional div__additional--offline position--relative ${this.additionalClass}"><i class="fa fa-times-circle-o icon__close--const ${this.iconCloseClass}" aria-hidden="true"></i><h2>no additional info :/</h2></div>`);
        
        this.buttonOffline();
    }
    
    buttonOffline(){
        super.buttonOffline();
    }
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

const myStreamPeople = new StreamPeople();

//https://www.youtube.com/watch?v=yswb4SkDoj0
const myPromise = myAsyncFunction('https://api.twitch.tv/kraken/streams/' + myStreamPeople.people[0]);
myPromise.then((bobross) => {
    
    console.log(bobross);
    if(bobross.stream !== null){
       console.log("Bobross is online");
       let myStreamOnline = new StreamOnline(bobross, "BobRoss", "iconclass0", "additionalclass0", "iconcloseclass0");
       myStreamOnline.appendDom();
        
    }
    
    else{
        console.log("Bobross is offline");
        let myStreamOffline = new StreamOffline(bobross, "BobRoss", "iconclass0", "additionalclass0", "iconcloseclass0");
        myStreamOffline.appendDom();
    } 
    
    return myAsyncFunction('https://api.twitch.tv/kraken/streams/' + myStreamPeople.people[1]);
}).then((eslsc2) => {
    console.log(eslsc2);
    if(eslsc2.stream !== null){
       console.log("ESL is online");
       let myStreamOnline = new StreamOnline(eslsc2, "eslc2", "iconclass1", "additionalclass1", "iconcloseclass1");
       myStreamOnline.appendDom();
    }
    
    else{
        console.log("ESL is offline");
        let myStreamOffline = new StreamOffline(eslsc2, "eslc2", "iconclass1", "additionalclass1", "iconcloseclass1");
        myStreamOffline.appendDom();
    } 
    
    return myAsyncFunction('https://api.twitch.tv/kraken/streams/' + myStreamPeople.people[2]);
}).then((twitch) =>{
    
    loadingIcon.style.display = 'none';
    
    console.log(twitch);
    
    if(twitch.stream !== null){
        
       console.log("Twitch is online");
       let myStreamOnline = new StreamOnline(twitch, "twitch", "iconclass2", "additionalclass2", "iconcloseclass2");
       myStreamOnline.appendDom();
        
    }
    
    else{
        console.log("Twitch is offline");
        let myStreamOffline = new StreamOffline(twitch, "twitch", "iconclass2", "additionalclass2", "iconcloseclass2");
        myStreamOffline.appendDom();
    } 
    
}).catch((error) => {
    console.log("catch error: " + error);
});
