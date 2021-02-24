let token = window.localStorage.getItem("token")
let dbid = window.localStorage.getItem("dbid")

async function logout(){
  var myHeaders=new  Headers()
  myHeaders.append("Content-Type","application/json");
  let token=localStorage.getItem("token")
  myHeaders.append("token", token)

  var requestOptions={
      method:'GET',
      headers:myHeaders,
      redirect:'follow'
  }
  response=await  fetch(`https://desolate-ocean-66919.herokuapp.com/http://anyservice.imassoft.com/${dbid}/logout`, requestOptions)
  responseObj = await response.json()
  console.log(responseObj)
  //Remove token
  window.localStorage.removeItem("token")
  //Change status to anyone
  window.localStorage.setItem("user-status", "anyone")
  window.location.replace("index.html");
}

document.addEventListener("keyup",function(e){
  if(e.key==" "){
      toggle();
  }
  else if(e.key=="ArrowRight"){
      myVideo.currentTime+=2;
  }
  else if(e.key=="ArrowLeft"){
      myVideo.currentTime-=2;
  }
});

let videoId=1;

let myVideo = document.getElementById("myvideo");
let progressValue = document.getElementById("progressValue");
let progressBackground = document.getElementById("progressBackground");
let overlay = document.getElementById("overlay");
let videoSpeed = document.getElementById("videoSpeed");
let subtitleDiv = document.getElementById("subtitle");
let volumeSlider = document.getElementById("myRange");

volumeSlider.addEventListener("mousemove", setVolume);

progressBackground.addEventListener("click",function(e){
  let maxWidth = progressBackground.clientWidth;
  let barValue = e.offsetX;
  let barValuePercent = barValue/maxWidth;
  let currentTime = myVideo.duration * barValuePercent;
  myVideo.currentTime = currentTime;
})

function getProgressBarWidth(){
  return new Promise(function(resolve,reject){
      
          let t = setInterval(function(){
              if(progressBackground.clientWidth>0){
                  clearInterval(t);
                  resolve(progressBackground.clientWidth);
              }
          },10);
  });
}

myVideo.addEventListener("loadedmetadata",async function(e){
  console.log(myVideo.duration);

  if(localStorage["video"+videoId]){
      myVideo.currentTime = Number(localStorage["video"+videoId]);

      let maxWidth = await getProgressBarWidth();
  
      console.log(maxWidth,(myVideo.currentTime/myVideo.duration) *maxWidth)
      progressValue.style.width = (myVideo.currentTime/myVideo.duration) *maxWidth ;
  
  }
  //myProgressBar.max = myVideo.duration;
})

let subtitlesArray = [{
  fromTime:1,
  toTime:2,
},{
  fromTime:2,
  toTime:5,
},{
  fromTime:5,
  toTime:9,
},{
  fromTime:9,
  toTime:12,
}]

myVideo.addEventListener("timeupdate",function(e){
  localStorage["video"+videoId] = myVideo.currentTime;
  
  let subtitles = subtitlesArray.filter((item)=>
      myVideo.currentTime>=item.fromTime &&
      myVideo.currentTime<=item.toTime
  );
  if(subtitles.length>0){
      let subtitle = subtitles[0];
      //subtitleDiv.innerHTML = subtitle.text;
  }
  let maxWidth = progressBackground.clientWidth;
  progressValue.style.width = (myVideo.currentTime/myVideo.duration) *maxWidth ;
})

function toggle(){
  if(myVideo.paused){
      play();
  }
  else
  {   
      pause();
      //Show in overlay
      showPlayOverlayBtn()
  }
}

function play(){
  myVideo.play();
  overlay.style.display="none";
}

function stop(){
  pause();
  myVideo.currentTime = "0";
}

function pause(){
  myVideo.pause();
  overlay.style.display="block";
  //Show in overlay
  showPlayOverlayBtn()
}

function moveForward(){
  myVideo.currentTime += 20;
}

function videoSpeedChanged(){
  myVideo.playbackRate = Number(videoSpeed.value);
}

function fullScreen()
{
  myVideo.webkitEnterFullScreen();
}

function showPlayOverlayBtn() {
  document.getElementById("pause-play").setAttribute("src", "./imgs/play-button-resized.png");
}

function showPauseOverlayBtn() {
  document.getElementById("pause-play").setAttribute("src", "./imgs/pause-button-resized.png");
}

function showControls(){
  controls.style.display="block";
  if(myVideo.paused) {
      //Show in overlay
      showPlayOverlayBtn()
  }
  else {
      overlay.style.display="block";
      //Show in overlay
      showPauseOverlayBtn()
  }                
}

function hideControls(){
  controls.style.display="none";
  if(myVideo.paused) {
      //Show in overlay
      showPauseOverlayBtn()
  }
  else {
      overlay.style.display="none";
      //Show in overlay
      showPlayOverlayBtn()
  } 
}

function setVolume(){
myVideo.volume = volumeSlider.value / 100;
}

console.log({myVideo});

async function getVideo() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("token", token);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let videoId = window.localStorage.getItem("clicked-video")
  let httpResponse = await fetch(`https://damp-headland-40243.herokuapp.com/http://anyservice.imassoft.com/${dbid}/videos/${videoId}`, requestOptions)

  responseJsonObj = await httpResponse.json();
  //window.localStorage.setItem("video-url", responseJsonObj.data.url)
  document.getElementById("myvideo").setAttribute("src", responseJsonObj.data.url)
}

//let localStorageUrl = window.localStorage.getItem("video-url")

getVideo();


