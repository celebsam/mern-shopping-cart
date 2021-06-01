import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

// fetch all products
router.get("/", (req, res) => {
   const products = Product.find()
      .then((product) => res.send(product))
      .catch((err) => console.log(err));
});

// get single product
router.get("/:id", (req, res) => {
   const product = Product.findById(req.params.id)
      .then((result) => {
         if (product) {
            res.send(result);
         } else {
            res.status(404).send("No product found");
         }
      })
      .catch((err) => console.log(err));
});

export default router;
