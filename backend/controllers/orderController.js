import Order from "../models/orderModel.js";

export const addOrderItems = async (req, res) => {
   const {
      orderItems,
      shippingPrice,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingAddress,
      totalPrice,
   } = req.body;

   if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No odrder items");
      return;
   } else {
      const order = new Order({
         orderItems,
         shippingPrice,
         user: req.user._id,
         paymentMethod,
         itemsPrice,
         taxPrice,
         shippingAddress,
         totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
   }
};
