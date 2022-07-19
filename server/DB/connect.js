const mongoose = require('mongoose');
// signup and create a db in https://cloud.mongodb.com/ follow the guidelines and get the connect URI and paste it below
const URI = "mongodb+srv://Rohith:NikonD5300@cluster0.vjebb.mongodb.net/?retryWrites=true&w=majority";

const connectDb = async () => {
await mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
console.log('DB connected...')
};

module.exports = connectDb;
