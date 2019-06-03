//1)CREAZIONE
$(document).ready(function(){
  //variabile con url personalizzato
  var url_base = 'http://157.230.17.132:3013/todos/';
  //richiamo la funzione
  stampa_todo();
  //Intercetto il click sul pulsante
  $('#new_todo_button').click(function(){
    var todo_text = $('#new_todo').val();
    //svuoto
    $('#new_todo').val('');
    $.ajax({
      'url': url_base,
      'method': 'POST',
      'data':{
        'text': todo_text,
      },
      'success': function(){
          stampa_todo();
      },
      'error': function(){
        alert('error');
      }
    });
  });
  //Intercetto il click sulla x
  $('#todos').on('click', 'span', function(){
    var id_to_delete = $(this).attr('data-id');
    $.ajax({
      'url': url_base + id_to_delete,
      'method': 'DELETE',
      'success': function(){
          stampa_todo();
      },
      'error': function(){
        alert('error');
      }
    });
  });
  //Li recupera e fa append
  function stampa_todo(){
    //svuoto
    $('#todos').html('');
    //Chiamata ajax per l'inserimento dei dati in GET
    $.ajax({
      'url': url_base,
      'method': 'GET',
      'success': function(data){
        for(var i = 0; i < data.length; i++){
          $('#todos').append('<li><span data-id="'+ data[i].id +'"><i class="far fa-times-circle"></i></span>' + data[i].text + '</li>');
        }
      },
      'error': function(){
        alert('error');
      }
    });
  }
});
