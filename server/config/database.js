const mongoose = require('mongoose');
const app = require('./app');

const URL = process.env.MONGODB_URI || `mongodb+srv://mongodb:mongodb@cluster0.36xwlre.mongodb.net`;

module.exports = () => {
    mongoose.connect(URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true
    })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
}
