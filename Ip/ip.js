$(function() {

  $.get("http://54.69.96.226:8002", function(response) {
    $('.intro').text('Your IP is');
    $('.ip').text(response);
  });

});
