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
        return ProductModel.create({name:name,price:price,count:count})
    }
    // findProduct:async function(name_product,price,count_product){
    //     return ProductModel.findOne({
    //         name_product:name_product,
    //         price:price,
    //         count_product:count_product
    //     })
    // }
}
module.exports = ProductDB;