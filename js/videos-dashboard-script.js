async function fetchAllVideos() {

  let token = window.localStorage.getItem("token")

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("token", token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let httpResponse = await fetch(`https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/3/videos/`, requestOptions);
  responseJsonObj = await httpResponse.json();

  console.log(responseJsonObj)

  for(let i=0 ; i<responseJsonObj.length ; i++) {
    renderVideo(i, responseJsonObj[i].imgUrl, responseJsonObj[i].title)
  }

}

function renderVideo(id, src, title) {

  let card = `<div class="card" onclick="reply_click()">
                      <div class="row _thumbnail text-center"><a href="display-video.html"><img id="${id}" src="${src}"></a></div>
                      <div class="row text-center"><h3>${title.toUpperCase()}</h3></div>
              </div>`
  
  // Generate event listener for each card -> get IDs
  // Event Handler will store the clicked video id in local storage
  
  cards_container = document.getElementById("cards_container")
  cards_container.innerHTML += card
  //console.log(cards_container)
}

async function getMovies() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("token", "27be4a72-6d58-44df-94e3-7fe46bcf4cbb");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let moivesCount = 3;
  let urlArray = []

  for (let moivesId = 0; moivesId < moivesCount; moivesId++) {

    let httpResponse = await fetch(`https://nameless-dusk-81295.herokuapp.com/http://anyservice.imassoft.com/5/img/${moivesId}`, requestOptions);

    responseJsonObj = await httpResponse.json();
    console.log(responseJsonObj)

    urlArray.push(responseJsonObj.data.url)
    window.localStorage.setItem("moives-url-array", urlArray)
  }
}

//getMovies();
fetchAllVideos()





