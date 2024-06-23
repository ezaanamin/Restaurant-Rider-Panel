const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define RiderReview schema
const RiderReviewSchema = new Schema({
    rider_id: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true
    },
    reviews: [{
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }]
});

// Create model based on schema
const RiderReview = mongoose.model('RiderReview', RiderReviewSchema);

module.exports = RiderReview;
