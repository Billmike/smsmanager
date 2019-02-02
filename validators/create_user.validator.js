const { isEmpty } = require('lodash')
const validator = require('validator');

const validateUser = (data) => {
  let errors = {};
  if (data.firstName.trim() === '' || data.firstName === undefined) {
    errors.firstName = 'First Name is required';
  }

  if (data.lastName.trim() === '' || data.lastName === undefined) {
    errors.lastName = 'Last Name is required';
  }

  if (data.phoneNumber.trim() === '' || !validator.isMobilePhone(data.phoneNumber.trim()) || data.phoneNumber === undefined) {
    errors.phoneNumber = 'Enter a valid phone number';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateUser;
