const mongoose = require('mongoose');
const { Schema } = mongoose;

const BannerSchema = new Schema(
    {
        title: String,
        description: String,
        imageUrl: String
    },
    {
        methods: {
            createBanner() {
                return this.save(this)
            }
        },

        statics: {
            getBanners() {
                return this.find();
            },

            updateBanner(bannerId, update) {
                return this.findOneAndUpdate({ _id: bannerId }, update)
            },

            deleteBanner(bannerId) {
                return this.deleteOne({ _id: bannerId })
            }
        }
    }

);

module.exports = mongoose.model('banners', BannerSchema);