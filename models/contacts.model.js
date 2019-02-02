const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  message: {
    type: [Schema.Types.ObjectId],
    ref: 'Message'
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
