const validateMessage = require('../validators/create_message.validator');

test('should fail to send a message if no receiver contact is provided', () => {
  const userData = {
    senderContact: '08012345678',
    receiverContact: '',
    message: 'Hi there'
  }
  expect(validateMessage(userData)).toEqual({
    "errors" : {
      "receiverContact": "Enter the number of the person you would like to send a message to"
    },
    "isValid": false
  });
});

test('should fail to send a message if no sender contact is provided', () => {
  const userData = {
    senderContact: '',
    receiverContact: '08012345678',
    message: 'Hi there'
  }
  expect(validateMessage(userData)).toEqual({
    "errors" : {
      "senderContact": "You need a phone number to send a message"
    },
    "isValid": false
  });
})

