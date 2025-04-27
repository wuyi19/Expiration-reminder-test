const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  note: { type: String },
});

module.exports = mongoose.model('Reminder', reminderSchema);
