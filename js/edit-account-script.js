var username = document.getElementById("username");
var password = document.getElementById("password");
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json"); 
async function validate() {

    if (password.value=="" || username.value=="") {
        document.getElementById("message").innerHTML = ("Password or username shouldn't be empty");
        return false;
    }


    var numbers = /[0-9]/g;
    if (!password.value.match(numbers)) {

        document.getElementById("message").innerHTML = ("Password should contain at least one number");
        return false;
    } 
   

    var upperCaseLetters = /[A-Z]/g;
    if (!password.value.match(upperCaseLetters)) {

        document.getElementById("message").innerHTML = ("Password should contain at least one upper case character");
        return false;
    } 
   
     
    var lowerCaseLetters = /[a-z]/g;
    if (!password.value.match(lowerCaseLetters)) {

        document.getElementById("message").innerHTML = ("Password should contain at least one lower case character");
        return false;
    } 

    if (password.value.length < 8) {
        document.getElementById("message").innerHTML = ("Password should be at least 8 characters");
        return false;
    }

    let userName = document.getElementById("username").value
        let userPassword = document.getElementById("password").value
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
      }
      else{
        /// Not Authorized User Alert will Be Raised 
        alert("You Are Not Authorized ")
      }
    
    if(responseJsonObj.token){
        alert("Login successful");
    }
    
    else if(responseJsonObj.error){
        alert(responseJsonObj.error)
    }
    
    else{
        alert("Unknown error")
    }
    
}
    

