import Product from "../models/productModel.js";

// export const getProducts = (req, res) => {
//   Product.find()
//     .then((product) => res.send(product))
//     .catch((err) => console.log(err));
// };

export const getProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    if (product.length < 1) {
      return res.status(606).send("No product found");
    }
    res.send(product);
  } catch (error) {
    console.log(error);
  }
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
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something failed during deletion" });
  }
};
