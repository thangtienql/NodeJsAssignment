var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Client = Schema({
    username: String,
    password: String,
    fullname: String,
    phone: String,
    address: String,
    email: String,
});

var ClientModel = mongoose.model("client_db", Client);

const ClientDB = {
    addClient: async function(username,password,fullname,phone,address,email){
        return ClientModel.create({username:username,password:password,fullname:fullname,
            phone:phone,address:address,email:email,})
    },
    getListClient: async function(){
        return await ClientModel.find({});
    }
}

module.exports = ClientDB;