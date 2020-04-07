// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde. Quando clicco sull’input e quindi il cursore è pronto a scrivere per l’inserimento messaggio, l’icona cambia.

$(document).ready(function(){

  var inputChat, textInput;


  inputChat = $('input[name="input_text"]'); // salvo in una variabile il riferimento all'input
  inputChat.val(""); // imposto di default il valore vuoto per l'input
  console.log(inputChat);

  // quando l'input per inviare un messaggio prende il focus scompare l'icona del microfono e appare l'icona per inviare il messaggio
  inputChat.focus(
    function(){
      $('.microphone').hide();
      $('.plane').show();
  });

  // quando l'input per inviare un messaggio perde il focus scompare l'icona dell'invio messaggio e riappare l'icona del microfono
  inputChat.blur(
    function(){
      $('.plane').hide();
      $('.microphone').show();
  });


  // quando l'utente clicca per inviare il messaggio mi salvo il valore che l'utente ha inserito nell'input dell'invio del messaggio. Il valore lo inserico nella finestra della conversazione

  $('.icon-container').click(
    function(){
      textInput = inputChat.val(); // salvo il valore dell'input in una variabile

      // se il messaggio è vuoto non fare nulla
      if (textInput == "") {

        // altrimenti inseriscilo nella finestra della conversazione
      } else {
        $('.content-right').append("<div class='chat chat-send'>" + "<p class='text-message'>" + textInput + "</p>" +  "<span class='message-time'>13:42</span>" + "</div>");
        inputChat.val(""); // il valore dell'input si azzera dopo che è stato inviato il messaggio
      }
  });



});
