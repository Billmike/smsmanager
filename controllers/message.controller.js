const Message = require('../models/message.model');
const Contact = require('../models/contacts.model');

exports.sendMessage = (request, response) => {
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
}