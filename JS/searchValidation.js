let $ = require('jquery');

let validation = {
  validateInput: validateInput,
  clearModal: clearModal
};

//  User input Validation

function validateInput(userSearch) {
  if (userSearch === "") {
    $('.error-modal').show();
    return true;
  }
}

  // Clear Error Modal

function clearModal() {
  $('.ok-button').click(function() {
    $('.error-modal').hide();
  });
}

module.exports = validation;
