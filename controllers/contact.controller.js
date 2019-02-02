const Contact = require('../models/contacts.model');

exports.create_contact = (request, response) => {
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
}