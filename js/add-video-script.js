fetchAdd = async (videoObj) =>{

    reqObj = JSON.stringify(videoObj)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", "b52c5e48-1279-47e6-a2a7-501ed3a1f2e0");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: reqObj,
        redirect: 'follow'
    };
    let url = `https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/6/videos/`
    await fetch(url, requestOptions);
    location.reload()
}

addVideo = () =>{
    videoURL = document.getElementById('url').value
    videoTitle = document.getElementById('title').value
    videoObj= {
        "url": videoURL,
        "title": videoTitle
    }
    fetchAdd(videoObj)
}