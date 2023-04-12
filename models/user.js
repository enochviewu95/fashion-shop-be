const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        
    },
    {
        methods: {
            createUser() {
                return this.save(this)
            }
        },

        statics: {
            getUser() {
                return this.find();
            },

            updateUser(collectionId, update) {
                return this.findOneAndUpdate({ _id: collectionId }, update)
            },

            deleteUser(collectionId) {
                return this.deleteOne({ _id: collectionId })
            }
        }
    }

);

module.exports = mongoose.model('users', UserSchema);