const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://inotebook:inotebook@inotebook.ynmgmxx.mongodb.net/"
<<<<<<< HEAD
// mongodb://127.0.0.1/inotebook
=======
// "mongodb://127.0.0.1/inotebook"
>>>>>>> 7bf472cccb24e2be02536899824aa530c66f458c


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
