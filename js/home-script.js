/* Login function to get a new Token */
async function login() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "username": "kareemdb5", "password": "1234" });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let response = await fetch("https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/5/login", requestOptions);
    let responseJsonObj = await response.json()
    console.log(responseJsonObj.token)

    return responseJsonObj.token
}

/* Get latest videos */
async function getVideos() {
    let dynamic_token = await login()

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", dynamic_token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let urlArray = [];

    // This was done because I want this function ton return more than one value
    resultObject = {
        videoCount: 10,
        foundCount: 0
    }

    for (let videoId = 0; videoId < resultObject.videoCount; videoId++) {

        let httpResponse = await fetch(`https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/5/videos/${videoId}`,
            requestOptions);

        responseJsonObj = await httpResponse.json();
        console.log(responseJsonObj)

        //store token in local storage
        //window.localStorage.setItem("video-url", responseJsonObj.data.url)

        try {
            urlArray.push(responseJsonObj.data.url)
            window.localStorage.setItem("video-url-array", urlArray)
            resultObject.foundCount++;
            console.log("TRY", resultObject)
        }
        catch {
            console.log("no more links")
            resultObject.success = false
            console.log("CATCH", resultObject)
        }
    }

    return resultObject
}

function generateCard(id, src) {
    
    let card = `<div class="card">
                    <div class="row _thumbnail text-center"><video id="video-container-${id}" src="${src}" controls></video></div>
                    <div class="row _text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper sapien non
                        neque finibus, sit amet cursus est faucibus.</div>
                    <div class="btn-group thumb-btn" role="group" aria-label="...">
                        <button type="button" class="btn btn-default">View</button>
                        <button type="button" class="btn btn-default">Star</button>
                    </div>
                    <span class="minutes">90 mins</span>
                </div>`
    
    cards_container = document.getElementById("cards_container")
    cards_container.innerHTML += card
    //console.log(cards_container)
    document.getElementById(`video-container-${id}`).setAttribute("src", src)
}

async function renderLatestVideos() {
    
    resultObject = await getVideos();
    console.log(resultObject)
    let localStorageUrlArray = window.localStorage.getItem("video-url-array")

    localStorageUrlArray = localStorageUrlArray.split(",")
    
    //console.log(localStorageUrlArray[0])
    //console.log(localStorageUrlArray[1])
    //document.getElementById("video-container-1").setAttribute("src", localStorageUrlArray[0])
    //document.getElementById("video-container-2").setAttribute("src", localStorageUrlArray[1])

    for (let videoId = 0; videoId < resultObject.foundCount; videoId++) {
        generateCard(videoId, localStorageUrlArray[videoId])
    }
}