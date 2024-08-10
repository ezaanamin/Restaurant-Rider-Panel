import mongoose from "mongoose";

const RiderReviewSchema = new mongoose.Schema({
  rider_id: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  reviews: [{
    customer_id: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    }
  }]
});


export const RiderReview = mongoose.model(`RiderReview`,RiderReviewSchema);

