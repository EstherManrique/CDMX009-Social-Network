import { viewLogin } from './view/login.js';
import { viewRegister } from './view/register.js';
import { viewForum } from './view/fuorum.js';
import { editionOfProfile } from './view/editprofile.js';
import { viewProfile } from './view/profile.js';


document.addEventListener("DOMContentLoaded", function() {
        document.getElementById('hideAndShow').style.display = 'none';
        document.getElementById('movilIcon').style.display = 'none';
        viewLogin()
            .then(function() {
                // En esta parte creo una variable en donde voy a llamar a mi id al que quiero darle el click en este caso el login
                var buttonLogin = document.querySelector('#doLogin');
                buttonLogin.addEventListener('click', function(e) {
                    e.preventDefault();
                    loginPageOne();
                    movilIcon.classList.add('shown');
                });
            }).then(function() {
                // En esta parte creo una variable en donde voy a llamar a mi id al que quiero darle el click en este caso el ingreso con google
                var buttonGoogle = document.querySelector('#loginGoogle');
                buttonGoogle.addEventListener('click', function(e) {
                    e.preventDefault();
                    googleButton();
                });
            })
            .then(function() {
                // En esta parte creo una variable en donde voy a llamar a mi id al
                // que quiero darle el click en este caso el ingreso con facebook
                var buttonFacebook = document.querySelector('#loginFacebook');
                buttonFacebook.addEventListener('click', function(e) {
                    e.preventDefault();
                    facebookButton();
                    document.getElementById('hideAndShow').style.display = 'block';
                    movilIcon.classList.add('shown');
                });
            })
            .then(function() {
                var ntAccount = document.querySelector('#reg');
                ntAccount.addEventListener('click', function(e) {
                    e.preventDefault();
                    viewRegister()
                        .then(function() {
                            var buttonReg = document.querySelector('#doRegister');
                            buttonReg.addEventListener('click', function(e) {
                                e.preventDefault();
                                register();
                            });
                        })

                });
            })
            .then(function() {
                var viewRedirectionForum = document.querySelectorAll('.foro');
                console.log("Foro", viewRedirectionForum);
                viewRedirectionForum.forEach(nodo => nodo.addEventListener('click', function(e) {
                    e.preventDefault();
                    // window.history.pushState('Foro', 'Foro', '/Foro')
                    viewForum()
                        .then(function() {
                            actionPost();
                        });

                }));
            }).then(function() {
                var viewRedirectionProfile = document.querySelectorAll('.perfil');
                console.log("Profile", viewRedirectionProfile);
                viewRedirectionProfile.forEach(nodo => nodo.addEventListener('click', function(e) {
                    e.preventDefault();
                    viewProfile();
                    window.history.pushState('perfil', 'Perfil', '/Perfil');
                }));
            })
            .then(function() {
                var viewRedirectionEditProfile = document.querySelectorAll('.editarPerfil');
                console.log("Foro", viewRedirectionEditProfile);
                viewRedirectionEditProfile.forEach(nodo => nodo.addEventListener('click', function(e) {
                    e.preventDefault();
                    editionOfProfile();
                    window.history.pushState('Editar Perfil', 'Editar Perfil', '/EditarPerfil');
                }));
            })
            .then(function() {
                var viewRedirectionGetOut = document.querySelectorAll('.cerrarSesion');
                console.log("cerrarSesion", viewRedirectionGetOut);
                viewRedirectionGetOut.forEach(nodo => nodo.addEventListener('click', function(e) {
                    e.preventDefault();
                    out();

                }));
            })
    })
    // por si quiero limpiar root: document.getElementById('root').innerHTML = '';

// Navegador en móvil
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});



