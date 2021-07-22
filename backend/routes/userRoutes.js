import express from "express";
import {
   authUser,
   registerUser,
   getUserProfile,
   updateUserProfile,
} from "./../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/", registerUser);
export default router;
