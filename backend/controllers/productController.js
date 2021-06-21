import Product from "../models/productModel.js";
export const getProducts = (req, res) => {
   Product.find()
      .then((product) => res.send(product))
      .catch((err) => console.log(err));
};

export const getSingleProduct = (req, res) => {
   const product = Product.findById(req.params.id)
      .then((result) => {
         if (product) {
            res.send(result);
         } else {
            res.status(404).send("No product found");
            throw new Error("Product not found");
         }
      })
      .catch((err) => console.log(err));
};
