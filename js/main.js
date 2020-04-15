// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde. Quando clicco sull’input e quindi il cursore è pronto a scrivere per l’inserimento messaggio, l’icona cambia.

// step 2
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

// step 3
// Click sul contatto mostra la conversazione del contatto cliccato,
// è possibile inserire nuovi messaggi per ogni conversazione
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato

// aggiunta bonus

$(document).ready(function(){

  var inputChat, searchInput, textSearch, listContacts, dropdownMenuS, dropdownMenuR;

  inputChat = $('input[name="input_text"]'); // salvo in una variabile il riferimento all'input di chat
  inputChat.val(""); // imposto di default il valore vuoto per l'input di chat
  searchInput = $('#search'); // salvo il riferimento all'input di ricerca contatti
  searchInput.val(""); // imposto di default il valore vuoto per l'input di ricerca contatti
  listContacts = $('.chat-contacts li'); // salvo la selezione di tutti i contatti
  // dropdownMenuS = '<ul class="dropdown-menu s"><li class="info-message">Info messaggio</li><li class="remove-message">Cancella messaggio</li></ul>'; // salvo in una variabile il codice html rappresentante il dropdown-menu dei messaggi mandati da inserire nei messaggi inviati e ricevuti
  // dropdownMenuR = '<ul class="dropdown-menu r"><li class="info-message">Info messaggio</li><li class="remove-message">Cancella messaggio</li></ul>'; // salvo in una variabile il codice html rappresentante il dropdown-menu dei messaggi ricevuti da inserire nei messaggi inviati e ricevuti

  // creo un array di emoji
  var emoji = ['&#128512','&#128513','&#128514','&#128515','&#128516','&#128517','&#128518','&#128519','&#128519','&#128520','&#128521','&#128522','&#128523','&#128524','&#128525','&#128526','&#128527','&#128528','&#128529','&#128530','&#128531','&#128532', '&#128533','&#128534','&#128535','&#128536','&#128537','&#128538','&#128539','&#128540','&#128541','&#128542','&#128543','&#128544','&#128545','&#128546','&#128547','&#128548','&#128549','&#128550','&#128551','&#128552','&#128553','&#128554','&#128555','&#128556','&#128557','&#128558','&#128559','&#128560','&#128561','&#128562','&#128563','&#128564','&#128565','&#128566','&#128567','&#128577','&#128578','&#128579','&#128580','&#129297','&#129298','&#129299','&#129300','&#129301','&#129312','&#129313','&#129314','&#129315','&#129316','&#129317','&#129319','&#129320','&#129321','&#129322','&#129323','&#129324','&#129325','&#129326','&#129327','&#129488','&#9757','&#9977','&#9994','&#9995','&#9996','&#9997','&#127877','&#127938','&#127939','&#127940','&#127943','&#127946','&#127947','&#127948','&#128066','&#128067','&#128070','&#128071','&#128072','&#128073','&#128074','&#128075','&#128076','&#128077','&#128078','&#128079','&#128080','&#128102','&#128103','&#128104','&#128105','&#128110','&#128112','&#128113','&#128114','&#128115','&#128116','&#128117','&#128118','&#128119','&#128120','&#128124','&#128129','&#128130','&#128131','&#128133','&#128134','&#128135','&#128170','&#128372','&#128373','&#128378','&#128400','&#128405','&#128406','&#128581','&#128582','&#128583','&#128587','&#128588','&#128589','&#128590','&#128591','&#128675','&#128692','&#128693','&#128694','&#128704','&#128716','&#129304','&#129305','&#129306','&#129307','&#129308','&#129309','&#129310','&#129311','&#129318','&#129328','&#129329','&#129330','&#129331','&#129332','&#129333','&#129334','&#129335','&#129336','&#129337','&#129341','&#129342','&#129489','&#129490','&#129491','&#129492','&#129493','&#129494','&#129495','&#129496','&#129497','&#129498','&#129500','&#129501', '&#128000','&#128001','&#128002','&#128003','&#128004','&#128005','&#128006','&#128007','&#128008','&#128010','&#128011','&#128012','&#128013','&#128014','&#128015','&#128016','&#128017','&#128018','&#128019','&#128020','&#128021','&#128022','&#128023','&#128024','&#128025','&#128026','&#128027','&#128028','&#128029','&#128030','&#128031','&#128032','&#128033','&#128034','&#128035','&#128036','&#128037','&#128038','&#128039','&#128040','&#128041','&#128042','&#128043','&#128044','&#128045','&#128046','&#128047','&#128048','&#128049','&#128050','&#128051','&#128052','&#128053','&#128054','&#128055','&#128056','&#128057','&#128058','&#128059','&#128060','&#128061','&#128062','&#128063'];



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
  $('.chat-contacts li').click(chatContactActive);

  // aggancio l'evento click all'icona "down" per far aprire il menu-dropdown. Delego, però, l'evento click al primo "padre" creato staticamente, perchè l'icona è creata dinamicamente e non prenderebbe l'aggancio dell'evento.
  $('.content-right').on("click", ".fa-chevron-down",
    function(e) {
      e.stopPropagation();
      $(this).siblings("ul.dropdown-menu").slideToggle(); // quando l'icona viene cliccata seleziono suo "fratello" il menu-dropdown e gli dico di aprirsi e di chiudersi ricliccando sull'icona
      $(this).parent().siblings().find("ul.dropdown-menu").slideUp(); // quando viene aperto un menu dropdown gli altri eventualmente aperti vengono chiusi
  });

    // aggancio l'evento click all'opzione "cancella messaggio" del dropdown-menu per cancellare il messaggio. Delego, però, l'evento click al primo "padre" creato staticamente, perchè il dropdown-menu è creato dinamicamente e non prenderebbe l'aggancio dell'evento.
    $('.content-right').on("click", ".remove-message",
      function() {
        $(this).parents('.chat').remove(); // cliccando l'opzione cancella messaggio, seleziono suo "padre" con la classe "chat", che sarebbe il messaggio, e lo elimino
    });

    // creo dei div con all'interno l'emoji
    for (var i = 0; i < emoji.length; i++) {

      $('.emoji-container').append('<div class="emoji">' + emoji[i] + '</div>');

    }

    // aggancio il click all'icona emoji in modo che si apra la selezione delle emoji
    $('.left-footer').click(
      function(){

        // cliccando sulla faccina se non è visibile il container delle emoji verrà visualizzato, se è presesente verrà nascosto
        $('.emoji-container').toggleClass('emoji-flex');

        // cliccando sulla faccina se il container non ha la classe verrà aggiunta, ricliccando se ha la classe verrà rimossa
        $('.container-chat-right').toggleClass("height-change-emoji");

    });


    // aggancio il click alle emoji tramite la delega di suo "padre"
    $('.emoji-container').on('click', '.emoji', emojiInInput);


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
        }, 700 );
    });

    // aggancio l'evento click alla finestra di chat che delega l'evento all'opzione info messaggio del dropdown-menu dei messaggi inviati da me
    $('.content-right').on("click", ".dropdown-menu.s .info-message", infoMsgSent);

    // aggancio l'evento click alla finestra di chat che delega l'evento all'opzione info messaggio del dropdown-menu dei messaggi ricevuti dai contatti
    $('.content-right').on("click", ".dropdown-menu.r .info-message", infoMsgReceveid);

    // aggancio l'evento all'icona "X". Al click la finestra di info viene chiusa
    $('.close').click(function(){
      $('.info-container').hide();
    });

    // cliccando da qualsiasi parte i menu dropdown si chiudono
    $(window).click(
      function(){
        $("ul.dropdown-menu").slideUp();
    });

    // cliccando sul link attiva notifiche, la campanellina con lo slah scompare e appare la campanellina normale. Inoltre il testo del link diventa "disattiva le notifiche desktop". Ricliccando sul link scompare il testo disattiva notifiche e riappare quello di prima, scompare la campanellina senza slash e riappare quella con lo slash
    $('.bell-title').find('a').click(function(){
      $('.note-off').toggle();
      $('.note-on').toggle();
      $('.fa.fa-bell-slash').toggle();
      $('.fas.fa-bell ').toggle();
    });

    /////////////////////////////////////// FUNZIONI //////////////////////////////////////////////


    // funzione che invia il messaggio che inserisce l'utente e riceve la risposta da parte del PC dopo un secondo
    function messageSentAndReceveid (){
      var textInput = inputChat.val(); // salvo il valore dell'input in una variabile
      var date = new Date(); // creo una variabile che ha in memoria la data completa
      var hours = date.getHours(); // salvo l'ora
      var minutes = date.getMinutes(); // salvo i minuti



      // condizione che aggiunge uno zero all'inizio del numero, se questo è inferiore a 10
      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      var time = hours + ":" + minutes; // salvo in una variabile l'ora e i minuti

      // variabili handlebars
      var targetHtml = $('#chat-template').html();
      var template = Handlebars.compile(targetHtml);

      // oggetto handlebars per chat inviata da me
      var contextSent = {
        typeChat: "chat-sent",
        textChat: textInput,
        time: time,
        typeDropDownMenu: "s"
      }
      var contentHtmlS = template(contextSent);

      
      // oggetto handlebars per chat di risposta
      var contextReceveid = {
        typeChat: "chat-receveid",
        textChat: 'Ok 😉',
        time: time,
        typeDropDownMenu: "r"
      }
      var contentHtmlR = template(contextReceveid);

      // se il messaggio è vuoto non fare nulla
      if (textInput == "") {

        // altrimenti inseriscilo nella finestra della conversazione
      } else {
          $('.content-right.active').append(contentHtmlS);

          inputChat.val(""); // il valore dell'input si azzera dopo che è stato inviato il messaggio

          $('.name-chat').find('small').text('Sta scrivendo...'); // sostituisco il testo con sta scrivendo... quando il messaggio viene inviato

          // timing function che manda il messaggio "ok" in risposta al messaggio dell'utente dopo 1s che l'utente ha scritto
          setTimeout(
            function () {
              $('.content-right.active').append(contentHtmlR);
              $('.name-chat').find('small').text("Ultimo accesso oggi alle " + time); // il testo sta scrivendo... viene sostituito dal testo precedente più l'ora dell'invio del suo messaggio
              $('li.active-chat .chat-time').text(time); // l'ora dell'ultimo messaggio inviato viene messa anche nel riquadro del contatto
              var textLastMsgReceveid = $('.content-right.active .chat-receveid:last p').text(); // salvo l'ultimo messaggio scritto dal contatto
              console.log(textLastMsgReceveid);
              $('li.active-chat .name-contact small').text(textLastMsgReceveid); // riporto l'ultimo messaggio scritto dal contatto nel riqudro del contatto

              // bonus scroll
              var containerHeight =  $('.content-right.active').innerHeight(); // salvo l'altezza totale della finestra di chat ogni volta che viene inviato un messaggio
              // il container di chat scrolla per tutta l'altezza della finestra di chat, la quale aumeterà gradualmente con i messaggi inseriti
              $('.container-chat-right').animate({
                scrollTop: containerHeight

              }, 700 );

          }, 1000);
      }
    }

    // funzione che fa corrispondere il contatto attivo con la rispetteva finestra di chat
    function chatContactActive () {
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
    }


    // funzione che mostra le info del messaggio inviato
    function infoMsgSent() {
      var date = new Date(); // creo una variabile che ha in memoria la data completa
      var minutes = date.getMinutes(); // salvo i minuti

      var timeMsg = $(this).parent().siblings('.message-time').text(); // salvo l'orario del messaggio scritto da me
      console.log(timeMsg);

      $('.info-container').fadeIn(); // la finestra delle info compare
      $('.dropdown-menu.s').fadeOut(); // scompare il dropdown-menu
      $('.info-container .title-name-msg').text("Il messaggio è stato inviato da: Marco"); // aggiungo testo
      $('.info-container .title-time-msg').text("Il messaggio è stato inviato alle ore: " + timeMsg); // aggiungo l'ora di invio messaggio
    }


    // funzione che mostra le info del messaggio ricevuto
    function infoMsgReceveid () {
      var date = new Date(); // creo una variabile che ha in memoria la data completa
      var minutes = date.getMinutes(); // salvo i minuti

      var timeMsg = $(this).parent().siblings('.message-time').text(); // salvo l'orario del messaggio scritto da me
      console.log(timeMsg);
      var nameContact = $('.chat-contacts li.active-chat').find('h3').text(); // salvo il nome del contatto attivo
      console.log(nameContact);

      $('.info-container').fadeIn(); // la finestra delle info compare
      $('.dropdown-menu.r').fadeOut(); // scompare il dropdown-menu
      $('.info-container .title-name-msg').text("Il messaggio è stato inviato da: " + nameContact); // aggiungo il nome del contatto che ha inviato il messaggio
      $('.info-container .title-time-msg').text("Il messaggio è stato inviato alle ore: " + timeMsg); // aggiungo l'ora di invio messaggio
    }


    // funzione che prende l'emoji cliccata e la inserisce nell'input nella posizione del cursore del mouse
    function emojiInInput () {
      var textEmoji = $(this).text(); // salvo l'emoji contenuta nel div
      console.log(textEmoji);
      var valInput = $('#chat-input').val(); // salvo il valore dell'input
      console.log(valInput);
      var beforeCursor = valInput.substring(0, $('#chat-input')[0].selectionStart); // estrapolo dal valore dell'input i caratteri prima del posizionamento del cursore
      console.log(beforeCursor);
      var afterCursor = valInput.substring($('#chat-input')[0].selectionEnd, valInput.length); // estrapolo dal valore dell'input i caratteri dopo il posizionamento del cursore
       console.log(afterCursor);
      // il valore dell'input diventerà: i caratteri prima del cursore, l'emoji che ho cliccato e infine i caratteri estrapolati dopo il cursore. Così facendo posso posizionare le emoji dove vogli all'interno del messaggio da inviare
      $('#chat-input').val(beforeCursor + textEmoji + afterCursor);
      // al click su una emoji l'input prende il focus
      $('#chat-input').focus();
    }

});
