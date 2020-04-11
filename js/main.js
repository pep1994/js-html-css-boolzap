// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde. Quando clicco sull’input e quindi il cursore è pronto a scrivere per l’inserimento messaggio, l’icona cambia.

// step 2
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

// step 3
// Click sul contatto mostra la conversazione del contatto cliccato,
// è possibile inserire nuovi messaggi per ogni conversazione
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato

$(document).ready(function(){

  var inputChat, searchInput, textSearch, listContacts, dropdownMenuS, dropdownMenuR;


  inputChat = $('input[name="input_text"]'); // salvo in una variabile il riferimento all'input di chat
  inputChat.val(""); // imposto di default il valore vuoto per l'input di chat
  searchInput = $('#search'); // salvo il riferimento all'input di ricerca contatti
  searchInput.val(""); // imposto di default il valore vuoto per l'input di ricerca contatti
  listContacts = $('.chat-contacts li'); // salvo la selezione di tutti i contatti
  console.log(listContacts);
  dropdownMenuS = '<ul class="dropdown-menu s"><li class="info-message">Info messaggio</li><li class="remove-message">Cancella messaggio</li></ul>'; // salvo in una variabile il codice html rappresentante il dropdown-menu dei messaggi mandati da inserire nei messaggi inviati e ricevuti
  dropdownMenuR = '<ul class="dropdown-menu r"><li class="info-message">Info messaggio</li><li class="remove-message">Cancella messaggio</li></ul>'; // salvo in una variabile il codice html rappresentante il dropdown-menu dei messaggi ricevuti da inserire nei messaggi inviati e ricevuti


  // funzione che aggiunge uno zero all'inizio del numero
  function addZero(number) {
    if (number < 10) {
      number = '0' + number;
    }
  }

  // funzione che invia il messaggio che inserisce l'utente e riceve la risposta da parte del PC dopo un secondo
  function messageSentAndReceveid (){
    var textInput = inputChat.val(); // salvo il valore dell'input in una variabile
    var date = new Date(); // creo una variabile che ha in memoria la data completa
    var hours = date.getHours(); // salvo l'ora
    var minutes = date.getMinutes(); // salvo i minuti

    // siccome i minuti inferiori a 10 vengono stmapati senza lo zero davanti creo una condizione che mette uno zero prima del numero

    addZero(minutes);

    var time = hours + ":" + minutes; // salvo in una variabile l'ora e i minuti

    // se il messaggio è vuoto non fare nulla
    if (textInput == "") {

      // altrimenti inseriscilo nella finestra della conversazione
    } else {
        $('.content-right.active').append("<div class='chat chat-sent'>" + "<p class='text-message'>" + textInput + "</p>" + "<i class='fa fa-chevron-down'></i>" + "<span class='message-time'>" + time + "</span>" + dropdownMenuS + "</div>");

        inputChat.val(""); // il valore dell'input si azzera dopo che è stato inviato il messaggio

        $('.name-chat').find('small').text('Sta scrivendo...'); // sostituisco il testo con sta scrivendo... quando il messaggio viene inviato
        
        // timing function che manda il messaggio "ok" in risposta al messaggio dell'utente dopo 1s che l'utente ha scritto
        setTimeout(
          function () {
            $('.content-right.active').append("<div class='chat chat-receveid'>" + "<p class='text-message'>" + "ok" + "</p>" + "<i class='fa fa-chevron-down'></i>" + "<span class='message-time'>" + time + "</span>" + dropdownMenuR + "</div>");
            $('.name-chat').find('small').text("Ultimo accesso oggi alle " + time); // il testo sta scrivendo... viene sostituito dal testo precedente più l'ora dell'invio del suo messaggio
            $('li.active-chat .chat-time').text(time); // l'ora dell'ultimo messaggio inviato viene messa anche nel riquadro del contatto
            var textLastMsgReceveid = $('.content-right.active .chat-receveid:last p').text(); // salvo l'ultimo messaggio scritto dal contatto
            console.log(textLastMsgReceveid);
            $('li.active-chat .name-contact small').text(textLastMsgReceveid); // riporto l'ultimo messaggio scritto dal contatto nel riqudro del contatto
            var containerHeight =  $('.content-right.active').innerHeight(); // salvo l'altezza totale della finestra di chat ogni volta che viene inviato un messaggio
            // il container di chat scrolla per tutta l'altezza della finestra di chat, la quale aumeterà gradualmente con i messaggi inseriti
            $('.container-chat-right').animate({
              scrollTop: containerHeight

            }, 500 );

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
        $('.info-container').fadeOut(); // si chiude la finestra di info eventualmente aperta
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
      $(this).siblings().removeClass("active-chat"); // gli altri contatti non saranno attivi
      var dataContact = $(this).data('name'); // salvo il valore del data-attribute del contatto cliccato
      console.log(dataContact);
      var containerChat = $('.content-right'); // salvo il riferimento a tutte le finestre di chat
      containerChat.removeClass("active"); // rimuovo la class active da tutte le finestre di chat
      var profileImg = $(this).find('.img-container').html(); // salvo il contenuto html (quindi il tag che contiene l'immagine) del contenitore immagine di ogni contatto
      console.log(profileImg);
      $('.header-right').find('.img-container').find('.profile-img-container').html(profileImg); // sostituisco l'immagine del contatto che ha la chat aperta, con l'immagine del contatto selezionato
      var titleContact = $(this).find('h3').text(); // salvo il testo del nome contatto cliccato
      console.log(titleContact);
      $('.header-right').find('.img-container').find('h3').text(titleContact); // sostituisco il nome del contatto che ha la finestra di chat aperta con il nome del contatto selezionato
      $('.info-container').fadeOut(); // si chiude la finestra di info eventualmente aperta
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

  // aggancio l'evento click all'icona "down" per far aprire il menu-dropdown. Delego, però, l'evento click al primo "padre" creato staticamente, perchè l'icona è creata dinamicamente e non prenderebbe l'aggancio dell'evento.
  $('.content-right').on("click", ".fa-chevron-down",
    function(e) {
      e.stopPropagation();
      $(this).siblings("ul.dropdown-menu").slideToggle(); // quando l'icona viene cliccata seleziono suo "fratello" il menu-dropdown e gli dico di aprirsi e di chiudersi ricliccando sull'icona
  });

    // aggancio l'evento click all'opzione "cancella messaggio" del dropdown-menu per cancellare il messaggio. Delego, però, l'evento click al primo "padre" creato staticamente, perchè il dropdown-menu è creato dinamicamente e non prenderebbe l'aggancio dell'evento.
    $('.content-right').on("click", ".remove-message",
      function() {
        $(this).parents('.chat').remove(); // cliccando l'opzione cancella messaggio, seleziono suo "padre" con la classe "chat", che sarebbe il messaggio, e lo elimino
    });



    //////////////////// BONUS ////////////////////////////

    // aggancio l'evento scroll al container delle chat, in modo che quando scrolli appaia un link per rimandare all'inizio della chat
    $('.container-chat-right').scroll(
      function () {
        $('.content-right.active .to-up').addClass('active'); // quando il container scrolla appare il link
    });

    // aggancio l'evento click al link, se cliccato la finestra di chat scrolla fino a ritornare all'inizio della chat
    $('.to-up').click(
      function(){
        $('.container-chat-right').animate({
          scrollTop: 0
        }, 500 );
    });

    // aggancio l'evento click alla finestra di chat che delega l'evento all'opzione info messaggio del dropdown-menu dei messaggi inviati da me
    $('.content-right').on("click", ".dropdown-menu.s .info-message",
      function() {
        var date = new Date(); // creo una variabile che ha in memoria la data completa
        var minutes = date.getMinutes(); // salvo i minuti

        addZero(minutes);

        var timeMsg = $(this).parent().siblings('.message-time').text(); // salvo l'orario del messaggio scritto da me
        console.log(timeMsg);

        $('.info-container').fadeIn(); // la finestra delle info compare
        $('.dropdown-menu.s').fadeOut(); // scompare il dropdown-menu
        $('.info-container .title-name-msg').text("Il messaggio è stato inviato da: Marco"); // aggiungo testo
        $('.info-container .title-time-msg').text("Il messaggio è stato inviato alle ore: " + timeMsg); // aggiungo l'ora di invio messaggio

    });

    // aggancio l'evento click alla finestra di chat che delega l'evento all'opzione info messaggio del dropdown-menu dei messaggi ricevuti dai contatti
    $('.content-right').on("click", ".dropdown-menu.r .info-message",
      function() {
        var date = new Date(); // creo una variabile che ha in memoria la data completa
        var minutes = date.getMinutes(); // salvo i minuti

        addZero(minutes);

        var timeMsg = $(this).parent().siblings('.message-time').text(); // salvo l'orario del messaggio scritto da me
        console.log(timeMsg);
        var nameContact = $('.chat-contacts li.active-chat').find('h3').text(); // salvo il nome del contatto attivo
        console.log(nameContact);

        $('.info-container').fadeIn(); // la finestra delle info compare
        $('.dropdown-menu.r').fadeOut(); // scompare il dropdown-menu
        $('.info-container .title-name-msg').text("Il messaggio è stato inviato da: " + nameContact); // aggiungo il nome del contatto che ha inviato il messaggio
        $('.info-container .title-time-msg').text("Il messaggio è stato inviato alle ore: " + timeMsg); // aggiungo l'ora di invio messaggio

    });

    // aggancio l'evento all'icona "X". Al click la finestra di info viene chiusa
    $('.close').click(function(){
      $('.info-container').hide();
    });


    // cliccando da qualsiasi parte i menu dropdown si chiudono
    $(window).click(
      function(){
        $("ul.dropdown-menu").slideUp();
    });



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
