var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = Schema({
    name:String,
    price:Number,
    count:Number,
});

var ProductModel = mongoose.model("product_db", Product);

const ProductDB = {
    addProduct:async function(name,price,count){
        return await ProductModel.create({name:name,price:price,count:count})
    },
    getListProducts:async function(){
        return await ProductModel.find({});
    },
    updateProduct: async function(){
        return await ProductModel.findOneIdAndUpdate({});
    },
    getProcutById:async function(id){
        return await ProductModel.findById(id)
    },
    updateProduct:async function(id,obj){
        return await ProductModel.findByIdAndUpdate(id,obj);
    },
    deleteProduct:async function(id){
        const cl=await ProductModel.findByIdAndRemove(id);
    }
}
module.exports = ProductDB;