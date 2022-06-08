function toast(data,left){
  console.log(data);
  let toast =document.createElement("DIV");
 toast.innerHTML=data;
 document.body.appendChild(toast);
 toast.style.position="absolute";
 toast.style.top="80vh";
 toast.style.left=left+"vw";
 toast.style.zIndex="1000";
 toast.style.borderRadius="6px";
 toast.style.background="#333333";
 toast.style.color="white";
 toast.style.padding="5px 13px";
 toast.style.transition=".5s linear";
 setTimeout(function() {
   toast.style.opacity="0";
   setTimeout(function() {
     document.body.removeChild(toast)
   }, 500);
   
 }, 1000);
}








function setPopupClick(index,fn){
  poppupBox.childNodes[index].addEventListener("click",()=>{
     fn();
  })
}


function cancel() {
    poppupBox.style.opacity="0";
    setTimeout(function() {
       document.body.removeChild(poppupBox)
       document.body.removeChild(blocker)
    }, 400);
   
}
  

function popup(...args) {
  
  blocker= document.createElement("div");
   document.body.appendChild(blocker);
   blocker.style.position="absolute";
   blocker.style.top="0";
   blocker.style.left="0";
   blocker.style.zIndex="50000";
   blocker.style.height="100vh";
   blocker.style.width="100vw";
   
   
    poppupBox= document.createElement("div");
   document.body.appendChild(poppupBox);
   poppupBox.style.position="absolute";
   poppupBox.style.top=(100-((args.length+1)*5)-8)/2+"vh";
   poppupBox.style.left="10vw";
   poppupBox.id="ppp";
   poppupBox.style.background="white";
   poppupBox.style.transition=".4s linear";
   //poppupBox.style.border="1px solid #999";
   poppupBox.style.zIndex="50001";
   poppupBox.style.boxShadow="1px 1px 17px 5px rgb(95,95,95)";
   poppupBox.style.borderRadius="7px";
 args.forEach((element,index)=>{
   var poppupBtn= document.createElement("div");
   
   poppupBtn.innerHTML=element;
   poppupBox.appendChild(poppupBtn);
   poppupBtn.style.padding="10px 17px";
   poppupBtn.style.height="5vh";
   poppupBtn.style.width="70vw";
   poppupBtn.style.borderBottom="1px solid #999";
   
   
 });
  var cancleBtn= document.createElement("div");
   
   cancleBtn.innerHTML="Cancle";
   poppupBox.appendChild(cancleBtn);
   cancleBtn.style.padding="10px 17px";
   cancleBtn.style.height="5vh"; 
   cancleBtn.style.width="70vw";
   cancleBtn.style.borderBottom="1px solid #999";
   cancleBtn.onclick=()=>{
     return cancel()
   }
   
   
   
}




const roomname=document.querySelector(".roomname");
const password=document.querySelector(".password");
const name=document.querySelector(".name");

  let roomnameelem=document.querySelector("nav h3");
	let msgcont=document.querySelector(".msgs");
	


function askForCopy(element) {
  popup("Copy message text");
  setPopupClick(0,()=>{
    let textarea=document.createElement("textarea")
    textarea.value=element.innerText.split("---")[0];
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea)
    cancel();
    toast("Copied to clipboard",20)
  })
  
}





setInterval(()=>{
  fetch("https://achatapp-1.herokuapp.com/")
.then(data=>{
				return data.json();
}).then(res=>{
				
}).catch((err)=>{
  location.href="./err1.html"
})
},1000)











if(location.search){
   _name=location.search.replace("?","").replaceAll("%20"," ").split("&")[2].split("=")[1];
   _roomname=location.search.replace("?","").replaceAll("%20"," ").split("&")[0].split("=")[1];
   _password=location.search.replace("?","").replaceAll("%20"," ").split("&")[1].split("=")[1];
  
  
  fetch(`https://achatapp-1.herokuapp.com/fetch?roomname=${_roomname}&password=${_password}`)
.then(data=>{
				return data.json();
}).then(res=>{
				if (res.Message=="error" ) {
				   location.href="./err2.html"
				}else{
				
				  roomnameelem.innerHTML=_roomname;
				   var markup="";
				    res.forEach(e=>{
				      if (e.name==_name) {
				        markup+=` <div class="msg-cont your ">
   <h2 class="sender">${e.name.substring(0,1)}</h2>
   <p onclick="askForCopy(this)">${e.message}<br><br><b>---you sent</b></p>
 </div>`
				      }else{
				        markup+=` <div class="msg-cont " >
   <h2 class="sender">${e.name.substring(0,1)}</h2>
   <p onclick="askForCopy(this)" >${e.message}<br><br><b>--- ${e.name} sent</b></p>
 </div>`
				      }
				      
				    })
				    
				    if (markup) {
				      msgcont.innerHTML=markup;
				    }else{
				      msgcont.innerHTML="<h4 style='margin-top:160px;text-align:center'>Be first to send message in this room</h4>";
				    }
				    
				    
				    

  
}

				  setInterval(function() {
				 
				    fetch(`https://achatapp-1.herokuapp.com/fetch?roomname=${_roomname}&password=${_password}`)
				    .then(data=>{
			        	return data.json();
             })
             .then(res=>{
			           var markup="";
				    res.forEach(e=>{
				      if (e.name==_name) {
				        markup+=` <div class="msg-cont your" >
   <h2 class="sender">${e.name.substring(0,1)}</h2>
   <p onclick="askForCopy(this)">${e.message}<br><br><b>--- you sent</b></p>
 </div>`
				      }else{
				        markup+=` <div class="msg-cont" >
   <h2 class="sender" >${e.name.substring(0,1)}</h2>
   <p onclick="askForCopy(this)">${e.message}<br><br><b>--- ${e.name} sent</b></p>
 </div>`
				      }
				      
				    })
				    if (markup) {
				      msgcont.innerHTML=markup;
				    }else{
				      msgcont.innerHTML="<h4 style='margin-top:160px;text-align:center'>Be first to send message in this room</h4>";
				    }
             })	
             
            
             
				  }, 5000);
				
				

				
				})
}
  













