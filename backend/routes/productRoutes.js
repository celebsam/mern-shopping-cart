import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  deleteProduct,
  getProducts,
  getSingleProduct,
} from "./../controllers/productController.js";

const router = express.Router();

// fetch all products
router.get("/", getProducts);

// get single product
router.get("/:id", getSingleProduct);

// admin delete products
router.delete("/delete/:id", protect, admin, deleteProduct);

export default router;
