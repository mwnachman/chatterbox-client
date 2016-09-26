var app = {

  mainURL: 'https://api.parse.com/1/classes/messages',
  server: 'https://api.parse.com/1/classes/messages?order=-createdAt',

  testMessage: {
    username: 'Test123',
    text: 'This is a test',
    roomname: 'lobby'
  },


  init: function () {

  },

  send: function (message) { 

    $.ajax({
      url: this.mainURL,
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(message),
      success: function (data) {
        console.log('chatterbox: Message sent \n\n' + JSON.stringify(message));
      }
    });
   },

  fetch: function () {
    $.ajax({
      url: this.server,
      type: 'GET',
      // dataType: 'json',
      // data: {param1: 'value1'},
      success: function (data) {
        for (var i = 0; i < data.results.length; i++) {
          app.renderMessage(data.results[i]);
        }
      }
    });
  },
  
  clearMessages: function() {
    $('#chats').html('');
  }, 

  renderMessage: function(message) {
    $('#chats').append('<div>' + message.username + ": " + 
                        message.text + '</div>');
  }, 

  renderRoom: function(room) {
    $('#roomSelect').append('<a class="' + room + '"></a>');
  }

};



// document must be loaded completely before manipulating the DOM
$(document).ready( function () {

  $('.send').click( function () {
    app.send(app.testMessage);
  });


  $('.retrieve').click( function () {
    app.fetch();
  });
});