function join() {
  if (roomname.value && password.value && name.value) {
    
    fetch("https://achatapp-1.herokuapp.com/join_room",{
         method:"post",
         body:JSON.stringify({
           roomname:roomname.value,
           password:password.value
         }),
         headers:{
           'Content-Type':'application/json'
         },
       // credentials: 'same-origin'
      }).then((promise)=>{
        return promise.json()
      }).then((data)=>{
        if (data.Message=="success") {
          location.href=`./room.html?roomname=${roomname.value}&password=${password.value}&name=${name.value}`;
        }else{
          location.href=`./err2.html`;
        }
      })
    
  }else{
    toast("All the fields are required",20);
  }
}





function create() {
  const roomname=document.querySelector(".roomname");
const password=document.querySelector(".password");
const name=document.querySelector(".author");
let regex = /^[0-9a-zA-Z]+$/;
  if (roomname.value && password.value && name.value &&    password.value.length>2  && name.value.length>2 ) {
       
      fetch("https://achatapp-1.herokuapp.com/create_room",{
         method:"post",
         body:JSON.stringify({
           roomname:roomname.value,
           password:password.value,
           authorname:name.value
         }),
         headers:{
           'Content-Type':'application/json'
         },
       // credentials: 'same-origin'
      }).then(res=>{
        return res.json();
      }).then(data=>{
      
        if(data.Message!="success"){
          toast("The roomname already exist",20);
        }else{
          location.href=`./room.html?roomname=${roomname.value}&password=${password.value}&name=${name.value}`;
        }
      })
  }else if(roomname.value.match(regex)== false || password.value.match(regex)== false   || name.value.match(regex)== false  ){
     toast("All fields must be alpha numeric",15)
    }else if(roomname.value=="" || name.value=="" || password.value==""){
         toast("All fields are required",20)
       
      }else if(roomname.value.length<=3){
       toast("Room name must contain at least 4 charecters",0)
      }else if(password.value.length<=2){
       toast("Password must contain at least 3 charecters",0)
      }else if(name.value.length<=2){
       toast("Author name must contain at least 3 charecters",0)
      }
}





function send(){
  const msg=document.querySelector(".sending input");
  if (msg.value) {
    fetch(`https://achatapp-1.herokuapp.com/send`,{
     // console.log(_roomname,_password,_name)
      method:"post",
        credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
      body:JSON.stringify({
        roomname:_roomname,
        password:_password,
        name:_name,
        message:msg.value
      })
    }).then(data=>{
				return data.json();
    }).then(res=>{
				fetch(`https://achatapp-1.herokuapp.com/fetch?roomname=${_roomname}&password=${_password}`)
				    .then(data=>{
			        	return data.json();
             })
             .then(res=>{
			           var markup="";
				    res.forEach(e=>{
				      if (e.name==_name) {
				        markup+=` <div class="msg-cont your" >
   <h2 class="sender" >${e.name.substring(0,1)}</h2>
   <p onclick="askForCopy(${this})">${e.message}<br><br><b>--- you sent</b></p>
 </div>`
				      }else{
				        markup+=` <div class="msg-cont " onclick="askForCopy(this)">
   <h2 class="sender" >${e.name.substring(0,1)}</h2>
   <p onclick="askForCopy(this)">${e.message}<br><br><b>--- ${e.name} sent</b></p>
 </div>`
				      }
				      
				    })
				    if (markup) {
				      msgcont.innerHTML=markup;
				    }else{
				      msgcont.innerHTML="<h4 style='margin-top:160px;text-align:center'>Be first to send message in this room</h4>";
				    }
				    msg.value="";
				  toast("Message sent",30);

             })	
    })
  }else{
    toast("Blank message can't be sent",15)
  }
}

