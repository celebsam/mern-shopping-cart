import express from "express";
import {
   getProducts,
   getSingleProduct,
} from "./../controllers/productController.js";

const router = express.Router();

// fetch all products
router.get("/", getProducts);

// get single product
router.get("/:id", getSingleProduct);

export default router;
