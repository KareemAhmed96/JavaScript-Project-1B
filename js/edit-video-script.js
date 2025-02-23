token = localStorage.getItem('token');
let dbid = window.localStorage.getItem("dbid")

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
    response=await  fetch(`https://desolate-ocean-66919.herokuapp.com/http://anyservice.imassoft.com/${dbid}/logout`,requestOptions)
    responseObj = await response.json()
    console.log(responseObj)
    //Remove token
    window.localStorage.removeItem("token")
    //Change status to anyone
    window.localStorage.setItem("user-status", "anyone")
    window.location.replace("index.html");
}

async function deleteVideo(id){
    var myHeaders=new  Headers()
    myHeaders.append("Content-Type","application/json");
    let token=localStorage.getItem("token")
    myHeaders.append("token", token)

    var requestOptions={
        method:'DELETE',
        headers:myHeaders,
        redirect:'follow'
    }
    response=await  fetch(`https://desolate-ocean-66919.herokuapp.com/http://anyservice.imassoft.com/${dbid}/videos/${id}`,requestOptions)
    responseObj = await response.json()
    console.log(responseObj)
    alert("Deleted Successfully")
    location.reload()
}

let getVideos = async() => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", token);
    // window.localStorage.setItem("Token",responseJsonObj.token)
    // let token = localStorage.getItem('Token');

    // let url = `https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/6/videos/`
    // let method = 'GET'

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let httpResponse = await fetch(`https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/${dbid}/videos/`,
        requestOptions);

    responseJsonObj = await httpResponse.json();
    displayContent(responseJsonObj)
    // await fetchRequest(url, method)
    
}
displayContent = (videoObj) => {
    videoObj.forEach(element => {

        let table = document.getElementById('videos')
        let row = table.insertRow(-1)
        row.className = element.id
        let vidIndex = row.insertCell(0)
        let vidURL = row.insertCell(1)
        let imgUrl = row.insertCell(2)
        let vidTitle = row.insertCell(3)
        let vidAction = row.insertCell(4)
        let delAction = row.insertCell(5)
        
        vidURL.innerHTML = element.url.toString()
        imgUrl.innerHTML = element.imgUrl
        vidTitle.innerHTML = element.title
        vidIndex.innerHTML = row.rowIndex

        let aTag = document.createElement('button');
        aTag.setAttribute('type', "button");
        aTag.innerText = "Edit";
        aTag.style.textDecoration = "none"
        vidAction.appendChild(aTag);
        vidAction.addEventListener('click', () => { convert(element.id) })

        let bTag = document.createElement('button');
        bTag.setAttribute('type', "button");
        bTag.innerText = "Delete";
        bTag.style.textDecoration = "none"
        delAction.appendChild(bTag);
        delAction.addEventListener('click', () => { delVideo(element.id) })
    });
}

convert = (index) => {

    let rowToEdit = document.getElementsByClassName(index.toString())
    let URLcell = "<input id='newURL' placeholder='place your url: ' required>"
    let titleCell = "<input id='newTitle' placeholder='place your url: ' required>"
    let imgUrlCell = "<input id='imgUrl' placeholder='place your url: ' required>"
    let submitButton = `<button class="btn btn-outline-success" onclick="editVideo(${index})" type="button">submit</button>`
    rowToEdit[0].childNodes[1].innerHTML = URLcell
    rowToEdit[0].cells[1].className = 'url'

    rowToEdit[0].childNodes[2].innerHTML = imgUrlCell
    rowToEdit[0].cells[2].className = 'imgUrl'

    rowToEdit[0].childNodes[3].innerHTML = titleCell
    rowToEdit[0].cells[3].className = 'title'
    rowToEdit[0].cells[4].innerHTML = submitButton
}

delVideo = (index) => {
    deleteVideo(index)
}

editVideo = (index) => {
    newVidUrl = document.getElementById('newURL').value
    console.log(newVidUrl)
    newImgUrl = document.getElementById('imgUrl').value
    console.log(newImgUrl)
    newVidTitle = document.getElementById('newTitle').value
    
    let editedObj = {
        'url': newVidUrl,
        'imgUrl': newImgUrl,
        'title': newVidTitle
    }
    if(newVidUrl != "" && newImgUrl != "" && newVidTitle != "") {
        fetchRequest(editedObj, index)
        alert("Edited Successfully")
    }
    else {
        alert("You have to fill all fields")
    }
}

fetchRequest = async (videoObj, index) => {
    reqObj = JSON.stringify(videoObj)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", token);
        // let token = localStorage.getItem('Token');

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: reqObj,
        redirect: 'follow'
    };
    console.log(typeof(index))
    let url = `https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/${dbid}/videos/${index}`
    let httpResponse = await fetch(url, requestOptions);
    responseJsonObj = await httpResponse.json();
    location.reload()
}