/**
 * database connection
 */
const dbConfig= require('./config')
const mongoose = require('mongoose');

const conn = mongoose.createConnection(
    dbConfig.db_url,
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
