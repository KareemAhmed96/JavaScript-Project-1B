/* Get latest videos */
async function getVideo() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", "9f16c116-3fe5-4619-a041-6136c00cf88e");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let httpResponse = await fetch("https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/5/videos/0",
        requestOptions);

    responseJsonObj = await httpResponse.json();   
    //console.log(responseJsonObj.data.url)

    //store token in local storage
    window.localStorage.setItem("video-url", responseJsonObj.data.url)
}

getVideo();

let localStorageUrl = window.localStorage.getItem("video-url")
console.log(localStorageUrl)

document.getElementById("video-container").setAttribute("src", localStorageUrl)