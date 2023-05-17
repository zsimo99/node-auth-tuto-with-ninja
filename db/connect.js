const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://admin-zsimo:12345@cluster0.xrtfhyt.mongodb.net/node-auth';
const connect =()=>{
    return mongoose.connect(dbURI)
}
module.exports=connect