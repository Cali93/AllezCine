// COOKIE

(function(){

  //Change these values
  let msg = "We use cookies to enhance your web browsing experience. By continuing to browse the site you agree to our policy on cookie usage.";
  let closeBtnMsg = "OK";
  let privacyBtnMsg = "Privacy Policy";
  let privacyLink = "https://www.google.com";

  //check cookies
  if(document.cookie){
   let cookieString = document.cookie;
   let cookieList = cookieString.split(";");
   // if cookie named OKCookie is found, return
   for(x = 0; x < cookieList.length; x++){
     if (cookieList[x].indexOf("OKCookie") != -1){return};
   }
  }

  let docRoot = document.body;
  let okC = document.createElement("div");
  okC.setAttribute("id", "okCookie");
  let okCp = document.createElement("p");
  let okcText = document.createTextNode(msg);

  //close button
  let okCclose = document.createElement("a");
  let okcCloseText = document.createTextNode(closeBtnMsg);
  okCclose.setAttribute("href", "#");
  okCclose.setAttribute("id", "okClose");
  okCclose.appendChild(okcCloseText);
  okCclose.addEventListener("click", closeCookie, false);

  //privacy button
  let okCprivacy = document.createElement("a");
  let okcPrivacyText = document.createTextNode(privacyBtnMsg);
  okCprivacy.setAttribute("href", privacyLink);
  okCprivacy.setAttribute("id", "okCprivacy");
  okCprivacy.appendChild(okcPrivacyText);

  //add to DOM
  okCp.appendChild(okcText);
  okC.appendChild(okCp);
  okC.appendChild(okCclose);
  okC.appendChild(okCprivacy);
  docRoot.appendChild(okC);

  okC.classList.add("okcBeginAnimate");

  function closeCookie(){
    let cookieExpire = new Date();
    cookieExpire.setFullYear(cookieExpire.getFullYear() +2);
    document.cookie="OKCookie=1; expires=" + cookieExpire.toGMTString() + ";";
    docRoot.removeChild(okC);
  }

  // let subAge = document.getElementById('submitAge')
  // subAge.addEventListener('click', function(){
  //   let cookieExpire = new Date();
  //   cookieExpire.setFullYear(cookieExpire.getFullYear() +2);
  //   document.cookie="submitAge>=18; expires=" + cookieExpire.toGMTString() + ";";
  // })

})();

// Plus de films

let filmsBtn = document.getElementById('plusDeFilms')
let hiddenM = document.getElementById('hiddenM')

filmsBtn.addEventListener("click", function(){
    if (hiddenM.style.display === 'none' || hiddenM.style.display === '') {
      hiddenM.style.display = 'block'
      filmsBtn.value = 'MOINS DE FILMS'
    } else {
      hiddenM.style.display = 'none'
      filmsBtn.value = 'PLUS DE FILMS'
    }
});

// Plus de series

let seriesBtn = document.getElementById('plusDeSeries')
let hiddenS = document.getElementById('hiddenS')

seriesBtn.addEventListener("click", function(){
    if (hiddenS.style.display === 'none' || hiddenS.style.display === '') {
      hiddenS.style.display = 'block'
      seriesBtn.value = 'MOINS DE SERIES'
    } else {
      hiddenS.style.display = 'none'
      seriesBtn.value = 'PLUS DE SERIES'
    }
});

// LOGIN BUTTON

