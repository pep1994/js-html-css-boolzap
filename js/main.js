// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde. Quando clicco sull’input e quindi il cursore è pronto a scrivere per l’inserimento messaggio, l’icona cambia.

$(document).ready(function(){

  // quando l'input per inviare un messaggio prende il focus scompare l'icona del microfono e appare l'icona per inviare il messaggio
  $('input[name="input_text"]').focus(
    function(){
      $('.microphone').hide();
      $('.plane').show();
  });

  // quando l'input per inviare un messaggio perde il focus scompare l'icona dell'invio messaggio e ricompare l'icona del microfono
  $('input[name="input_text"]').blur(
    function(){
      $('.plane').hide();
      $('.microphone').show();
  });


});
