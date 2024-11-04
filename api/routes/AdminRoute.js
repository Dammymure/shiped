import express from "express"
import { verifyToken, verifyTokenAdmin } from "../middleware/auth.js"
import { AllOrders, Auth, createAdminAccount, getOneOrder, loginAdmin, updateOrder } from "../controller/AdminController.js"

const router = express.Router()

// singup
router.post("/signup", createAdminAccount)
// Login
router.post("/login", loginAdmin)
// track order location || change order status
router.put("/order-update/:id",verifyTokenAdmin, updateOrder)

// assign rider
router.put("/:id/assign-rider",verifyToken, )

router.get("/auth", verifyTokenAdmin, Auth)
router.get("/orders", verifyTokenAdmin, AllOrders)
router.get("/order/:id", verifyTokenAdmin, getOneOrder)




export { router as AdminRoute}