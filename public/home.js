//----------------------logout------------------------->
document.getElementById("logout").addEventListener("click", ()=>{
	firebase.auth().signOut().then(()=>{
		window.location.href = "login.html";
		localStorage.removeItem("login2")
	}).catch((error)=>{
		alert(error);
	})
})
// ==============Add property in Firebase node======================//
let database = firebase.database().ref(`/`);
let currentUser = JSON.parse(localStorage.getItem(`login2`));
console.log(currentUser);
document.getElementById(`donateBtn`).addEventListener(`click`,()=>{
  database.child(`SignUp/${currentUser.id}`).update({bloodGroup:document.getElementById(`select`).value});
})

// ======================Total User==========================//
database.child("SignUp").on("child_added", value=>{
let value1 = value.val();
console.log(value1.bloodGroup)
if (value1.bloodGroup !== undefined){
let blood = document.getElementById(value1.bloodGroup);
blood.innerHTML = Number(blood.innerHTML) + 1
}
})