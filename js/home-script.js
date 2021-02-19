/* Get latest videos */
async function getVideo() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", "2f0e6687-91a5-4882-8a27-d82ceccb9b5d");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let videoCount = 2;
    let urlArray = [];

    for(let videoId=0 ; videoId<videoCount ; videoId++) {
        
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

getVideo();

let localStorageUrlArray = window.localStorage.getItem("video-url-array")

localStorageUrlArray = localStorageUrlArray.split(",")
console.log(localStorageUrlArray[0])
console.log(localStorageUrlArray[1])

document.getElementById("video-container-1").setAttribute("src", localStorageUrlArray[0])
document.getElementById("video-container-2").setAttribute("src", localStorageUrlArray[1])