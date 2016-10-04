var app = {

  mainURL: 'http://127.0.0.1:3000/classes/messages',
  server: 'http://127.0.0.1:3000/classes/messages?order=-createdAt',
// ?order=-createdAt

  friends: [],

 
  init: function () {
    this.fetch();
  },

  callback: function() {
    var message = {
      username: name,
      text: $('#message').val(),
      roomname: 'default'
    };

    return message;
  },

  send: function (input) {
    
    var message = input ? input : this.callback();
    $.ajax({
      url: this.mainURL,
      port: '3000',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(message),
      success: function (data) {
        console.log('chatterbox: Message sent \n\n' + JSON.stringify(message));
        $('#message').val('');
      }
    });
  },

  fetch: function () {
    $.ajax({
      url: this.server,
      port: '3000',
      type: 'GET',
      success: function (data) {
        console.log(data);
        app.clearMessages();
        console.log(data);
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
    var messageArray = message.text.split('');
    var messageToPost = [];
    for (var i = 0; i < messageArray.length; i++) {
      if (messageArray[i] !== '<') {
        messageToPost.push(messageArray[i]);
      }
    }

    messageToPost = messageToPost.join('');
    
    if (app.friends.includes(message.username)) {
      $('#chats').append('<div><a href="javascript:void(0)"><strong>' + 
                        message.username + '</strong></a>: ' + 
                        messageToPost + '</div>');
    }
    else {
      $('#chats').append('<div><a href="javascript:void(0)">' + 
                        message.username + '</a>: ' + 
                        messageToPost + '</div>');
    }
  }, 

  renderRoom: function(room) {
    $('#roomSelect').append('<a class="' + room + '"></a>');
  },

  handleSubmit: function() {
    app.send();
  },  

};



// document must be loaded completely before manipulating the DOM
$(document).ready( function () {

  app.init();

  $('.send').click( function () {
    app.handleSubmit();
  });

  $('.retrieve').click( function () {
    app.fetch();
  });

});

$(document).on('click', 'a', function(event) {
  var name = event.currentTarget.textContent;
  if (!app.friends.includes(name)) {
    app.friends.push(name);
  }
})







