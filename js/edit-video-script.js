let getVideos = async() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", "b52c5e48-1279-47e6-a2a7-501ed3a1f2e0");

    // let uurl = `https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/6/videos/`
    // let method = 'GET'

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let httpResponse = await fetch(`https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/6/videos/`,
        requestOptions);

    responseJsonObj = await httpResponse.json();
    displayContent(responseJsonObj)
    // await fetchRequest(uurl, method)
    
}
displayContent = (videoObj) => {
    console.log(videoObj)
    videoObj.forEach(element => {

        let table = document.getElementById('videos')
        let row = table.insertRow(-1)
        row.className = element.id
        let vidIndex = row.insertCell(0)
        let vidURL = row.insertCell(1)
        let vidTitle = row.insertCell(2)
        let vidAction = row.insertCell(3)

        vidURL.innerHTML = element.url.toString()
        vidTitle.innerHTML = element.title
        vidIndex.innerHTML = element.id

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
    let URLcell = "<input id='newURL' placeholder='place your url: '>"
    let titleCell = "<input id='newTitle' placeholder='place your url: '>"
    let submitButton = `<button class="btn btn-outline-success" onclick="editVideo(${index})" type="button">submit</button>`
    rowToEdit[0].childNodes[1].innerHTML = URLcell
    rowToEdit[0].cells[1].className = 'url'
    rowToEdit[0].childNodes[2].innerHTML = titleCell
    rowToEdit[0].cells[2].className = 'title'
    rowToEdit[0].cells[3].innerHTML = submitButton
}

editVideo = (index) => {
    newVidUrl = document.getElementById('newURL').value
    newVidTitle = document.getElementById('newTitle').value
    let editedObj = {
        'url': newVidUrl,
        'title': newVidTitle
    }
    fetchRequest(editedObj, index)
}

fetchRequest = async (videoObj, index) => {
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
    let url = `https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/6/videos/${index}`
    let httpResponse = await fetch(url, requestOptions);
    responseJsonObj = await httpResponse.json();
    location.reload()
}