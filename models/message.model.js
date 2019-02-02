const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  senderContact: {
    type: String,
    required: true
  },
  receiverContact: {
    type: String,
    required: true
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'Contact'
  }
});

module.exports = mongoose.model('Message', MessageSchema);
