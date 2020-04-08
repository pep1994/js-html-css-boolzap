// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde. Quando clicco sull’input e quindi il cursore è pronto a scrivere per l’inserimento messaggio, l’icona cambia.

// step 2
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

$(document).ready(function(){

  var inputChat, searchInput, textSearch, listContacts;


  inputChat = $('input[name="input_text"]'); // salvo in una variabile il riferimento all'input di chat
  inputChat.val(""); // imposto di default il valore vuoto per l'input di chat
  searchInput = $('#search'); // salvo il riferimento all'input di ricerca contatti
  searchInput.val(""); // imposto di default il valore vuoto per l'input di ricerca contatti
  listContacts = $('.chat-contacts li'); // salvo la selezione di tutti i contatti
  console.log(listContacts);


  // funzione che invia il messaggio che inserisce l'utente e riceve la risposta da parte del PC dopo un secondo
  function messageSentAndReceveid (){
    var textInput = inputChat.val(); // salvo il valore dell'input in una variabile

    // se il messaggio è vuoto non fare nulla
    if (textInput == "") {

      // altrimenti inseriscilo nella finestra della conversazione
    } else {
        $('.content-right').append("<div class='chat chat-send'>" + "<p class='text-message'>" + textInput + "</p>" + "<i class='fa fa-chevron-down'></i>" + "<span class='message-time'>13:42</span>" + "</div>");

        inputChat.val(""); // il valore dell'input si azzera dopo che è stato inviato il messaggio

        // timing function che manda il messaggio "ok" in risposta al messaggio dell'utente dopo 1s che l'utente ha scritto
        setTimeout(
          function () {
            $('.content-right').append("<div class='chat chat-receveid'>" + "<p class='text-message'>" + "ok" + "</p>" + "<i class='fa fa-chevron-down'></i>" + "<span class='message-time'>13:43</span>" + "</div>");
        }, 1000);
    }
  }


  // aggancio gli eventi focus e tastiera all'input di chat
  inputChat.on({

    // quando l'input di chat prende il focus scompare l'icona del microfono e appare l'icona per inviare il messaggio
    focus:
      function(){
        $('.microphone').hide();
        $('.plane').show();
      },
    // se l'utente ha premuto il tasto invio mentre era sull'input richiama la funzione di invio e ricezione messaggio
    keyup:
      function (e) {
        if (e.keyCode == 13) {
          messageSentAndReceveid();
        }
      }
  });


  // quando l'input di chat perde il focus scompare l'icona dell'invio messaggio e riappare l'icona del microfono
  inputChat.blur(
    function(){
      $('.plane').hide();
      $('.microphone').show();
  });


  // quando l'utente clicca per inviare il messaggio esegui la funzione di invio e ricevimento messaggio
  $('.icon-container').click(messageSentAndReceveid);


  // all'input di ricerca aggancio l'evento input che si scatena ogni volta che il valore dell'input cambia
  searchInput.on({
    input:
    function () {
      textSearch = searchInput.val().toLowerCase(); // salvo il valore che ha scritto l'utente e lo converto in minuscolo
      console.log(textSearch);

    // ciclo tutti i contatti per selezionare il nome del contatto e confrontarlo con il valore inserito dall'utente
      listContacts.each(
        function () {
          var nameContact = $(this).find('h3').text().toLowerCase(); // salvo il nome di ogni singolo contatto e lo converto in minuscolo
          console.log(nameContact);
        // confronto il valore che ha inserito l'utente con i nomi dei contatti
        // se il valore inserito dall'utente è incluso nei nomi dei contatti allora questi contatti rimangono visualizzati nella ricerca, altrimenti scompaiono
          if (nameContact.includes(textSearch)) {
            $(this).show();
          } else {
            $(this).hide();
          }
      });
    }
  });

  console.log($('.chat-contacts'));

  // aggancio l'evento tastiera alla sezione dei contatti. Quando viene premuto il tasto freccia in giù la selezione del contatto si sposterà di conseguenza, stesso discorso per la freccia in su
  $('.chat-contacts').keydown(
    function (event) {
      var itemActive = $('li.active');
      console.log(event.which);
      console.log(event.target);
      if (event.which == 40) {
        itemActive.removeClass("active");
        itemActive.next().addClass("active");
      }

      if (event.which == 38) {
        itemActive.removeClass("active");
        itemActive.prev().addClass("active");
      }

      if (event.which == 40 && itemActive.hasClass('last')) {
        itemActive.removeClass("active");
        $('li.first').addClass("active");
      }

      if (event.which == 38 && itemActive.hasClass('first')) {
        itemActive.removeClass("active");
        $('li.last').addClass("active");
      }
  });

  // aggancio l'evento click ai contatti così la classe active viene data solo al contatto cliccato
  $('.chat-contacts li').click(
    function () {
      $(this).addClass("active");
      $(this).siblings().removeClass("active");
  });


});
