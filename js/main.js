// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde. Quando clicco sull’input e quindi il cursore è pronto a scrivere per l’inserimento messaggio, l’icona cambia.

// step 2
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

// step 3
// Click sul contatto mostra la conversazione del contatto cliccato,
// è possibile inserire nuovi messaggi per ogni conversazione
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato

$(document).ready(function(){

  var inputChat, searchInput, textSearch, listContacts, dropdownMenu;


  inputChat = $('input[name="input_text"]'); // salvo in una variabile il riferimento all'input di chat
  inputChat.val(""); // imposto di default il valore vuoto per l'input di chat
  searchInput = $('#search'); // salvo il riferimento all'input di ricerca contatti
  searchInput.val(""); // imposto di default il valore vuoto per l'input di ricerca contatti
  listContacts = $('.chat-contacts li'); // salvo la selezione di tutti i contatti
  console.log(listContacts);
  dropdownMenu = '<ul class="dropdown-menu"><li>Info messaggio</li><li>Cancella messaggio</li></ul>'


  // funzione che invia il messaggio che inserisce l'utente e riceve la risposta da parte del PC dopo un secondo
  function messageSentAndReceveid (){
    var textInput = inputChat.val(); // salvo il valore dell'input in una variabile

    // se il messaggio è vuoto non fare nulla
    if (textInput == "") {

      // altrimenti inseriscilo nella finestra della conversazione
    } else {
        $('.content-right.active').append("<div class='chat chat-sent'>" + "<p class='text-message'>" + textInput + "</p>" + "<i class='fa fa-chevron-down'></i>" + "<span class='message-time'>13:42</span>" + dropdownMenu + "</div>");

        inputChat.val(""); // il valore dell'input si azzera dopo che è stato inviato il messaggio

        // timing function che manda il messaggio "ok" in risposta al messaggio dell'utente dopo 1s che l'utente ha scritto
        setTimeout(
          function () {
            $('.content-right.active').append("<div class='chat chat-receveid'>" + "<p class='text-message'>" + "ok" + "</p>" + "<i class='fa fa-chevron-down'></i>" + "<span class='message-time'>13:43</span>" + dropdownMenu + "</div>");
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

  // aggancio l'evento click ai contatti
  $('.chat-contacts li').click(
    function () {
      $(this).addClass("active-chat"); // diventerà attivo solo il contatto cliccato
      $(this).siblings().removeClass("active-chat"); // gli altri contatti non saranno selezionati
      var dataContact = $(this).data('name'); // salvo il valore del data-attribute del contatto cliccato
      console.log(dataContact);
      var containerChat = $('.content-right'); // salvo il riferimento a tutte le finestre di chat
      containerChat.removeClass("active"); // rimuovo la class active da tutte le finestre di chat
      containerChat.each( // eseguo un ciclo sulle finestre di chat per estrapolare il valore del data-attribute ad ogni iterazione
        function () {
        var dataChat = $(this).data('name'); // salvo il valore del data-attribute della finestra di chat a quella iterazione

        // se il data-attribute del contatto cliccato corrisponde a quello della finestra di chat allora mostrami quella finestra di chat, altrimenti tienimela nascosta
        if (dataContact === dataChat) {
          $(this).addClass('active');
          console.log(dataChat);
        }
      });
  });

  // aggancio l'evento click all'icona "down" per far aprire il mneu-dropdown. Delego, però, l'evento click al primo "padre" creato staticamente, perchè l'icona è creata dinamicamente e non prenderebbe l'aggancio dell'evento.
  $('.content-right').on("click", ".fa-chevron-down",
    function(event) {
      $(this).siblings("ul.dropdown-menu").slideToggle(); // quando l'icona viene cliccata seleziono suo "fratello" il menu-dropdown e gli dico di aprirsi e di chiudersi ricliccando sull'icona
    });

    // // cliccando da qualsiasi parte i menu dropdown si chiudono
    // $(window).click(
    //   function(){
    //     $("ul.dropdown-menu").slideUp();
    // });

  console.log($('.chat-contacts'));

  // aggancio l'evento tastiera alla sezione dei contatti. Quando viene premuto il tasto freccia in giù la selezione del contatto si sposterà di conseguenza, stesso discorso per la freccia in su
  // $('.chat-contacts').keydown(
  //   function (event) {
  //     var itemActive = $('li.active');
  //     console.log(event.which);
  //     console.log(event.target);
  //     if (event.which == 40) {
  //       itemActive.removeClass("active");
  //       itemActive.next().addClass("active");
  //     }
  //
  //     if (event.which == 38) {
  //       itemActive.removeClass("active");
  //       itemActive.prev().addClass("active");
  //     }
  //
  //     if (event.which == 40 && itemActive.hasClass('last')) {
  //       itemActive.removeClass("active");
  //       $('li.first').addClass("active");
  //     }
  //
  //     if (event.which == 38 && itemActive.hasClass('first')) {
  //       itemActive.removeClass("active");
  //       $('li.last').addClass("active");
  //     }
  // });



});
