//----------------------logout------------------------->
document.getElementById("logout").addEventListener("click", ()=>{
	firebase.auth().signOut().then(()=>{
		window.location.href = "login.html";
		localStorage.removeItem("login2")
	}).catch((error)=>{
		alert(error);
	})
});

// ================Navbbar=================//
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// ==================profile data================//
let signupData = JSON.parse(localStorage.getItem("login2"));
let database = firebase.database().ref("/");
database.child(`SignUp/${signupData.id}`).on("value", (profile)=>{
nodeData = profile.val()
console.log(nodeData);
console.log(nodeData.file.slice(12));
document.getElementById("image").setAttribute(`src`,`img/`+nodeData.file.slice(12));
document.getElementById("name").innerHTML = nodeData.username;
document.getElementById("email").innerHTML = nodeData.email;  
document.getElementById("number").innerHTML = nodeData.phone;
document.getElementById("age").innerHTML = nodeData.age;
document.getElementById("city").innerHTML = nodeData.city;
})
// =====================edit update=================//
let edit2 =  ()=>{
  document.getElementById("card2").style.display = "none";  
  document.getElementById("mainDiv").style.display = "block"; 
};
document.getElementById("username").value = signupData.username;
document.getElementById("phone").value = signupData.phone; 
// document.getElementById("file1").value = signupData.file;
document.getElementById("age1").value = signupData.age; 
document.getElementById("city1").value = signupData.city; 
let updateForm = document.getElementById("update");
updateForm.addEventListener("click", ()=>{
  database.child(`SignUp/${signupData.id}`).update({
      username: document.getElementById("username").value,
      phone: document.getElementById("phone").value,
      file: document.getElementById("file1").value,
      age: document.getElementById("age1").value,
      city: document.getElementById("city1").value
  })
  document.getElementById("mainDiv").style.display = "none";
 document.getElementById("card2").style.display = "block";

})

// <!-- ===============Request Card=========================== -->//
// if(localData.bloodGroup !== undefined) {
let inboxBtn = document.getElementById("inbox");


inboxBtn.addEventListener("click", ()=>{
  database.child(`SignUp/${signupData.id}/request/`).on("child_added", (requestPara)=>{
    let localData = requestPara.val();
    localData.Id = requestPara.key;
    console.log(localData);
  
  
  document.getElementById("card2").style.display = "none";
let card = document.getElementById("requestCard");
let cardDiv = document.createElement("div");
cardDiv.setAttribute("class", "card");
let img = document.createElement("img");
img.setAttribute("width", "80%");
img.setAttribute("src", `img/${localData.file.slice(12)}`);
let br1 = document.createElement("br");
let span1 = document.createElement("span");
span1.setAttribute("class", "title");
span1.setAttribute("id", "name");
span1.innerHTML = `Name: ${localData.username}`;
let br2 = document.createElement("br");
let span2 = document.createElement("span");
span2.setAttribute("class", "title");
span2.setAttribute("id", "phone");
span2.innerHTML = `Phone Number : ${localData.phone}`;
let br3 = document.createElement("br");
let span3 = document.createElement("span");
span3.setAttribute("class", "title");
span3.setAttribute("id", "name");
span3.innerHTML = `City Name : ${localData.city}`;
let br4 = document.createElement("br");
let Btn1 = document.createElement("button");
Btn1.setAttribute("id", "btn1");
Btn1.setAttribute("id", localData.id);
Btn1.setAttribute("class", "fa fa-paper-plane")
let Btn1Text = document.createTextNode("Accept");
let br5 = document.createElement("br");
let br6 = document.createElement("br");
let Btn2 = document.createElement("button");
Btn2.setAttribute("class", "fa fa-times");
let Btn2Text = document.createTextNode("Decline");
cardDiv.appendChild(img);
cardDiv.appendChild(br1);
cardDiv.appendChild(span1);
cardDiv.appendChild(br2);
cardDiv.appendChild(span2);
cardDiv.appendChild(br3);
cardDiv.appendChild(span3);
cardDiv.appendChild(br4);
cardDiv.appendChild(Btn1);
Btn1.appendChild(Btn1Text);
cardDiv.appendChild(br5);
cardDiv.appendChild(br6);
cardDiv.appendChild(Btn2);
Btn2.appendChild(Btn2Text);
card.appendChild(cardDiv);  


//============================ Accept======================//
Btn1.addEventListener('click' , function(){
  console.log(this.id)
let acceptDoner = {
  name : signupData.username,
  image : signupData.file,
  contact : signupData.phone,
}
database.child(`SignUp/${this.id}/accept/`).push(acceptDoner)
database.child(`SignUp/${signupData.id}`).update({
    request : "done",
})
})
//========================== Decline==========================//
Btn2.addEventListener("click", ()=>{
  database.child(`SignUp/${signupData.id}/request/${localData.Id}`).remove();
  
})
})
})

//========================== Accept Card=======================//
let notification = document.getElementById("notification");
notification.addEventListener("click" , ()=> {
  let database = firebase.database().ref("/");
  database.child(`SignUp/${signupData.id}/accept/`).on("child_added", (requestPara2)=>{
    let localData2 = requestPara2.val();
    console.log(localData2);

document.getElementById("card2").style.display = "none";
let acceptCard = document.getElementById("acceptCard");
let cardDiv = document.createElement("div");
cardDiv.setAttribute("class", "card");
let img2 = document.createElement("img");
img2.setAttribute("width", "80%");
img2.setAttribute("src", `img/${localData2.image.slice(12)}`);
let br1 = document.createElement("br");
let span1 = document.createElement("span");
span1.setAttribute("class", "title");
span1.setAttribute("id", "name");
span1.innerHTML = `Name: ${localData2.name}`;
let br2 = document.createElement("br");
let span2 = document.createElement("span");
span2.setAttribute("class", "title");
span2.setAttribute("id", "contact");
span2.innerHTML = `Phone Number : ${localData2.contact}`;
console.log(span2);
let br3 = document.createElement("br");
let pdata = document.createElement("p");
let textp = document.createTextNode("Now you can cantact eachother your Request Accepted" + " " + localData2.name);
// let span3 = document.createElement("span");
// span3.setAttribute("class", "title");
// span3.setAttribute("id", "name");
// span3.innerHTML = `City Name : ${localData2.city}`;
// let br4 = document.createElement("br");
cardDiv.appendChild(img2);
cardDiv.appendChild(br1);
cardDiv.appendChild(span1);
cardDiv.appendChild(br2);
cardDiv.appendChild(span2);
cardDiv.appendChild(br3);
cardDiv.appendChild(pdata);
pdata.appendChild(textp);
// cardDiv.appendChild(span3);
// cardDiv.appendChild(br4);
acceptCard.appendChild(cardDiv);
}) 
})

// ========================request Number==============================//
console.log(signupData.id)
database.child(`SignUp/${signupData.id}/request/`).on("child_added", (requestPara)=>{
// let myValue = requestPara.val();
console.log(document.getElementById(`inboxNumbr`).innerHTML)
document.getElementById(`inboxNumbr`).innerHTML = Number(document.getElementById(`inboxNumbr`).innerHTML)+1 
})
// ========================accept Number==============================//
database.child(`SignUp/${signupData.id}/accept/`).on("child_added", (requestPara)=>{
  // let myValue = requestPara.val();
  console.log(document.getElementById(`notiNo`).innerHTML)
  document.getElementById(`notiNo`).innerHTML = Number(document.getElementById(`notiNo`).innerHTML)+1 
  })