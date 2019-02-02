const { isEmpty } = require('lodash');
const validator = require('validator');

const validateMessage = data => {
  let errors = {};

  if (data.message.trim() === '' || data.message === undefined) {
    errors.message = 'You need to include a message';
  }

  if (data.senderContact.trim() === '' || !validator.isMobilePhone(data.senderContact.trim()) || data.senderContact === undefined) {
    errors.senderContact = 'You need a phone number to send a message'
  }

  if (data.receiverContact.trim() === '' || !validator.isMobilePhone(data.receiverContact.trim()) || data.receiverContact === undefined) {
    errors.receiverContact = 'Enter the number of the person you would like to send a message to';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateMessage;
