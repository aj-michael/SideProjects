$(function() {

  function invertColor(hex) {
    hex = hex.substring(1);
    hex = parseInt(hex,16);
    hex = 0xFFFFFF ^ hex;
    hex = hex.toString(16);
    hex = ('000000'+hex).slice(-6);
    return '#'+hex;
  }

  setInterval(function() {
    date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    hours = ('0'+hours).slice(-2);
    minutes = ('0'+minutes).slice(-2);
    seconds = ('0'+seconds).slice(-2);
    time = hours+':'+minutes+':'+seconds;
    bg_color = '#'+hours+minutes+seconds;
    text_color = invertColor(bg_color);
    $('.time').text(time);
    document.body.style.backgroundColor = bg_color;
    $('div').css('color', text_color);
  }, 100);
});
