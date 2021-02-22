let token = window.localStorage.getItem("token")

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
  response=await  fetch("https://desolate-ocean-66919.herokuapp.com/http://anyservice.imassoft.com/3/logout",requestOptions)
  responseObj = await response.json()
  console.log(responseObj)
  //Remove token
  window.localStorage.removeItem("token")
  //Change status to anyone
  window.localStorage.setItem("user-status", "anyone")
  window.location.replace("home.html");
}

async function fetchAllVideos() {

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

  for(let i=responseJsonObj.length-1 ; i>=0 ; i--) {
    renderVideo(i, responseJsonObj[i].imgUrl, responseJsonObj[i].title)
  }

}

function renderVideo(id, src, title) {

  let card = `<div class="card" onclick="reply_click()">
                      <div class="row _thumbnail text-center"><a href="display-video.html"><img id="${id}" src="${src}"></a></div>
                      <div class="row text-center"><h3>${title.toUpperCase()}</h3></div>
              </div>`
  
  // Generate event listener for each card -> get IDs
  // Event Handler will store the clicked video id in local storage
  
  cards_container = document.getElementById("cards_container")
  cards_container.innerHTML += card
  //console.log(cards_container)
}

//Event listener
function reply_click() {
  //console.log(event.target.id)
  return event.target.id
}

/* jQuery Function -> $(staticAncestors).on(eventName, dynamicChild, function() {}); */

$('#cards_container').on('click', '.card', function(){
  video_id = reply_click()
  window.localStorage.setItem("clicked-video", video_id)
});

let userNavBar = [
  `<li><a href="home.html">Home <span class="sr-only">(current)</span></a></li>`,
  `<li><a href="videos-dashboard.html">Videos Dashboard</a></li>`,
  `<li><a href="edit-account.html">Edit Account Details</a></li>`,
  `<li><a href="home.html" onclick="logout()">Logout</a></li>`
]

let adminNavBar = [
  `<li><a href="home.html">Home <span class="sr-only">(current)</span></a></li>`,
  `<li><a href="videos-dashboard.html">Videos Dashboard</a></li>`,
  `<li><a href="edit-account.html">Edit Account Details</a></li>`,
  `<li><a href="add-video.html">Add Video</a></li>`,
  `<li><a href="edit-video.html">Edit Video</a></li>`,
  `<li><a href="home.html" onclick="logout()">Logout</a></li>`
]

let userStatus = window.localStorage.getItem("user-status")

if (userStatus == "logged-in-user" && token != null) { //TEST
  currentUserNavBar = userNavBar
  //document.getElementById("cardImg").href = "display-video.html"
  link = "display-video.html"
}   
else if (userStatus == "logged-in-admin" && token != null) { //TEST
  currentUserNavBar = adminNavBar
  //document.getElementById("cardImg").href = "display-video.html"
  link = "display-video.html"
}

for(let i=0 ; i<currentUserNavBar.length ; i++) {
  document.getElementById("navbar-container").innerHTML += currentUserNavBar[i]
}

//getMovies();
fetchAllVideos()





