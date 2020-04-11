var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = Schema({
    username:String,
    password:String,
    address:String,
    phone:String,
    email:String,
});
var UserModel = mongoose.model("user_db", User);

const UserDB = {
    addUser:async function(username,password,address,phone,email){
        return UserModel.create({username:username,password:password,
            address:address,phone:phone,email:email})
    },
    findUser: async function(username,password){
        return UserModel.findOne({
            username:username,
            password:password
        })
    }
}
module.exports = UserDB;