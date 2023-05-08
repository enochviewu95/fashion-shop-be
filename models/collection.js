const mongoose = require("mongoose");
const { Schema } = mongoose;

const CollectionSchema = new Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
  },
  {
    methods: {
      createCollection() {
        return this.save(this);
      },
    },

    statics: {
      getCollection(collectionId) {
        return this.findById({ _id: collectionId });
      },
      getCollections() {
        return this.find();
      },

      udpateCollection(collectionId, update) {
        return this.findOneAndUpdate({ _id: collectionId }, update);
      },

      deleteCollection(collectionId) {
        return this.deleteOne({ _id: collectionId });
      },
    },
  }
);

module.exports = mongoose.model("collections", CollectionSchema);
