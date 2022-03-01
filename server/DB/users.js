const mongoose = require('mongoose');

const user = new mongoose.Schema({
firstName: { type: String},
lastName: {type: String},
empNo: {type: String},
desig: {type: String}
});

module.exports = User = mongoose.model('user', user);