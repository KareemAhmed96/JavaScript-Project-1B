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
async function getVideo() {
    let dynamic_token = await login()

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", dynamic_token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let videoCount = 2;
    let urlArray = [];

    for (let videoId = 0; videoId < videoCount; videoId++) {

        let httpResponse = await fetch(`https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/5/videos/${videoId}`,
            requestOptions);

        responseJsonObj = await httpResponse.json();
        console.log(responseJsonObj)

        //store token in local storage
        //window.localStorage.setItem("video-url", responseJsonObj.data.url)

        urlArray.push(responseJsonObj.data.url)
        window.localStorage.setItem("video-url-array", urlArray)
    }
}

async function renderLatestVideos() {
    
    await getVideo();

    let localStorageUrlArray = window.localStorage.getItem("video-url-array")

    localStorageUrlArray = localStorageUrlArray.split(",")
    console.log(localStorageUrlArray[0])
    console.log(localStorageUrlArray[1])

    document.getElementById("video-container-1").setAttribute("src", localStorageUrlArray[0])
    document.getElementById("video-container-2").setAttribute("src", localStorageUrlArray[1])
}