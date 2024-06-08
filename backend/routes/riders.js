import express from "express"
import {GetRiders, LoginRider,RiderInformation, UpdateOrders} from "../controllers/rider.js"

const router=express.Router();

router.get("/",GetRiders)
router.post('/login',LoginRider)
router.post('/information',RiderInformation)
router.post('/update',UpdateOrders)

export default router;
