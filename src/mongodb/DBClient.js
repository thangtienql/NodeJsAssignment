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
    },
    findClient: async function(username,password){
        return ClientModel.findOne({
            username:username,
            password:password
        })
    },
    findById: async function(id){
        return await ClientModel.findById(id);
    },
    updateClientById:async function(id,obj){
        const cl=await ClientModel.findByIdAndUpdate(id,obj);
        return cl;
    }
}

module.exports = ClientDB;