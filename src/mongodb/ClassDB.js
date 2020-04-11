
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClassSchema = Schema({
    name:String,
    count_st:Number
});
var ClassDB=mongoose.model("class_db", ClassSchema);

const StudentDB={
    addST:async function(name,count){
        return ClassDB.create({name:name,count_st:count})
    }
}

module.exports =StudentDB;