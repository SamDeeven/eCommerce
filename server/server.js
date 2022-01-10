const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv');



//handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`Error: ${err.stack}`)
    console.log('SHutting down due to uncaught exception');
    process.exit(1);
})



//Setting config file
dotenv.config({ path: 'config/config.env' })


//connecting DB
connectDatabase();


const server = app.listen(process.env.PORT, () => {
        console.log(`Server started at ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
    })
    //handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandles Promise Rejection');
    server.close(() => {
        process.exit(1)
    })
})