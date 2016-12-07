let $ = require('jquery');
let apiCalls = require('./apicalls.js');
let validation = require('./searchValidation');

$(document).ready(function() {
  $('#search').submit(function(e) {
    e.preventDefault();
    apiCalls.clearResults();
    let userSearch = $(this).find("input[name='search']").val();
    let validate = validation.validateInput($.trim(userSearch));
    if (!validate) {
      apiCalls.getSongsterr(userSearch);
      apiCalls.getYouTube(userSearch);
      apiCalls.getWiki(userSearch);
      $('.results').show();
      $('.description').hide();
      $('#user-request').val('');
    }
  });
  validation.clearModal();
});
