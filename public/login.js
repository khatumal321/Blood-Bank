let email = document.getElementById("email");
let password = document.getElementById("password");
let signup = document.getElementById("signup");
let database = firebase.database().ref("/");

signup.addEventListener("click", ()=>{
    let loginData = {
        email: email.value,
        password: password.value
    }
    console.log(loginData);

    firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
    .then((login)=>{
        console.log(login.user.uid);
        database.child(`SignUp/${login.user.uid}`).on("value", (login)=>{
            let loginValue = login.val();
            loginValue.id = login.key;
            console.log(loginValue);
            localStorage.setItem("login2", JSON.stringify(loginValue));
            window.location.href = "home.html";
        })
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        swal(errorCode, errorMessage);
      });
})