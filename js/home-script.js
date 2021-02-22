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

/* Login function to get a new Token */
async function login() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "username": "kareemadmindb3", "password": "1234" });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let response = await fetch("https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/3/login", requestOptions);
    let responseJsonObj = await response.json()
    console.log(responseJsonObj.token)

    return responseJsonObj.token
}

/* Get latest videos */
async function renderLatestVideos() {

    let dynamic_token = await login()

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", dynamic_token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let videoCount = 10;  // Maximum number of recent videos

    for (let videoId = 0 ; videoId<videoCount ; videoId++) {

        let httpResponse = await fetch(`https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/3/videos/${videoId}`,
            requestOptions);

        responseJsonObj = await httpResponse.json();
        console.log(responseJsonObj.data)
        
        // if no error occurs -> try section will run
        try { 
            if (responseJsonObj.data) {
                renderVideo(videoId, responseJsonObj.data.imgUrl, responseJsonObj.data.title)
            }
        }
        // if error happens -> catch section will run
        catch {
            if (responseJsonObj.error) {
                console.log("no urls found")
                continue
            }
            else {
                console.log("something else occured")
                break
            }
        }
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

/* FIRST CODE TO RUN BELOW HERE */
/* **************************** */

/* Dynamic Navbar */
let anyoneNavBar = [
    `<li class=""><a href="#">Home <span class="sr-only">(current)</span></a></li>`, 
    `<li><a href="user-login.html">User Login</a></li>`,
    `<li><a href="user-register.html">User Register</a></li>`,
    `<li><a href="admin-login.html">Admin Login</a></li>`
]

let userNavBar = [
    `<li class=""><a href="#">Home <span class="sr-only">(current)</span></a></li>`,
    `<li><a href="videos-dashboard.html">Videos Dashboard</a></li>`,
    `<li><a href="edit-account.html">Edit Account Details</a></li>`,
    `<li><a href="#" onclick="logout()">Logout</a></li>`
]

let adminNavBar = [
    `<li class=""><a href="#">Home <span class="sr-only">(current)</span></a></li>`,
    `<li><a href="videos-dashboard.html">Videos Dashboard</a></li>`,
    `<li><a href="edit-account.html">Edit Account Details</a></li>`,
    `<li><a href="add-video.html">Add Video</a></li>`,
    `<li><a href="edit-video.html">Edit Video</a></li>`,
    `<li><a href="#" onclick="logout()">Logout</a></li>`
]

//Check for token (logged in or not), will be handled in other pages to restrict access
let token = window.localStorage.getItem("token")

/* user-status will be used later to view or un-view navbar elements*/
/* user-status && token -> logged in */

//Get user-status from local storage
let userStatus = window.localStorage.getItem("user-status")
console.log(userStatus)

//Current user navbar
let currentUserNavBar = anyoneNavBar

//check and assign
if (userStatus == null) {
    //create user-status in local storage and add "anyone" to it
    window.localStorage.setItem("user-status", "anyone")
}
else if (userStatus == "anyone") {        //should be changed to anyone after Logout
    currentUserNavBar = anyoneNavBar
}
else if (userStatus == "logged-in-user" && token != null) { //TEST
    currentUserNavBar = userNavBar
}
else if (userStatus == "logged-in-admin" && token != null) { //TEST
    currentUserNavBar = adminNavBar
}
else {
    // this will happen when user refreshes while not logged in
    userStatus = window.localStorage.getItem("user-status")
    console.log(userStatus)
}

for(let i=0 ; i<currentUserNavBar.length ; i++) {
    document.getElementById("navbar-container").innerHTML += currentUserNavBar[i]
}