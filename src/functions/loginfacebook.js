// En esta parte hago la funcion que va tener mi boton al hacer click
// en entar a la aplicación en esta parte  la que me hace entrar a la app con facebook (facebook)
function facebookButton() {
    let provider = new firebase.auth.FacebookAuthProvider();
    let movilIcon = document.getElementById('movilIcon');

    firebase.auth().signInWithPopup(provider)
        .then(function(data) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            let token = data.credential.accessToken;
            // The signed-in user info.
            let user = data.user;
            clickMenus(user);
            viewForum(user)
                .then(function() {
                    publicPost();
                }).then(function() {
                    localStorage.setItem('userdata', JSON.stringify(user)); //aquí le digo que guarde como un json formateado mi objeto
                })
            movilIcon.classList.add('shown');
            document.getElementById('hideAndShow').style.display = 'block';
        })
        .catch(function(error) {
            console.log(error);
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
        });
};

export { facebookButton }