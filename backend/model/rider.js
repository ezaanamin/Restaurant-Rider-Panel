import mongoose from "mongoose";

const RiderSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: Number,
    password: String,
    all_orders: [Number],
    delivered_order: [Number],
    pending_order: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      set: v => Math.round(v * 10) / 10, // Rounds to one decimal place
      get: v => Math.round(v * 10) / 10
    },
    totalReview:Number,
    assigned_order: [Number],
    notifications: [Number] // Corrected 'Notification' to 'notifications'
  },
  { timestamps: true }
);

const Rider = mongoose.model("Rider", RiderSchema);

export default Rider;
