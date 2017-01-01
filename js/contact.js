(function() {
  $("#contact-form").submit(function() {
    if (!isSpam()) {
      $.ajax({
        type: "POST",
        url: "../php/contact.php",
        data: $('form#contact-form').serialize(),
        success: function(data) {
          if (data.errSpam) {
            $('form#contact-form').unbind('submit');
            $('form#contact-form').submit(false);
            return;
          }

          if (data.errName) {
            $('#validationName').show()
          } else {
            $('#validationName').hide();
          }
          if (data.errEmail) {
            $('#validationEmail').show();
          } else {
            $('#validationEmail').hide();
          }
          if (data.errMessage) {
            $('#validationMessage').show();
          } else {
            $('#validationMessage').hide();
          }

          if (data.emailSent) {
            var $result = $('#result');
            $result.removeClass('text-danger').addClass('text-success');
            $result.text("Thanks. Your message was sent successfully.");
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
          } else {
            $('#result').text("");
          }
        },
        error: function(e) {
          var $result = $('#result');
          $result.html("Oops! Something went wrong. Please try again or send an email to " + document.getElementById('lnke').outerHTML);
          $result.removeClass('text-success').addClass('text-danger');
        }
      });
    } else {
      var $result = $('#result');
      $result.html("Sorry, you have been mistaken for a spammer. Please email your query to " + document.getElementById('lnke').outerHTML +
        " and let me know that you received this message. Thanks, Steve.");
      $result.removeClass('text-success').addClass('text-danger');
    }
    return false;
  });

  function isSpam() {
    var message = $('#message').val().toLowerCase();
    if ((message.indexOf('canada') !== -1 && message.indexOf('goose') !== -1)
      || (message.indexOf('cialis') !== -1 && message.indexOf('viagra') !== -1)
      || (message.indexOf('xrumer') !== -1 && message.indexOf('; windows') !== -1)
      || (message.indexOf('canadian') !== -1 && message.indexOf('goose') !== -1)) {
        return true;
    }
    return false;
  }

  function submitButtonVisible() {
    var elm = $('.submit-button'),
    viewportHeight = $(window).height(),
    scrollTop = $(window).scrollTop(),
    offsetTop = $(elm).offset().top,
    elementHeight = $(elm).height();

    return ((offsetTop < (viewportHeight + scrollTop)) && (offsetTop > (scrollTop - elementHeight)));
  }
}());