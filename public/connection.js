/**
 * database connection
 */
const dbConnection = require('./config')
const mongoose = require('mongoose');
let connUrl = "mongodb://127.0.0.1:27017/graduate_survey"
const conn = mongoose.createConnection(
    connUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
conn.on('open', () => {
    console.log("mongodb connect success");
})
conn.on('err', (error) => {
    console.log("mongodb connect error", error);
})
module.exports = conn
