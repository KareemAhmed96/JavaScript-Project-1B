var username = document.getElementById("username");
var password = document.getElementById("password");
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

    let loginObj = {
        email : username.value,
        password : password.value
    }
    
    let httpResponse = await fetch ("https://cryptic-headland-94862.herokuapp.com/http://anyservice.imassoft.com/:DBID/register",{
        method:"GET",
        headers: {
            "content-type": "application/json"
        },
        body:JSON.stringify(loginObj)
    });
    
    let jsonObj = await httpResponse.json();
    console.log(jsonObj);
    
    if(jsonObj.token){
        alert("Login successful");
    }
    
    else if(jsonObj.error){
        alert(jsonObj.error)
    }
    
    else{
        alert("Unknown error")
    }
    
    return false;
}