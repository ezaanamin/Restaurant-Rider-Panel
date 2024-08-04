import mongoose from "mongoose";

const RiderReviewSchema = new mongoose.Schema({
  rider_id:mongoose.Schema.Types.ObjectId,
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
});


export const RiderReview = mongoose.model(`RiderReview`,RiderReviewSchema);

