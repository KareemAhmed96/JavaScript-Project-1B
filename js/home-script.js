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

    // This was done because I want this function ton return more than one value
    resultObject = {
        videoCount: 10,  // View top 10: can be modified to choose how many videos you want to appear on the home page
        foundCount: 0,    // Number of videos found on the server
        urlArray: []
    }

    for (let videoId = 0; videoId < resultObject.videoCount; videoId++) {

        let httpResponse = await fetch(`https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/5/videos/${videoId}`,
            requestOptions);

        responseJsonObj = await httpResponse.json();
        console.log(responseJsonObj)

        // Try to push to local storage and increment foundCount
        try {
            resultObject.urlArray.push(responseJsonObj.data.url)
            resultObject.foundCount++;
            console.log("TRY", resultObject)
        }
        catch {
            console.log("no more links")
            console.log("CATCH", resultObject)
        }
    }

    return resultObject
}

/* Function to generate a dynamic card into the html page */
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
}

/*
 * Function name: renderLatestVideos()
 * Description: The onload function that runs when the website loads.
 * 1- gets videos from the API
 * 2- gets stored urls from the local storage
 * 3- generates dynamic video cards to the cards container in the home.html page
 */
async function renderLatestVideos() {
    
    resultObject = await getVideos(); //resultObject -> contains foundCount of videos on the server
    console.log(resultObject)

    for (let videoId = 0; videoId < resultObject.foundCount; videoId++) {
        generateCard(videoId, resultObject.urlArray[videoId])
    }
}