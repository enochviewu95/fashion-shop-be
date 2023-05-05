const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema(
    {
        title: String,
        description: String,
        imageUrl: String
    },
    {
        methods: {
            createCategory() {
                return this.save(this)
            }
        },

        statics: {

            getCategory(categoryId){
                return this.findById({_id: categoryId})
            },
            getCategories() {
                return this.find();
            },

            udpateCategory(categoryId, update) {
                return this.findOneAndUpdate({ _id: categoryId }, update)
            },

            deleteCategory(categoryId) {
                return this.deleteOne({ _id: categoryId })
            }
        }
    }

);

module.exports = mongoose.model('Category', CategorySchema);