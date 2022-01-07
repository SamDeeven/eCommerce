const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {

        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(data => {
        console.log(`MongoDB Database started with the Host: ${data.connection.host}`)
    })

}

module.exports = connectDatabase