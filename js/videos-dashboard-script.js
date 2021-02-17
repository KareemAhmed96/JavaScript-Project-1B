           var vid, playbtn, seekslider, curtimetext, durtimetext, mutebtn, volumeslider;
function intializePlayer(){
  // Set object references
  vid = document.getElementById("my_video");
  playbtn = document.getElementById("playpausebtn");
  seekslider = document.getElementById("seekslider");
  curtimetext = document.getElementById("curtimetext");
  durtimetext = document.getElementById("durtimetext");
  mutebtn = document.getElementById("mutebtn");
  volumeslider = document.getElementById("volumeslider");
  // Add event listeners
  playbtn.addEventListener("click",playPause,false);
  seekslider.addEventListener("change",vidSeek,false);
  vid.addEventListener("timeupdate",seektimeupdate,false);
  mutebtn.addEventListener("click",vidmute,false);
  volumeslider.addEventListener("change",setvolume,false);
}
window.onload = intializePlayer;
function playPause(){
  if(vid.paused){
    vid.play();
    playbtn.innerHTML = "Pause";
  } else {
    vid.pause();
    playbtn.innerHTML = "Play";
  }
}
function vidSeek(){
  var seekto = vid.duration * (seekslider.value / 100);
  vid.currentTime = seekto;
}
function seektimeupdate(){
  var nt = vid.currentTime * (100 / vid.duration);
  seekslider.value = nt;
  var curmins = Math.floor(vid.currentTime / 60);
  var cursecs = Math.floor(vid.currentTime - curmins * 60);
  var durmins = Math.floor(vid.duration / 60);
  var dursecs = Math.floor(vid.duration - durmins * 60);
  if(cursecs < 10){ cursecs = "0"+cursecs; }
  if(dursecs < 10){ dursecs = "0"+dursecs; }
  if(curmins < 10){ curmins = "0"+curmins; }
  if(durmins < 10){ durmins = "0"+durmins; }
  curtimetext.innerHTML = curmins+":"+cursecs;
  durtimetext.innerHTML = durmins+":"+dursecs;
}
function vidmute(){
  if(vid.muted){
    vid.muted = false;
    mutebtn.innerHTML = "Mute";
  } else {
    vid.muted = true;
    mutebtn.innerHTML = "Unmute";
  }
}
function setvolume(){
  vid.volume = volumeslider.value / 100;
}