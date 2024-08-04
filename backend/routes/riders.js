import express from "express"
import {GetRiders, LoginRider,RiderInformation, RiderReviewData, UpdateOrders,GetAllRiderReview} from "../controllers/rider.js"

const router=express.Router();

router.get("/",GetRiders)
router.post('/login',LoginRider)
router.post('/information',RiderInformation)
router.post('/update',UpdateOrders)
router.post('/review',RiderReviewData)
router.post('/customers/rider/review',GetAllRiderReview)

export default router;
