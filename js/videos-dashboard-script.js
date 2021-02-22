var vid, playbtn, seekslider, curtimetext, durtimetext, mutebtn, volumeslider;

function intializePlayer() {
  // Set object references
  vid = document.getElementById("my_video");
  playbtn = document.getElementById("playpausebtn");
  seekslider = document.getElementById("seekslider");
  curtimetext = document.getElementById("curtimetext");
  durtimetext = document.getElementById("durtimetext");
  mutebtn = document.getElementById("mutebtn");
  volumeslider = document.getElementById("volumeslider");
  // Add event listeners
  playbtn.addEventListener("click", playPause, false);
  seekslider.addEventListener("change", vidSeek, false);
  vid.addEventListener("timeupdate", seektimeupdate, false);
  mutebtn.addEventListener("click", vidmute, false);
  volumeslider.addEventListener("change", setvolume, false);
}

window.onload = intializePlayer;

function playPause() {
  if (vid.paused) {
    vid.play();
    playbtn.innerHTML = "Pause";
  } else {
    vid.pause();
    playbtn.innerHTML = "Play";
  }
}

function vidSeek() {
  var seekto = vid.duration * (seekslider.value / 100);
  vid.currentTime = seekto;
}

function seektimeupdate() {
  var nt = vid.currentTime * (100 / vid.duration);
  seekslider.value = nt;
  var curmins = Math.floor(vid.currentTime / 60);
  var cursecs = Math.floor(vid.currentTime - curmins * 60);
  var durmins = Math.floor(vid.duration / 60);
  var dursecs = Math.floor(vid.duration - durmins * 60);
  if (cursecs < 10) { cursecs = "0" + cursecs; }
  if (dursecs < 10) { dursecs = "0" + dursecs; }
  if (curmins < 10) { curmins = "0" + curmins; }
  if (durmins < 10) { durmins = "0" + durmins; }
  curtimetext.innerHTML = curmins + ":" + cursecs;
  durtimetext.innerHTML = durmins + ":" + dursecs;
}

function vidmute() {
  if (vid.muted) {
    vid.muted = false;
    mutebtn.innerHTML = "Mute";
  } else {
    vid.muted = true;
    mutebtn.innerHTML = "Unmute";
  }
}

function setvolume() {
  vid.volume = volumeslider.value / 100;
}

async function fetchAllVideos() {

  let token = window.localStorage.getItem("token")

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("token", token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let httpResponse = await fetch(`https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/3/videos/`, requestOptions);
  responseJsonObj = await httpResponse.json();

  console.log(responseJsonObj)

  for(let i=0 ; i<responseJsonObj.length ; i++) {
    renderVideo(i, responseJsonObj[i].imgUrl, responseJsonObj[i].title)
  }

}

function renderVideo(id, src, title) {

  let card = `<div class="card" onclick="reply_click()">
                      <div class="row _thumbnail text-center"><a href="display-video.html"><img id="${id}" src="${src}"></a></div>
                      <div class="row text-center"><h3>${title}</h3></div>
                      <div class="row _text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper sapien non
                          neque finibus, sit amet cursus est faucibus.</div>
                      <div class="btn-group thumb-btn" role="group" aria-label="...">
                          <button type="button" class="btn btn-default">View</button>
                          <button type="button" class="btn btn-default">Star</button>
                      </div>
                      <span class="minutes">90 mins</span>
              </div>`
  
  // Generate event listener for each card -> get IDs
  // Event Handler will store the clicked video id in local storage
  
  cards_container = document.getElementById("cards_container")
  cards_container.innerHTML += card
  //console.log(cards_container)
}

async function getMovies() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("token", "27be4a72-6d58-44df-94e3-7fe46bcf4cbb");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let moivesCount = 3;
  let urlArray = []

  for (let moivesId = 0; moivesId < moivesCount; moivesId++) {

    let httpResponse = await fetch(`https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/5/img/${moivesId}`, requestOptions);

    responseJsonObj = await httpResponse.json();
    console.log(responseJsonObj)

    urlArray.push(responseJsonObj.data.url)
    window.localStorage.setItem("moives-url-array", urlArray)
  }
}

//getMovies();
fetchAllVideos()

let localStorageUrlArray = window.localStorage.getItem("moives-url-array")

localStorageUrlArray = localStorageUrlArray.split(",")
console.log(localStorageUrlArray[0])
console.log(localStorageUrlArray[1])
console.log(localStorageUrlArray[2])

document.getElementById("movie_1").setAttribute("src", localStorageUrlArray[0])
document.getElementById("movie_2").setAttribute("src", localStorageUrlArray[1])
document.getElementById("movie_3").setAttribute("src", localStorageUrlArray[2])




