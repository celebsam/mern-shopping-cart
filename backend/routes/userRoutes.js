import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "./../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/", registerUser);
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);
router.get("/:id", protect, admin, getUserById);
router.put("/edit/:id", protect, admin, updateUser);
export default router;