// En esta parte hago la funcion que va tener mi boton al hacer click
// en entar a la aplicación en esta parte la que me hace entrar a la app (login)
function loginPageOne() {
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    var movilIcon = document.getElementById('movilIcon');

    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((data) => {
            console.log(data);
            viewForum(data.user); //BLISS
            document.getElementById('hideAndShow').style.display = 'block';
            movilIcon.classList.add('shown');
        })
        .catch(function(error) {
            alert('Los datos ingresados no son correctos');
            // Handle Errors here. puedo hacer algo despues del login, si salio mal
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // borrar o cambiar la pantalla
            // renderLogin()
        });
    var cred = firebase.auth.EmailAuthProvider.credential(email, pass);
};

// **************** L O G I N     G O O G L E*******
// En esta parte hago la funcion que va tener mi boton al hacer click
// en entar a la aplicación en esta parte  la que me hace entrar a la app con google (google)
function googleButton() {
    // Aquí se crea una instancia del objeto del proveedor de Google y facebook
    // esta instancia es para que me redireccione a google o de facebook, es la parte que me lleva a ellos.
    var provider = new firebase.auth.GoogleAuthProvider();
    var movilIcon = document.getElementById('movilIcon');

    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            viewForum(user)
                .then(function() {
                    actionPost();
                });
            document.getElementById('hideAndShow').style.display = 'block';
            movilIcon.classList.add('shown');
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}

// **************** L O G I N     F A C E B O O K *******

// En esta parte hago la funcion que va tener mi boton al hacer click
// en entar a la aplicación en esta parte  la que me hace entrar a la app con facebook (facebook)
function facebookButton() {
    var provider = new firebase.auth.FacebookAuthProvider();
    var movilIcon = document.getElementById('movilIcon');


    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            viewForum(user);
            movilIcon.classList.add('shown');
            document.getElementById('hideAndShow').style.display = 'block';
        }).catch(function(error) {
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        });
}
// ******** LOG OUT FUNCTION 
function out() {

    firebase.auth().signOut()
        .then(function() {
            document.getElementById('movilIcon').classList.toggle('shown');
            document.getElementById('hideAndShow').style.display = 'none';
        })
        .then(function() {
            viewLogin();
            window.history.pushState('cerrar sesion', 'cerrar sesion', '/');
        })
        .catch(function(error) {
            console.log(error);

        });
}

function register() {
    var registerNameLogin2 = document.getElementById('registerLoginName2').value;
    var registerEmailLogin2 = document.getElementById('registerLoginEmail2').value;
    var registerPassLogin2 = document.getElementById('registerLoginPass2').value;
    var registerConfirmPassLogin2 = document.getElementById('registerLoginConfirmPass2').value;
    var movilIcon = document.getElementById('movilIcon');
    if (registerPassLogin2 != registerConfirmPassLogin2) {
        alert('Las contraseñas deben coincidir');
    } else {
        firebase.auth().createUserWithEmailAndPassword(registerEmailLogin2, registerPassLogin2)
            .then((data) => {
                // alert('Bienvenido ' + data.user.email);
                viewForum(data.user);
                document.getElementById('hideAndShow').style.display = 'block';
                movilIcon.classList.add('shown');
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
            });
    }
}


function actionPost() {
    var boton = document.getElementById("addPost"); //aquí es cuando le doy click a el boton de publicar
    boton.onclick = function() {
        // console.log('qué está pasando');
        let text = document.getElementById("publicText"); //este es el ID que estoy llamando el cual está dentro de mi textarea
        var datosPost = { //esta variable (datosPost) es la que va contener lo datos, viene siendo un objeto lo cual se pintara en mi Database de firestore ---> CloudFirestore
            body: text.value,
            user: "Taquito",
            date: new Date(),
            img: 'link',
        }
        addNewPost(datosPost)
            .then(function(result) {
                alert('Post enviado!');
            })
            .then(function() {
                text.value = "";
            })
            .catch(err => {
                console.log(err);
            });
    }
}

function addNewPost(datosPost) {
    var postsCommitUser = db.collection('pruebaPractica'); //aquí coloco el nombre que va a tener mi nueva coleccion
    return postsCommitUser.add(datosPost);
}