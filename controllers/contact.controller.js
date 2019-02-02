const Contact = require('../models/contacts.model');
const Message = require('../models/message.model');
const validateUser = require('../validators/create_user.validator');

exports.create_contact = (request, response) => {
  const { errors, isValid } = validateUser(request.body);
  if (!isValid) {
    return response.status(400).json(errors)
  }

  return Contact.findOne({
    phoneNumber: request.body.phoneNumber
  }).then((existingContact) => {
    if (existingContact) {
      return response.status(409).json({
        message: 'Contact already exists',
        status: 'Conflict'
      })
    }
    
      const contact = new Contact({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        phoneNumber: request.body.phoneNumber
      });
    
      contact.save((error) => {
        if (error) {
          return response.json({
            message: 'An error occured'
          })
        }
        return response.json({
          message: 'Contact created successfully',
        })
      })
  })
}

exports.remove_contact = (request, response) => {
  return Contact.findOneAndDelete({
    _id: request.params.userId
  }).then((contact) => {
    return Message.deleteMany({
      senderContact: contact.phoneNumber,
    }).then(() => {
      return Message.deleteMany({
        receiverContact: contact.phoneNumber
      }).then(() => {
        return response.status(200).json({
          message: 'Successfully removed user'
        })
      })
    })
  }).catch(() => {
    return response.status(500).json({
      message: 'Something went wrong'
    })
  })
}