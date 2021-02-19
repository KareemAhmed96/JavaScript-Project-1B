
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
function myFunction2() {

}

async function verifyRegister() {
    var userData = {};

    userData.username = document.getElementById("First-name").value;
    userData.lname = document.getElementById("last-name").value;
    userData.password = document.getElementById("pass").value;
    userData.repassword = document.getElementById("re-pass").value;
    userData.birthdate = document.getElementById("Birth Date").value;
    userData.phone = document.getElementById("Phone number").value;
    userData.Gender = document.getElementById("Gender").value;

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
    let tokenarray = []


    let httpResponse = await fetch(url, requestOptions)
    responseJsonObj = await httpResponse.json()
    console.log(responseJsonObj)
    let token =  await responseJsonObj.token


    // verifyRegister();
    let localStorageUrlArray = window.localStorage.setItem("Token",token)

    let localStoragetoken = window.localStorage.getItem("Token")
    console.log(localStoragetoken)
    // document.getElementById("video-container-1").setAttribute("src", localStorageUrlArray[0])
    // document.getElementById("video-container-2").setAttribute("src", localStorageUrlArray[1])

}
