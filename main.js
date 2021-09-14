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

// modals

const modalLogin = document.getElementById("modal-login");
const openLogin = document.getElementById("open-login");
const closeLogin = document.getElementById("close-login");

openLogin.addEventListener("click", ()=>{
  modalLogin.style.display = "flex";
});

closeLogin.addEventListener("click", ()=>{
  modalLogin.style.display = "none";
});

// Register

const modalRegister = document.getElementById("modal-register");
const openRegister = document.getElementById("open-register");
const closeRegister = document.getElementById("close-register");

openRegister.addEventListener("click", ()=>{
  modalRegister.style.display = "flex";
});

closeRegister.addEventListener("click", ()=>{
  modalRegister.style.display = "none";
});

// Close-modals

const closeModals = ()=>{
  closeLogin.click();
  closeRegister.click();
}

// login

const emailLogin = document.getElementById("email-login");
const passwordLogin = document.getElementById("password-login")

login.addEventListener("click", (e)=>{
  e.preventDefault();

  let email = emailLogin.value;
  let password = passwordLogin.value;

  auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location.href = "https://web.iedelcampito.repl.co/dash-board";
    document.querySelector("#error").textContent = "";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    
    document.querySelector("#error").textContent = "A ocurrido un error, correo o contraseña invalido";
  });
})

// login with Google

const loginGoogle = document.getElementById("login-google");
let provider = new firebase.auth.GoogleAuthProvider();

loginGoogle.addEventListener("click", (e)=>{
  e.preventDefault();

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...

    closeModals();
    window.location.href = "https://web.iedelcampito.repl.co/dash-board";
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
});


// Register with email and password

const emailRegister = document.getElementById("email-register");
const passwordRegister = document.getElementById("password-register");
const register = document.getElementById("register");

register.addEventListener("click", (e)=>{
  e.preventDefault();

  let email = emailRegister.value;
  let password = passwordRegister.value;

  auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    document.querySelector("#errorRegister").textContent = "A ocurrido un error, correo o contraseña invalido, la contraseña debe de ser de mas de 6 caracteres";
  });
})

// login with Google

const registerGoogle = document.getElementById("register-google");

registerGoogle.addEventListener("click", (e)=>{
  e.preventDefault();

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...

    closeModals();
    window.location.href = "https://web.iedelcampito.repl.co/dash-board";
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.href = "https://web.iedelcampito.repl.co/dash-board";
    var uid = user.uid;
  } else {
    
  }
});