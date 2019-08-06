let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let phone = document.getElementById("phone");
let file = document.getElementById("file");
let age = document.getElementById("age");
let city = document.getElementById("city");
let signup = document.getElementById("signup");
let database = firebase.database().ref("/");

signup.addEventListener("click", ()=>{
    let signupData = {
        username: username.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        file: file.value,
        age: age.value,
        city: city.value
    }
    console.log(signupData);
    firebase.auth().createUserWithEmailAndPassword(signupData.email, signupData.password)
    .then((dataValue)=>{
        console.log(dataValue.user.uid);
        database.child(`SignUp/${dataValue.user.uid}`).set(signupData);
        window.location.assign("login.html");
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        swal(errorCode, errorMessage);
      });
});
