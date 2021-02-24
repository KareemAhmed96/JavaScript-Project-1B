let dbid = window.localStorage.getItem("dbid")

async function login() {
  // Headers Creation 
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Getting User Input
  let userName = document.getElementById("user").value
  let userPassword = document.getElementById("pass").value

  // Formatting the body 
  var raw = `{"username":"${userName}","password": "${userPassword}" }`

  // Formatting the Request Options
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // Getting API Response 
  let response = await fetch(`https://desolate-ocean-66919.herokuapp.com/http://anyservice.imassoft.com/${dbid}/login`, requestOptions);

  // Cast Response into JSON Object 
  let responseJsonObj = await response.json()

  // Printing Response 
  //console.log(typeof(responseJsonObj.data.userType),responseJsonObj.data.userType)

  // Check the Response 
  if (responseJsonObj.token || !responseJsonObj.error) {
    if (responseJsonObj.data.userType == 'admin') {
      // Successful Login >> Store Token In Local Storage
      console.log(responseJsonObj.token)
      window.localStorage.setItem("token", responseJsonObj.token)
      window.localStorage.setItem("user-status", "logged-in-admin")
      // Simulate an HTTP redirect:
      window.location.replace("index.html");
    }
    else{
      alert("This account is not registered as an Admin")
    }
  }
  else {
    // Not Authorized User Alert will Be Raised 
    alert("You Are Not Authorized ")
  }
}