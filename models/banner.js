const mongoose = require("mongoose");
const { Schema } = mongoose;

const BannerSchema = new Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    isSelected: Boolean,
  },
  {
    methods: {
      createBanner() {
        return this.save(this);
      },
    },

    statics: {
      getBanners() {
        return this.find();
      },

      getBanner(bannerId) {
        return this.findById({ _id: bannerId });
      },

      updateBanner(bannerId, update) {
        return this.findOneAndUpdate({ _id: bannerId }, update);
      },

      deleteBanner(bannerId) {
        return this.deleteOne({ _id: bannerId });
      },

      getSelectedBanner() {
        return this.findOne({ isSelected: true });
      },
    },
  }
);

module.exports = mongoose.model("banners", BannerSchema);
