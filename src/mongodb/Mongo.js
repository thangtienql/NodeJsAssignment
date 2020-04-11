var mongoose = require('mongoose');


let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}; 

const dbConnectString= () => {
    const APP_HOST = 'localhost';
    const APP_DB = 'local';
    const DB_USER =null;
    const DB_PASS =null;

    if (DB_USER) {
        return `mongodb://${DB_USER}:${DB_PASS}@${APP_HOST}/${APP_DB}`;
    } else {
        return `mongodb://${APP_HOST}/${APP_DB}`;
    }
};

const URL_DATABASE = dbConnectString();

var MongoDB = {
    connectDB: async () => {
        mongoose.Promise = global.Promise;
        console.log("url mongo:",URL_DATABASE);
        return await mongoose.connect(URL_DATABASE, options);
    },
}

module.exports = MongoDB;
