// js + fetch
function myFunction() {
    var x = document.getElementById("pass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

async function verifyRegister() {

    var userData = {};

    userData.username = document.getElementById("username").value;
    userData.fname = document.getElementById("First-name").value;
    userData.lname = document.getElementById("last-name").value;
    userData.password = document.getElementById("pass").value;
    userData.birthdate = document.getElementById("Birth-Date").value;
    userData.phone = document.getElementById("Phone-number").value;
    userData.Gender = document.getElementById("Gender").value;
    userData.userType = "regular-user"


    let result = validate(userData);
    if (result == true) {


        const url = 'https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/5/register';
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(userData);

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

        // local storage;
        window.localStorage.setItem("Token", token)
        console.log(responseJsonObj.id)
    }
    else {
        document.getElementById("message").innerHTML = ("invalid Data");
    }
}

function validate(userData) {

    if (userData.password == "" || userData.username == "") {
        document.getElementById("message").innerHTML = ("Password or username shouldn't be empty");
        return false;
    }

    var numbers = /[0-9]/g;
    if (!userData.password.match(numbers)) {

        document.getElementById("message").innerHTML = ("Password should contain at least one number");
        return false;
    }


    var upperCaseLetters = /[A-Z]/g;
    if (!userData.password.match(upperCaseLetters)) {

        document.getElementById("message").innerHTML = ("Password should contain at least one upper case character");
        return false;
    }


    var lowerCaseLetters = /[a-z]/g;
    if (!userData.password.match(lowerCaseLetters)) {

        document.getElementById("message").innerHTML = ("Password should contain at least one lower case character");
        return false;
    }

    if (userData.password.length < 8) {
        document.getElementById("message").innerHTML = ("Password should be at least 8 characters");
        return false;
    }
    return true;
}