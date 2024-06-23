import express from "express"
import {GetRiders, LoginRider,RiderInformation, RiderReview, UpdateOrders} from "../controllers/rider.js"

const router=express.Router();

router.get("/",GetRiders)
router.post('/login',LoginRider)
router.post('/information',RiderInformation)
router.post('/update',UpdateOrders)
router.post('/review',RiderReview)

export default router;
