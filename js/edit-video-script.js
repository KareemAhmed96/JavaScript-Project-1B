token = localStorage.getItem('token');

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
    let httpResponse = await fetch(`https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/3/videos/`,
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
        

        vidURL.innerHTML = element.url.toString()
        imgUrl.innerHTML = element.imgUrl
        vidTitle.innerHTML = element.title
        vidIndex.innerHTML = row.rowIndex

        let aTag = document.createElement('a');
        aTag.setAttribute('type', "button");
        aTag.innerText = "Edit";
        aTag.style.textDecoration = "none"
        vidAction.appendChild(aTag);
        vidAction.addEventListener('click', () => { convert(element.id) })
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
    fetchRequest(editedObj, index)
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
    let url = `https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/3/videos/${index}`
    let httpResponse = await fetch(url, requestOptions);
    responseJsonObj = await httpResponse.json();
    //location.reload()
}