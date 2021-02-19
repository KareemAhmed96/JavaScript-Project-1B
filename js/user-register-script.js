// js + fetch
function myFunction() {
    var x = document.getElementById("pass");
    var z = document.getElementById("re-pass");
    if (z.type === "password") {
        z.type = "text";
    } else {
        z.type = "password";
    }
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
// function myFunction2() {

// }

async function verifyRegister() {
    var userData = {};

    userData.username = document.getElementById("username").value;
    userData.password = document.getElementById("pass").value;
    
    const url = 'https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/9/register';
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
   //login request to get id
    id = login()
    addDatatoDB(id) 
}

async function addDatatoDB(id) {
    var useradd = {};
    useradd.username = document.getElementById("username").value;
    useradd.fname = document.getElementById("First-name").value;
    useradd.lname = document.getElementById("last-name").value;
    useradd.password = document.getElementById("pass").value;
    useradd.repassword = document.getElementById("re-pass").value;
    useradd.birthdate = document.getElementById("Birth Date").value;
    useradd.phone = document.getElementById("Phone number").value;
    useradd.Gender = document.getElementById("Gender").value;
    useradd.regId = id;

    const url = 'https://whispering-journey-12121.herokuapp.com/http://anyservice.imassoft.com/9/users';
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(useradd);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let httpResponse = await fetch(url, requestOptions)
    responseJsonObj = await httpResponse.json()
    console.log(responseJsonObj)
    let localStoragetoken = window.localStorage.getItem("Token")
}
   function login(){

   }
