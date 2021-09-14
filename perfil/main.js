const firebaseConfig = {
  apiKey: "AIzaSyC7xxdDBDCEvF9FXXSzjfLxWJeLSovKc2A",
  authDomain: "app-curso-353ad.firebaseapp.com",
  projectId: "app-curso-353ad",
  storageBucket: "app-curso-353ad.appspot.com",
  messagingSenderId: "147595197456",
  appId: "1:147595197456:web:5aca590362d73436855e95",
  measurementId: "G-B0L3CC020L"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// dark mode

if(localStorage.getItem("dark-mode") == "true"){
	document.body.classList.add("dark-theme");
} else {
	document.body.classList.remove("dark-theme");
}

// perfil
const perfil = document.getElementById("back");
perfil.addEventListener("click", ()=>{
  window.location.href = "https://web.iedelcampito.repl.co/dash-board"
})

// actualizar perfil

const editName = document.getElementById("edit-name");
const saveName = document.getElementById("save-Name");
const dataPerfil = document.getElementById("data-perfil");
const cancelName = document.getElementById("cancel-edit-name");

const actualizarPerfil = (name)=>{
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(() => {
    dataPerfil.classList.remove("active");
  }).catch((error) => {
    
  }); 

  window.location.href = "https://web.iedelcampito.repl.co/perfil";
} 

editName.addEventListener("click", ()=>{
  dataPerfil.classList.add("active");
  document.getElementById("input-edit-name").value = auth.currentUser.displayName;
})

saveName.addEventListener("click", ()=>{
  const newName = document.getElementById("input-edit-name").value;
  actualizarPerfil(newName);
})

cancelName.addEventListener("click", ()=>{
  dataPerfil.classList.remove("active")
})

const ponerDatosPerfil = ()=>{
  const foto = auth.currentUser.photoURL;

  if(foto == null){
    document.getElementById("img-perfil").innerHTML = `<img class="img-perfil" src="../img/user.png">`
  }else{
    document.getElementById("img-perfil").innerHTML = `<img class="img-perfil" src="${foto}">`
  }

  const name = auth.currentUser.displayName
  if(name == null){
    document.getElementById("nombre").innerHTML = "No se designado el nombre";
  }else{
    document.getElementById("nombre").innerHTML = name;
  }
  document.getElementById("email").textContent = auth.currentUser.email;
}

// new password
let code = null;
const codeNewPassword = document.getElementById("code-new-password");
const enviarNewPassword = document.getElementById("enviar-new-password");

enviarNewPassword.addEventListener("click", (e)=>{
  e.preventDefault();
  
  if(codeNewPassword.value.length = 4 && codeNewPassword.value == code){
    let email = auth.currentUser.email;
    
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      console.log("correo enviado");
      document.querySelector("#messageNewPassWord").textContent = "Correo enviado";
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    })
  }else{
    document.querySelector("#messageNewPassWord").textContent = "Codigo no valido";
  }
});

// reset code
const codeInput = document.getElementById("actual-code");
const newCodeInput = document.getElementById("code-new");
const confirmCodeInput = document.getElementById("confirm-code-new");
const btnNewCode = document.getElementById("new-code");

btnNewCode.addEventListener("click", (e)=>{
  e.preventDefault();
  let id = auth.currentUser.uid;

  if(codeInput.value == code && newCodeInput.value.length == 4 && confirmCodeInput.value.length == 4 && newCodeInput.value == confirmCodeInput.value){
    db.collection("users").doc(id).collection("perfil").doc("config").set({
      code: newCodeInput.value
    }).then(()=>{
      document.querySelector("#messageResetCode").textContent = "Codigo cambiado correctamente"
      window.location.href = "https://web.iedelcampito.repl.co/perfil"
    }).catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
  }else{
    document.querySelector("#messageResetCode").textContent = "Codigo invalido, debe contener 4 caracteres incluyendo numeros y letras";
  }
})

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  
    ponerDatosPerfil()
    var uid = user.uid;
    let id = auth.currentUser.uid

    db.collection("users").doc(id).collection("perfil").doc("config").get().then((doc)=>{
      if (doc.exists) {
        let dataUser = doc.data();
        code = dataUser.code
      } else {
        db.collection("users").doc(id).collection("perfil").doc("config").set({
          code: "0000"
        });

        code = "0000"
      }
    })
  } else {
    window.location.href = "https://web.iedelcampito.repl.co"
  }
});