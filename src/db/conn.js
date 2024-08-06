const mongoose = require('mongoose');

const path = process.env.DB_MONGO;

mongoose.connect(path)
    .then(() => { console.log('connection succesful...') })
    .catch((err) => { console.log(err) });
