const Message = require('../models/message.model');
const Contact = require('../models/contacts.model');
const validateMessage = require('../validators/create_message.validator');

exports.sendMessage = (request, response) => {
  const { errors, isValid } = validateMessage(request.body);

  if (!isValid) {
    return response.status(400).json(errors);
  }

  return Contact.findOne({
    phoneNumber: request.body.senderContact
  }).then((senderNumber) => {
    if (!senderNumber) {
      return response.status(404).json({
        message: 'No contact with that phone number exists'
      })
    }

    return Contact.findOne({
      phoneNumber: request.body.receiverContact
    }).then((receiverNumber) => {
      if (!receiverNumber) {
        return response.status(404).json({
          message: 'No contact with that phone number exists'
        })
      }

      return Message.create({
        message: request.body.message,
        senderContact: request.body.senderContact,
        receiverContact: request.body.receiverContact
      }).then((message) => {
        return response.status(201).json({
          message: 'Message sent successfully',
          status: 'Delivered',
          sms: {
            sentBy: request.body.senderContact,
            sentTo: request.body.receiverContact,
            messageText: message,
          }
        })
      })
    })
  }).catch(error => {
    return response.status(500).json({
      message: 'Sending message failed',
      status: 'Failed'
    })
  })
};

exports.fetchSentMessage = (request, response) => {
  return Contact.findById({
    _id: request.params.userId
  }).then(contact => {
    if (!contact) {
      return response.status(404).json({
        message: 'Contact not found'
      })
    };

    return Message.find({
      senderContact: contact.phoneNumber
    }).then(sentMessages => {
      return response.status(200).json({
        message: 'Fetched all sent messages',
        smsData: {
          sentMessages
        }
      })
    })
  }).catch(error => {
    return response.status(500).json({
      message: 'An error occurred'
    })
  })
}

exports.fetchReceivedMessage = (request, response) => {
  return Contact.findById({
    _id: request.params.userId
  }).then(contact => {
    if (!contact) {
      return response.status(404).json({
        message: 'No user found'
      });
    }

    return Message.find({
      receiverContact: contact.phoneNumber
    }).then(receivedMessages => {
      return response.status(200).json({
        message: 'Fetched all received messages',
        smsData: {
          receivedMessages
        }
      })
    })
  }).catch(() => {
    return response.status(500).json({
      message: 'An error occurred'
    });
  });
}
