function editionOfProfile(user) {
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
    var name = user.displayName ? user.displayName : EmailCortado;

    return new Promise(function(resolve, rejected) {
        let editProfileVieView = ` 
    <!-- *********** PAGINA 4 EDITAR PERFIL   *********** -->
    <div id="containerFour">
        <div>
            <p class="chip boxStyle2">Editar Perfil</p>
        </div>

        <div class="littleCircle secondCircle">
            <img src="${image}" alt="foto de perfil usuario" class="responsive-img photo">
            <p class="changePhoto">Cambiar foto</p>
        </div>
        <div class="namePerfilUser editNameProfile"><strong class="black-text perfilName little">${name}</div> 

        <form action="" class="formPerfil">
            <label for="" class="perfilChanges">
        <input id="changeName" value="${name}" type="text" class="chageName boxFields" required="" aria-required="true" placeholder="Cambia tu nombre">
      </label>
            <label for="" class="perfilChanges">
        <input id="changeProfession" type="text" class="chageProfession boxFields" required="" aria-required="true" placeholder="Cambia tu profesión">
      </label>
            <label for="" class="changePassword">
        <input type="password" placeholder="Cambia tu contraseña" class="validatePassword boxFields" required="" aria-required="true">
      </label>
            <label for="" class="changePassword">
        <input type="password" placeholder="Confirma tu contraseña" class="validatePassword  boxFields" required="" aria-required="true">
      </label>
            <button id="saveChangesButton" type="submit" class="waves-effect waves-light btn-small btn-login">Guardar cambios</button>
        </form>
    </div>
        `
        root.innerHTML = editProfileVieView;
        resolve();
    });
};

export { editionOfProfile }