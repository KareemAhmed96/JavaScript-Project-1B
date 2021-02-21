//aLy O.o
var userInput = {};
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let token = window.localStorage.getItem("token")
myHeaders.append("token", token); //generate token automatically

let local_storage_user_id = window.localStorage.getItem("user_id")

async function loadData() {

    userInput = await userGetOne(local_storage_user_id) //user_ID to be dynamic

    document.getElementById("fname").value = userInput.fname;
    document.getElementById("lname").value = userInput.lname;
    document.getElementById("dob").value = userInput.dob;
    document.getElementById("username").value = userInput.username;
    document.getElementById("password").value = "";
    document.getElementById("phNum").value = userInput.phone;
}

async function verifyRegister() {

    userInput.fname = document.getElementById("fname").value;
    userInput.lname = document.getElementById("lname").value;
    userInput.dob = document.getElementById("dob").value.toString();
    userInput.username = document.getElementById("username").value;
    userInput.password = document.getElementById("password").value;
    userInput.phone = document.getElementById("phNum").value;

    let result = validate();

    if (result == true) {

        await userDelete(local_storage_user_id) //user_ID to be dynamic

        const url = 'https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/3/register';
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(userInput);
        console.log("DATA BEFORE SEND: ", raw)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let httpResponse = await fetch(url, requestOptions)
        responseJsonObj = await httpResponse.json()
        console.log(responseJsonObj)
        let token = await responseJsonObj.token

        window.localStorage.setItem("token", token)
    }
    else {
        //document.getElementById("message").innerHTML = ("invalid Data");
    }

    // logout and redirect to login page to update user_id in local storage
    window.localStorage.removeItem("user_id")
    logout()
}

async function userGetOne(user_ID) {
    let userData = {}
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    // Getting API Response 
    let response = await fetch(`https://desolate-ocean-66919.herokuapp.com/http://anyservice.imassoft.com/3/users/${user_ID}`, requestOptions);
    // Cast Response into JSON Object 
    let responseJsonObj = await response.json()
    // Printing Response 
    //console.log(responseJsonObj)
    userData = responseJsonObj.data
    //console.log(userData)
    return userData
}

async function userDelete(user_ID) {
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };
    // Getting API Response 
    let response = await fetch(`https://desolate-ocean-66919.herokuapp.com/http://anyservice.imassoft.com/3/users/${user_ID}`, requestOptions);
    // Cast Response into JSON Object 
    let responseJsonObj = await response.json()
    // Printing Response 
    console.log(responseJsonObj)
    // Check the Response 
    if (responseJsonObj.token) {
        // Successful Login >> Store Token In Locale Storage
        console.log(responseJsonObj.token)
    }
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
    response=await  fetch("https://desolate-ocean-66919.herokuapp.com/http://anyservice.imassoft.com/3/logout",requestOptions)
    responseObj = await response.json()
    console.log(responseObj)
    //Remove token
    window.localStorage.removeItem("token")
    //Change status to anyone
    window.localStorage.setItem("user-status", "anyone")
    window.location.replace("user-login.html");
}

function validate() {
    if (userInput.password == "" || userInput.username == "") {
        document.getElementById("message").innerHTML = ("Password or username shouldn't be empty");
        return false;
    }
    var numbers = /[0-9]/g;
    if (!userInput.password.match(numbers)) {

        document.getElementById("message").innerHTML = ("Password should contain at least one number");
        return false;
    }
    var upperCaseLetters = /[A-Z]/g;
    if (!userInput.password.match(upperCaseLetters)) {

        document.getElementById("message").innerHTML = ("Password should contain at least one upper case character");
        return false;
    }
    var lowerCaseLetters = /[a-z]/g;
    if (!userInput.password.match(lowerCaseLetters)) {

        document.getElementById("message").innerHTML = ("Password should contain at least one lower case character");
        return false;
    }

    if (userInput.password.length < 8) {
        document.getElementById("message").innerHTML = ("Password should be at least 8 characters");
        return false;
    }
    return true
}