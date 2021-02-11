// Boutons et champs
var envoyer = document.getElementById("valider"); // Valider
var msgbox = document.getElementById("message"); // Champ de message
var writing = document.getElementById("typingMsg"); // Box "typing"
var bdd = document.getElementById("bdd"); // Box BDD
var messenger = document.getElementById("messenger"); // Box avec messages

// Évènements
msgbox.addEventListener("keypress", writingMsg); // En train d'écrire...
envoyer.addEventListener("click", envoiMsg); // Envoyer le message


// Boucles
setInterval(bddToMessenger, 3000);

// Ajax
function save_bdd() {
    var ajax = new XMLHttpRequest();
    var url = "http://localhost:5000/api/message/new/" + encodeURI(msgbox.value)
    ajax.open("POST", url, true);
    ajax.send();
}

function writingMsg() { // Afficher le en train d'écrire
    console.log("Vous êtes en train d'écrire...");
    bdd.style.backgroundColor = "gray";
    bdd.innerHTML = "Vous êtes en train d'écrire...";
    if (event.key == "Enter") {
        envoiMsg();
    };
  }

function bddToMessenger() {
        var ajax = new XMLHttpRequest();
        var url = 'http://localhost:5000/api/messages';
        ajax.open("GET", url, true);
        ajax.send();

        ajax.onload = function(){
            if (ajax.status == 200){
                var reponse = ajax.response;
                messenger.innerHTML = reponse;
                var elem = document.getElementById('messenger');
                elem.scrollTop = elem.scrollHeight;
            } 
            else{
                console.log('Impossible de récupérer la demande Ajax !');
            }
          }

        bdd.style.backgroundColor = null;
        bdd.innerHTML = null;
    };

function addEmoji(emoji) {
    msgbox.value += emoji;
}

function envoiMsg() {
    save_bdd();
    msgbox.value = null;
    bdd.innerHTML = "Traitement...";
    bdd.style.backgroundColor = "orange";
    
    
}

// function bddToMessenger() {
//     if (bdd.innerHTML) {
//         console.log("un message!");
//         // On a un message, traiter et envoyer au messenger
//         messenger.innerHTML = messenger.innerHTML + bdd.innerHTML + "<br>";
//         bdd.innerHTML = null;
//     }
// }

