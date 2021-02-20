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

        let httpResponse = await fetch(`https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/5/videos/${videoId}`,
            requestOptions);

        responseJsonObj = await httpResponse.json();
        console.log(responseJsonObj)

        // if no error occurs -> try section will run
        try { 
            if (responseJsonObj.data.url) {
                renderVideo(videoId, responseJsonObj.data.url, responseJsonObj.data.title)
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

    let card = `<div class="card">
                    <div class="row _thumbnail text-center"><video id="video-container-${id}" src="${src}" controls></video></div>
                    <div class="row text-center"><h3>${title}</h3></div>
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