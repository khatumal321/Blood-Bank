//----------------------logout------------------------->
document.getElementById("logout").addEventListener("click", ()=>{
	firebase.auth().signOut().then(()=>{
		window.location.href = "login.html";
		localStorage.removeItem("login2")
	}).catch((error)=>{
		alert(error);
	})
})



// ==============================create Donner=======================//
let database = firebase.database().ref("/");

database.child("SignUp").on("child_added", (data22)=>{
    let data = data22.val();
    data.id = data22.key;
    console.log(data);
    if(data.bloodGroup !== undefined) {
    let donate = document.getElementById("card");
    let donateDiv = document.createElement("div");
    donateDiv.setAttribute("class", "card");
    let img = document.createElement("img");
    img.setAttribute("class", "title");
    img.setAttribute("id", "image");
    img.setAttribute("width", "80%")
    img.setAttribute("src", "img/" + data.file.slice(12));
    let imgBr = document.createElement("br"); 
    let span1 = document.createElement("span");
    span1.setAttribute("class", "title");
    span1.setAttribute("id", "name");
    span1.innerHTML = "Name: " + data.username;
    let br1 = document.createElement("br");
    let span2 = document.createElement("span");
    span2.setAttribute("class", "title");
    span2.setAttribute("id", "email");
    span2.innerHTML = "Email Address: " + data.email;  
    let br2 = document.createElement("br");
    let span6 = document.createElement("span");
    span6.setAttribute("class", "title33");
    span6.setAttribute("id", "bloodGroup");
    span6.innerHTML = data.bloodGroup; 
    let br6 = document.createElement("br");
    let span3 = document.createElement("span");
    span3.setAttribute("class", "title");
    span3.setAttribute("id", "phone");
    span3.innerHTML = "Phone Number: " + data.phone;
    let br3 = document.createElement("br");
    let span4 = document.createElement("span");
    span4.setAttribute("class", "title");
    span4.setAttribute("id", "age");
    span4.innerHTML = "Age: " + data.age;
    let br4 = document.createElement("br");
    let span5 = document.createElement("span");
    span5.setAttribute("class", "titleCity");
    span5.setAttribute("id", "city");
    span5.innerHTML = data.city;
    let br5 = document.createElement("br");
    let p = document.createElement("p");
    let btn = document.createElement("button");
    btn.setAttribute("id", "send");
    btn.setAttribute("onclick", "send");
    let btnText = document.createTextNode("Send Request");
    donateDiv.appendChild(img);
    donateDiv.appendChild(imgBr);
    donateDiv.appendChild(span1);
    donateDiv.appendChild(br1);
    donateDiv.appendChild(span2);
    donateDiv.appendChild(br2);
    donateDiv.appendChild(span6);
    donateDiv.appendChild(br6);
    donateDiv.appendChild(span3);
    donateDiv.appendChild(br3);
    donateDiv.appendChild(span4);
    donateDiv.appendChild(br4);
    donateDiv.appendChild(span5);
    donateDiv.appendChild(br5);
    donateDiv.appendChild(p);
    donateDiv.appendChild(btn);
    btn.appendChild(btnText);
    donate.appendChild(donateDiv);
//=================== Send Request======================//  
let local = JSON.parse(localStorage.getItem("login2"));
database.child(`SignUp/${data.id}/request`).on(`child_added`,(snap)=>{
    var snap1 = snap.val();
if(local.id === snap1.id){
    btn.innerHTML = `Requested`
}
})
btn.addEventListener("click", ()=>{
    if(local.id === data.id){
        alert(`It's your own card`);
    }
    else{
database.child(`SignUp/${data.id}/request`).push(local);
btn.disabled = true;
btn.innerHTML = "Requseted"
}
})
}
})
// ==========================Filter===============//
document.getElementById(`bloodOptions1`).addEventListener(`click`,()=>{
    var filterBlood = document.getElementsByClassName("titleCity");
    console.log(document.getElementById(`bloodOptions1`).value);
    for(var i = 0; i<filterBlood.length; i++){
        if((filterBlood[i].innerHTML).toUpperCase() === document.getElementById(`bloodOptions1`).value || document.getElementById(`bloodOptions1`).value === ``){
            console.log(filterBlood[i].parentNode)
            filterBlood[i].parentNode.style.display = `block`;
        }
        else if(filterBlood[i].innerHTML !== document.getElementById(`bloodOptions1`).value){
            filterBlood[i].parentNode.style.display = `none`;
        }
    }
})
document.getElementById(`bloodOptions2`).addEventListener(`click`,()=>{
    var filterCity1 = document.getElementsByClassName("title33");
    // console.log(document.getElementById(`bloodOptions2`).value);
    for(var i = 0; i<filterCity1.length; i++){

        if(filterCity1[i].innerHTML === document.getElementById(`bloodOptions2`).value || document.getElementById(`bloodOptions1`).value === ''){
            console.log(filterCity1[i].innerHTML.toUpperCase())
            console.log(document.getElementById(`bloodOptions2`).value);
            // console.log(filterCity1[i].innerHTML.toUpperCase())
            // console.log(filterCity1[i].parentNode)
            filterCity1[i].parentNode.style.display = `block`;
        }
        
      if((filterCity1[i].innerHTML).toUpperCase() !== document.getElementById(`bloodOptions2`).value && document.getElementById(`bloodOptions2`).value !== ""){
            filterCity1[i].parentNode.style.display = `none`;
        }
        
    }
})


