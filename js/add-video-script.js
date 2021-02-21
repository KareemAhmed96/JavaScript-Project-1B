fetchAdd = async (videoObj) => {

    let token = localStorage.getItem('token');

    reqObj = JSON.stringify(videoObj)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: reqObj,
        redirect: 'follow'
    };
    let url = `https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/3/videos/`
    await fetch(url, requestOptions);
    location.reload()
}

addVideo = () => {
    videoURL = document.getElementById('url').value
    videoTitle = document.getElementById('title').value
    videoObj= {
        "url": videoURL,
        "title": videoTitle
    }
    fetchAdd(videoObj)
}

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
    response= await  fetch("https://desolate-ocean-66919.herokuapp.com/http://anyservice.imassoft.com/3/logout",requestOptions)
    responseObj = await response.json()
    console.log(responseObj)
    //Remove token
    window.localStorage.removeItem("token")
    //Change status to anyone
    window.localStorage.setItem("user-status", "anyone")
    window.location.replace("home.html");
}