$(function() {

    let $formLogin = $('#login-form');
    let $formLost = $('#lost-form');
    let $formRegister = $('#register-form');
    let $divForms = $('#div-forms');
    let $modalAnimateTime = 300;
    let $msgAnimateTime = 150;
    let $msgShowTime = 2000;

    $("form").submit(function () {
        switch(this.id) {
            case "login-form":
                let $lg_username=$('#login_username').val();
                let $lg_password=$('#login_password').val();
                if ($lg_username == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }
                return false;
                break;
            case "lost-form":
                let $ls_email=$('#lost_email').val();
                if ($ls_email == "ERROR") {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
                } else {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
                }
                return false;
                break;
            case "register-form":
                let $rg_username=$('#register_username').val();
                let $rg_email=$('#register_email').val();
                let $rg_password=$('#register_password').val();
                if ($rg_username == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                } else {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
                }
                return false;
                break;
            default:
                return false;
        }
        return false;

    });

    $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
    $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
    $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
    $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
    $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
    $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });

    function modalAnimate ($oldForm, $newForm) {
        let $oldH = $oldForm.height();
        let $newH = $newForm.height();
        $divForms.css("height",$oldH);
        $oldForm.fadeToggle($modalAnimateTime, function(){
            $divForms.animate({height: $newH}, $modalAnimateTime, function(){
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }

    function msgFade ($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        let $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
  		}, $msgShowTime);
    }

// MOVIES DISPLAY
    $('#allMovies').click(function() {
      $('.actionz').show()
      $('.aventure').show()
      $('.policier').show()
      $("#hiddenM").hide()
      $("#plusDeFilms").show()
    })

    // SHOW ACTION MOVIES

    $('#actionMovies').click(function() {
      $('.actionz').show()
      $('.aventure').hide()
      $('.policier').hide()
      $("#hiddenM").css("display", "block");
      $("#plusDeFilms").hide()
    })

    // SHOW Adv MOVIES

    $('#Aventures').click(function() {
      $('.actionz').hide()
      $('.aventure').show()
      $('.policier').hide()
      $("#hiddenM").css("display", "block");
      $("#plusDeFilms").hide()
    })

    // SHOW Policier MOVIES

    $('#policierMovies').click(function() {
      $('.actionz').hide()
      $('.aventure').hide()
      $('.policier').show()
      $("#hiddenM").css("display", "block");
      $("#plusDeFilms").hide()
    })

    // SERIES DISPLAY
    $('#allSeries').click(function() {
      $('.actionzS').show()
      $('.aventureS').show()
      $('.policierS').show()
      $("#hiddenS").hide()
      $("#plusDeSeries").show()
    })

    // SHOW ACTION MOVIES

    $('#actionSeries').click(function() {
      $('.actionzS').show()
      $('.aventureS').hide()
      $('.policierS').hide()
      $("#hiddenS").css("display", "block");
      $("#plusDeSeries").hide()
    })

    // SHOW Adv MOVIES

    $('#AventuresSeries').click(function() {
      $('.actionzS').hide()
      $('.aventureS').show()
      $('.policierS').hide()
      $("#hiddenS").css("display", "block");
      $("#plusDeSeries").hide()
    })

    // SHOW Policier MOVIES

    $('#policierSeries').click(function() {
      $('.actionzS').hide()
      $('.aventureS').hide()
      $('.policierS').show()
      $("#hiddenS").css("display", "block");
      $("#plusDeSeries").hide()
    })
});

// FOOTER BUTTON

let footerSection = document.getElementById ('footer-anchor')
let aBtn = document.createElement ('a')
let footerBtn = document.createElement ('div')
let footerBtnText = document.createTextNode ('⇡')

  aBtn.href='#top'
  footerBtn.classList.add ('footerBtn')
  footerBtn.appendChild(footerBtnText)
  aBtn.appendChild(footerBtn)
  footerSection.appendChild(aBtn)



// FONCTIONS COOKIE AGE

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

// Submit with enter
$('.input').keypress(function (e) {
  if (e.which == 13) {
    $('form#ageFrom').submit();
    return false;
  }
});
  // DEMANDE AGE
document.getElementById('submitAge').addEventListener('click',functionAge);

function functionAge(e){
      e.preventDefault();
      var age = document.getElementById("age").value;
      var submitAge = document.getElementById("submitAge");
      var txt = document.getElementById("reponse");

      if (age == "" || age == null){
            txt.innerHTML ="Veuillez entrer un age";
            console.log("Veuillez entrer un age");
      }
      else{
            if (age>=18){
                  // console.log("ok entrez");
            var hide = document.getElementById("blockBlanc");
            hide.classList.add('hide');
            }
            else if (age<=17){
                  window.location = "https://www.youtube.com/watch?v=rCPBvzML6-A";
                  // txt.innerHTML ="Vous etes trop petit";
                  // console.log("Vous etes trop petit");
            }
      }
}





// Modal Batman.................................

document.getElementById('batmanModalImage').addEventListener('click',modalBatman);

function modalBatman(e){
      e.preventDefault();

}

// Modal Hostel................................
document.getElementById('hostelModalImage').addEventListener('click',hostelModal);

function hostelModal(e){
      e.preventDefault();

}
// Modal inception................................
document.getElementById('inceptionModalImage').addEventListener('click',inceptionModal);

function inceptionModal(e){
      e.preventDefault();

}
// Modal intouchable................................
document.getElementById('intouchableModalImage').addEventListener('click',intouchableModal);

function intouchableModal(e){
      e.preventDefault();

}
// Modal Seigneur des anneaux les deux tours................................
document.getElementById('seigneurModalImage').addEventListener('click',seigneurModal);

function seigneurModal(e){
      e.preventDefault();

}

document.getElementById('next').addEventListener('click',functionNext);
function functionNext(e){
    e.preventDefault();
    var un = document.getElementById('un');
    var deux = document.getElementById('deux');
    var trois = document.getElementById('trois');
    var quatre = document.getElementById('quatre');
    var cinq = document.getElementById('cinq');
    var six = document.getElementById('six');
    var sept = document.getElementById('sept');
    var huit = document.getElementById('huit');


var toto= 0;
switch(toto){
  case 1:
  var suivant = document.getElementById('deux');
  var precedent = document.getElementById('un');
  suivant.classList.remove('hide');
  precedent.classList.add('hide');
  break;

  case 2:
  var suivant = document.getElementById('trois');
  var precedent = document.getElementById('deux');
  suivant.classList.remove('hide');
  precedent.classList.add('hide');
  break;

  case 3:
  var suivant = document.getElementById('quatre');
  var precedent = document.getElementById('trois');
  suivant.classList.remove('hide');
  precedent.classList.add('hide');

}


}
