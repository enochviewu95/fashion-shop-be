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
            getUser(userId) {
                console.log("Userid",userId)
                return this.find({_id: userId});
            },

            updateUser(userId, update) {
                return this.findOneAndUpdate({ _id: userId }, update)
            },

            deleteUser(collectionId) {
                return this.deleteOne({ _id: collectionId })
            }
        }
    }

);

module.exports = mongoose.model('users', UserSchema);