
// 1 -- Hover sur les images dans le but de les zoomer en passant la souris dessus
$('.storyimage img').hover(function(){
  $(this).addClass('imagescale');
}, function(){
  $(this).removeClass('imagescale');
})

// 2 -- Pop-up d'accueil --> qui ne réapparaît pas si le cookie envoyé lors de la fermeture de ce pop-up est détecté
if (!localStorage.getItem('openedpopup') || localStorage.getItem('openedpopup') != 'false') { // le symbole != signifie "différent de" + NB: dans les cookies, on ne peut stocker que des strings
  $('#popup').show()
  $('#background-popup').show()
}

function closePopup() { // camel case + déclaration de fonction pour utilisation future de manière raccourcie
  $('#popup').hide()
  $('#background-popup').hide()
  localStorage.setItem('openedpopup', 'false')
}

$('#closeicon').on('click', closePopup) // reste en blanc par convention, on lui dit d'utiliser ce nom de fonction qui a été définie au-dessus

$('#background-popup').on('click', closePopup)

// -- Header
$('#header').prepend('<div id="menu-icon"><span class="first"></span><span class="second"></span><span class="third"></span></div>');
  
$("#menu-icon").on("click", function(){
  $("nav").slideToggle();
  $(this).toggleClass("active");
});

// -- formulaire 
// création des variables à partir d'id
var retour = document.getElementById('retour');
var nom = document.getElementById('nom');
var email = document.getElementById('email');
var texte = document.getElementById('commentaire');
var valider = document.getElementById('valider');


// validation de l'email via une expression régulière entre 2 slash et \S étant tout caractère sauf espace
function formatEmail(mail) {
  return /\S+@\S+\.\S+/.test(mail);
};


// fonction pour valider les données
function validation() {
  // création de la variable message
  var message = '';

  // conditions
  if(nom.value.length < 2) {
    message = message + "Merci de compléter votre nom <br />";
  }

  if(formatEmail(email.value) == false) {
    message = message + "Merci de fournir un email valide <br />";
  }

  if(texte.value.length == 0) {
    message = message + "Le message est vide <br />";
  }

  // si aucun message d'erreur n'est dans la variable message
  if(message.length == 0) {
    message = message + "Votre message a été envoyé avec succès !";
      
    retour.style.color = 'green';

  } 

  else {
    // si un message d'erreur est dans la variable message
    retour.style.color = 'red';
  }

  // le message est inseré dans le html
  retour.innerHTML = message;
}

// Méthode qui écoute un évènement sur le bouton validation et déclenche la fonction validation
valider && valider.addEventListener('click', validation); // && -> condition "et" (signe opérateur)

// 3 -- Scroll Up Button
//Get the button:
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  $('html, body').animate({scrollTop:0}, 'slow'); // For Chrome, Firefox, IE and Opera
} 

// 4 -- Hover sur le bouton de scroll vers le haut de page qui permet de faire faire une rotation à l'image (du robot) qui ce trouve dans ce bouton
$('#myBtn img').hover(function(){
  $(this).addClass('imagerotate');
}, function(){
  $(this).removeClass('imagerotate');
})

// 5 -- Vidéo dans Snowball Game (WIP)
var videoEl = document.querySelector('video');
document.querySelector('.video-button').addEventListener('click', 
                                                            function(){
  if(this.dataset.aperture === 'open') {
    this.dataset.aperture = 'closed';
    videoEl.pause();
    videoEl.progress = 0;
  } else {
    this.dataset.aperture = 'open';
    videoEl.play();
  }
});


// ci dessous l'exemple de base qui m'a permi de comprendre pas mal de notions vues au dessus, cet exemple servait à faire apparaitre un pop up contenant l'image exacte sur laquelle j'ai appuyé. ayant eu un soucis pour la faire apparaître là où je suis sur l'écran, j'y ai ajouté une fonction scrollTo(0.0) pour revenir directement en haut de la page afin de voir le popup
$('.encart').on('click', function() { // lorsque l'on clique sur notre block d'ID "encart"
	console.log($(this).find('img')) // fait apparaître les logs console quand on est dans notre browser (navigateur)
	var img = $(this).find('img')[0] //"find" me retourne à un tableau (voir "Console" dans le navigateur), et "[0]"" sélectionne le 1er élément du tableau dans lequel sont répertorié les images, et "this" précise l'encart exact dans lequel j'ai cliqué (car il y en a plusieurs)"
	$('#popup-content img').attr("src", $(img).attr("src")); // on donne la source de l'image sur laquelle on a cliqué à la source du popup qu'on fait apparaître
	$('#background-popup').show()
	$('#popup').show() //mettre les '' pour string
	window.scrollTo(0,0)
})