// Boutons et champs
var envoyer = document.getElementById("valider"); // Valider
var msgbox = document.getElementById("message"); // Champ de message
var writing = document.getElementById("typingMsg"); // Box "typing"
var bdd = document.getElementById("bdd"); // Box BDD
var messenger = document.getElementById("messenger"); // Box avec messages
var online_users = document.getElementById("online_users"); // Utilisateurs en ligne

var signin = document.getElementById("signin"); // Bouton inscription
var signin_modal = document.getElementById("signin_modal"); // Modal inscription
var signin_form_button = document.getElementById("signin_validate"); // Bouton formulaire

var login = document.getElementById("login"); // Bouton connexion
var login_modal = document.getElementById("login_modal"); // Modal connexion
var login_form_button = document.getElementById("login_validate"); //Bouton formulaire

var close_modal = document.getElementsByClassName("close"); // Bouton fermeture modal


/// Évènements
if (msgbox || envoyer) {
    msgbox.addEventListener("keypress", writingMsg); // En train d'écrire...
    envoyer.addEventListener("click", envoiMsg); // Envoyer le message

    // Boucles 
    setInterval(bddToMessenger, 4000);
    setInterval(online_users_check, 30000);

    // Au chargement de la page
    online_users_check()
} 

if (signin || login) {
    // Évènements
    signin_form_button.addEventListener("click", function() {signin_user()});
    login_form_button.addEventListener("click", function() {login_user()});

    // Lorsqu'on clique sur le bouton
    signin.onclick = function() { signin_modal.style.display = "block"; };
    login.onclick = function() { login_modal.style.display = "block"; };

    // Lorsqu'on clique sur le bouton de fermeture du modal
    close_modal[0].onclick = function() {signin_modal.style.display = "none";};
    close_modal[1].onclick = function() {login_modal.style.display = "none";};

    // Lorsque l'on clique en dehors du modal, fermer le modal
    window.onclick = function(event) {
    if (event.target == login_modal || event.target == signin_modal) {
        login_modal.style.display = "none";
        signin_modal.style.display = "none";
        }
    };
}

// Fonctions de messagerie

function addEmoji(emoji) { msgbox.value += emoji; }

function online_users_check() {
    $.ajax({ // Mettre à jour le statut de connexion
        type: "POST",
        headers: {"Access-Control-Allow-Origin": "*"},
        url: "http://localhost:5000/api/user/status"
    }).done(function (data) {
        if (data != "False") { messenger.innerHTML = data; }
    });  

    $.ajax({ // Mettre à jour le nombre de personnes connectées
        type: "GET",
        headers: {"Access-Control-Allow-Origin": "*"},
        url: "http://localhost:5000/api/users/online"
    }).done(function (data) {
        if (data != "False") { online_users.innerHTML = data; }
    });  
}

function signin_user() {
    var pseudo = document.getElementById("signin_username").value;
    var pw = document.getElementById("signin_pw").value;

    $.ajax({ // Enregistre l'utilisateur dans la BDD
        type: "GET",
        headers: {"Access-Control-Allow-Origin": "*"},
        url: "http://localhost:5000/api/auth/signin/"+encodeURI(pseudo)+"/"+encodeURI(pw)
    }).done(function (data) {
        if (data == "True") {
            document.getElementById("signin_modal_content").style.backgroundColor = "green";
        } else {
            document.getElementById("signin_modal_content").style.backgroundColor = "red";
        }
    });
}

function login_user() {
    var pseudo = document.getElementById("login_username").value;
    var pw = document.getElementById("login_pw").value;

    $.ajax({ // Connecte et affiche la page via l'ajax
        type: "GET",
        headers: {"Access-Control-Allow-Origin": "*"},
        url: "http://localhost:5000/api/auth/login/"+encodeURI(pseudo)+"/"+encodeURI(pw)
    }).done(function (data) {
        if (data == "False") {
            document.getElementById("login_modal_content").style.backgroundColor = "red";
        } else {
            $("body").html(data);
        }
    });
}

function save_bdd() { // Enregistre à la base de données
    var ajax = new XMLHttpRequest();
    var url = "http://localhost:5000/api/message/new/" + encodeURI(msgbox.value)
    ajax.open("POST", url, true);
    ajax.send();

    $.ajax({ 
        type: "GET",
        headers: {"Access-Control-Allow-Origin": "*"},
        url: "http://localhost:5000/api/stats/messages"
    }).done(function (data) {
        if (data != "False") {
            document.getElementById("total_msg").innerHTML = data;
        }
    });
}

function writingMsg() { // Afficher le en train d'écrire
    console.log("Vous êtes en train d'écrire...");
    bdd.style.backgroundColor = "gray";
    bdd.innerHTML = "Vous êtes en train d'écrire...";
    if (event.key == "Enter") { envoiMsg(); };
  }

function bddToMessenger() {
    $.ajax({ // Retourrner tous les messages de la BDD
        type: "GET",
        headers: {"Access-Control-Allow-Origin": "*"},
        url: "http://localhost:5000/api/messages"
    }).done(function (data) {
        if (data != "False") {
            messenger.innerHTML = data;
            var elem = document.getElementById('messenger');
            elem.scrollTop = elem.scrollHeight;
        }
    });

    bdd.style.backgroundColor = null;
    bdd.innerHTML = null;
};

function envoiMsg() {
    save_bdd();
    msgbox.value = null;
    bdd.innerHTML = "Traitement...";
    bdd.style.backgroundColor = "orange";
}

