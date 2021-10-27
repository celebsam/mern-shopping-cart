import express from "express";
import {
   authUser,
   registerUser,
   getUserProfile,
   updateUserProfile,
   getUsers,
} from "./../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/", registerUser);
router.get("/", protect, admin, getUsers);
export default router;
