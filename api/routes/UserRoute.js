import express from "express"
import { Auth, createAccount, getOneOrder, getOrders, GetUserProfile, loginUser, LogOutUser, placeOrder, UpdateProfile } from "../controller/UserController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

// Sign up
router.post("/signup", createAccount)

// Login
router.post("/login", loginUser)


// Get profile
router.get("/profile", verifyToken, GetUserProfile)


router.get("/auth", verifyToken, Auth)

router.post("/auth/logout", verifyToken, LogOutUser)

// Get profile
router.post("/profile", LogOutUser)

// Edit profile
router.put("/update", verifyToken, UpdateProfile)


// place delivery order
router.post("/place-delivery", verifyToken, placeOrder)

// get deliveries
router.get("/deliveries", verifyToken, getOrders)

// get one delivery
router.get("/delivery/:id", verifyToken, getOneOrder)

export { router as UserRoute}


// 