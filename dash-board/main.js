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

const logOut = document.getElementById("log-out");

logOut.addEventListener("click", ()=>{
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
});

// dark mode

const btnDarkMode = document.querySelector(".dark-mode");

btnDarkMode.addEventListener("click",()=>{
  document.body.classList.toggle("dark-theme");
  btnDarkMode.classList.toggle("active");

  if(document.body.classList.contains("dark-theme")){
		localStorage.setItem("dark-mode", "true");
	} else {
		localStorage.setItem("dark-mode", "false");
	}
})

if(localStorage.getItem("dark-mode") == "true"){
	document.body.classList.add("dark-theme");
	btnDarkMode.classList.add("active");
} else {
	document.body.classList.remove("dark-theme");
	btnDarkMode.classList.remove("active");
}

// perfil

const perfil = document.getElementById("perfil");
perfil.addEventListener("click", ()=>{
  window.location.href = "https://inedec.github.io/web/perfil"
})

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const foto = auth.currentUser.photoURL;

    if(foto == null){
      document.getElementById("img-perfil").innerHTML = `<img class="img-perfil" src="../img/user.png">`
    }else{
      document.getElementById("img-perfil").innerHTML = `<img class="img-perfil" src="${foto}">`
    }

    var uid = user.uid;

  } else {
    window.location.href = "https://inedec.github.io/web/"
  }
});
