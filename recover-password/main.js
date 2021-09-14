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

const enviar = document.getElementById("enviar");

enviar.addEventListener("click", (e)=>{
  e.preventDefault();
  const email = document.getElementById("email").value;

  if(email.length > 1){
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      console.log("correo enviado");
      window.location.href = "https://inedec.github.io/web"
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      
      console.log(errorCode);
      console.log(errorMessage);
      document.querySelector("#error").textContent = "A ocurrido un error, correo invalido";
    });
  }else{
    document.querySelector("#error").textContent = "Correo invalido";
  }
});

const perfil = document.getElementById("back");
perfil.addEventListener("click", ()=>{
  window.location.href = "https://inedec.github.io/web"
})

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.href = "https://inedec.github.io/web/dash-board"
  }
});
