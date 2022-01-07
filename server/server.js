const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv');

//Setting config file
dotenv.config({ path: 'config/config.env' })


//connecting DB
connectDatabase();


app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})