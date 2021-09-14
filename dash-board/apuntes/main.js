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

// apuntes

const newApuntes = document.getElementById("new-apuntes");

const saveApunte = (idUser, id)=>{
  let date = new Date();
  let day = date.getDate();
  let moth = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let fecha = `${hour}:${minutes}:${seconds }- ${day}/${moth}/${year}`
  let titulo = document.getElementById("titulo-apunte").value;
  let descripcion = document.getElementById("descripcion-apunte").value;

  db.collection("users").doc(idUser).collection("apuntes").doc(id).update({
    title: titulo,
    content: descripcion,
    fecha: fecha,
    date: Date.now()
  });

  document.querySelector(".viewApunte").innerHTML = "";
}

const deleteApunte = (idUser, id)=>{
  db.collection("users").doc(idUser).collection("apuntes").doc(id).delete();
  document.querySelector(".viewApunte").innerHTML = "";
}

const viewApunte = (idUser, id, titulo, descripcion)=>{
  document.querySelector(".viewApunte").innerHTML = `
    <div class="dataApunte">
      <div class="infoApunte">
        <input type="text" placeholder="Titulo" id="titulo-apunte">
        <button onclick="saveApunte('${idUser}', '${id}')">Guardar</button>
        <button onclick="deleteApunte('${idUser}', '${id}')">Eliminar</button>
      </div>
      <textarea id="descripcion-apunte" cols="30" rows="10" placeholder="Descripcion"></textarea>
    </div>
  `

  document.getElementById("titulo-apunte").value = titulo;
  document.getElementById("descripcion-apunte").value = descripcion;
}

newApuntes.addEventListener("click", ()=>{
  let date = new Date();
  let day = date.getDate();
  let moth = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let fecha = `${hour}:${minutes}:${seconds }- ${day}/${moth}/${year}`
  db.collection("users").doc(auth.currentUser.uid).collection("apuntes").add({
    title: "Sin titulo",
    content: "",
    fecha: fecha,
    date: Date.now()
  });
})

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const foto = auth.currentUser.photoURL;

    if(foto == null){
      document.getElementById("img-perfil").innerHTML = `<img class="img-perfil" src="../img/user.png">`
    }else{
      document.getElementById("img-perfil").innerHTML = `<img class="img-perfil" src="${foto}">`
    }

    document.getElementById("name").textContent = user.displayName;
    var uid = user.uid;
    let id = uid;

    db.collection("users").doc(id).collection("apuntes").orderBy("date", "desc").onSnapshot(query =>{
      document.querySelector(".apuntes").innerHTML = ""

      query.forEach(doc =>{
        document.querySelector(".apuntes").innerHTML += `
          <div class="doc-apuntes" onclick="viewApunte('${user.uid}', '${doc.id}', '${doc.data().title}', '${doc.data().content}')">
            <p>${doc.data().title}</p>
            <p>${doc.data().fecha}</p>
          </div>
        `
      })
    })

  } else {
    window.location.href = "https://inedec.github.io/web"
  }
});