document.getElementById(`bloodOptions3`).addEventListener(`click`,()=>{

    var filterBlood = document.getElementsByClassName("title33");
    console.log(document.getElementById(`bloodOptions3`).value);
  
    for(var i = 0; i<filterBlood.length; i++){
        if(document.getElementById(`bloodOptions3`).value === `A+`){

        
        if(filterBlood[i].innerHTML === `A+` || filterBlood[i].innerHTML === `A-` || filterBlood[i].innerHTML === `O+` || filterBlood[i].innerHTML === `O-`){
            console.log(filterBlood[i].parentNode.parentNode.parentNode)
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `block`;
        }
        
        else{
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `none`;
        }
    } 

    if(document.getElementById(`bloodOptions3`).value === `B+`){

        
        if(filterBlood[i].innerHTML === `B+` || filterBlood[i].innerHTML === `B-` || filterBlood[i].innerHTML === `O+` || filterBlood[i].innerHTML === `O-`){
            console.log(filterBlood[i].parentNode.parentNode.parentNode)
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `block`;
        }
        
        else{
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `none`;
        }
    }

    if(document.getElementById(`bloodOptions3`).value === `A-`){
x
        
        if(filterBlood[i].innerHTML === `A-` || filterBlood[i].innerHTML === `O-`){
            console.log(filterBlood[i].parentNode.parentNode.parentNode)
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `block`;
        }
        
        else{
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `none`;
        }
    }

    if(document.getElementById(`bloodOptions3`).value === `B-`){

        
        if(filterBlood[i].innerHTML === `B-` || filterBlood[i].innerHTML === `O-`){
            console.log(filterBlood[i].parentNode.parentNode.parentNode)
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `block`;
        }
        
        else{
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `none`;
        }
    }

    if(document.getElementById(`bloodOptions3`).value === `AB+`){

        
        if(filterBlood[i].innerHTML === `A+` || filterBlood[i].innerHTML === `AB+` || filterBlood[i].innerHTML === `A-` || filterBlood[i].innerHTML === `AB-` || filterBlood[i].innerHTML === `O+` || filterBlood[i].innerHTML === `O-` || filterBlood[i].innerHTML === `B-` || filterBlood[i].innerHTML === `B+`){
            console.log(filterBlood[i].parentNode.parentNode.parentNode)
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `block`;
        }
        
        else{
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `none`;
        }
    }


    if(document.getElementById(`bloodOptions3`).value === `AB-`){

        
        if(filterBlood[i].innerHTML === `B-` || filterBlood[i].innerHTML === `A-` || filterBlood[i].innerHTML === `AB-` || filterBlood[i].innerHTML === `O-`){
            console.log(filterBlood[i].parentNode.parentNode.parentNode)
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `block`;
        }
        
        else{
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `none`;
        }
    }

    if(document.getElementById(`bloodOptions3`).value === `O-`){

        
        if(filterBlood[i].innerHTML === `O-`){
            console.log(filterBlood[i].parentNode.parentNode.parentNode)
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `block`;
        }
        
        else{
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `none`;
        }
    }

    if(document.getElementById(`bloodOptions3`).value === `O+`){

        
        if(filterBlood[i].innerHTML === `O+` || filterBlood[i].innerHTML === `O-`){
            console.log(filterBlood[i].parentNode.parentNode.parentNode)
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `block`;
        }
        
        else{
            filterBlood[i].parentNode.parentNode.parentNode.style.display = `none`;
        }
    }
 
    if(document.getElementById(`bloodOptions3`).value === ``){
        filterBlood[i].parentNode.parentNode.parentNode.style.display = `block`;

    }
    
    }

})