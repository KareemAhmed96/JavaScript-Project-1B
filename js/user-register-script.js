
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

function verifyRegister() {
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

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
