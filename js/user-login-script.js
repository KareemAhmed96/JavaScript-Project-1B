// Asynchronous  Function Login Validates the User Name and Password
async function login() {
    // Headers Creation 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    /// Getting User Input
    let userName = document.getElementById("user").value
    let userPassword = document.getElementById("pass").value
    /// Formatting the body 
    var raw =`{"username":"${userName}","password": "${userPassword}" }`
    // Formatting the Request Options
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
  // Getting API Response 
  let response = await fetch("https://desolate-ocean-66919.herokuapp.com/http://anyservice.imassoft.com/5/login", requestOptions);
  // Cast Response into JSON Object 
  let responseJsonObj= await response.json()
  // Printing Response 
  console.log(responseJsonObj)
  // Check the Response 
  if (responseJsonObj.token){

    // Successful Login >> Store Token In Locale Storage
    console.log(responseJsonObj.token)
    window.localStorage.setItem("Token",responseJsonObj.token)
    // Simulate a mouse click:
    window.location.href = "home.html";

    // Simulate an HTTP redirect:
    // window.location.replace("home.html");
  }
  else{
    /// Not Authorized User Alert will Be Raised 
    alert("You Are Not Authorized ")
  }
}