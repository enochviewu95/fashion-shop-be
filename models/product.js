const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProductsSchema = new Schema(
    {
        title: String,
        description: String,
        imageUrl: String,
        price: mongoose.Types.Decimal128
    },
    {
        methods: {
            createProduct() {
                return this.save(this)
            },

        },
        statics: {
            getProducts() {
                return this.find();
            },

            getProduct(prodId){
                return this.findById({_id: prodId})
            },

            updateProduct(prodId, update) {
                return this.findOneAndUpdate({ _id: prodId }, update)
            },

            deleteProduct(prodId) {
                return this.deleteOne({ _id: prodId })
            },
        }
    }
);

module.exports = mongoose.model('products', ProductsSchema);