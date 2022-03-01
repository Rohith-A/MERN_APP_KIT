const mongoose = require('mongoose');
// signup and create a db in https://cloud.mongodb.com/ follow the guidelines and get the connect URI and paste it below
const URI = "Your mongo db connect URL here";

const connectDb = async () => {
await mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
console.log('DB connected...')
};

module.exports = connectDb;