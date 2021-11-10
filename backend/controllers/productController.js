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
        res.status(404);
        throw new Error("Product not found");
      }
    })
    .catch((err) => console.log(err));
};

// @desc Delete product
//  @route DELETE /api/products/delete/:id
//  @access private/admin
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something failed." });
  }
};
