function viewForum(user) {
    console.log(user);

    var EmailCortado = 'No hay email';

    if (typeof user != 'undefined') {
        var email = user.email;
        var divisiones = email.split("@");
        EmailCortado = divisiones[0];
    }

    var image = "images/profile-picture-green.jpg";
    if (user.photoURL != null) {
        image = user.photoURL;
    }
    return new Promise(function(resolve, rejected) {
        let forumView = ` <!-- ***********PAGINA 3********* -->
    <div id="containerThree">
        <section class="profileInformation">
            <div>
                <div class="littleCircle">
                    <img src="${image}" alt="foto de perfil usuario" class="responsive-img photo">
                </div>

                <div class="personalInformationPerfilUser">
                    <div class="namePerfilUser" id="userproperty"><strong class="black-text perfilName little">
                    ${EmailCortado}
                    <i class="material-icons center editProfileIcon">edit</i></strong></div>
                    <div class="professionDescription">Profesión</div>
                </div>
            </div>
        </section>
       
        <div>
            <p>
                <textarea id="userCommit" class="comentUser" name="description" placeholder="Escribe un commit..."></textarea>
            </p>
            
            <div class="right-align">
                <input id="myNewFile" type="file" name="myNewFile" accept="image" class="publication">
                <label class="waves-effect waves-light btn-small" for="myNewFile"> <i class="material-icons center">image</i></label>
                <button id="publish" class="waves-effect waves-light btn-small imegeOfPersonalCommit publication2" ><i class="material-icons right">computer</i>Publicar</button>
            </div>
        </div>

         <div id="showComment"></div>   
    </div>`
        root.innerHTML = forumView;
        resolve();
    });
};

export { viewForum }