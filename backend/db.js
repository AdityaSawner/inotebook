const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://inotebook:inotebook@inotebook.ynmgmxx.mongodb.net/"
// "mongodb://127.0.0.1/inotebook"


const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI) 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectToMongo;
