const OrderItems = require("../models/OrderItems");
const PorductMode = require("../models/Product");


exports.create = async (req, res, next) => {
  const { quantity } = req.body;
  const { productId } = req.params; // orderItem/create/laksjdfjsaldf

  
  if (!quantity || !total || !productId) {
    return res.status(500).json({ message: "All fields are required." });
  }

  const price = await PorductMode.findById(productId).price;

  try {
    const orderItems = await OrderItems.create({
      quantity,
      total: price * quantity,
      productId,
    });
    res.json(orderItems);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};


exports.delete = async (req, res, next) => {
  try {
    await OrderItems.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "OrderItems delete successfully!" });
  } catch (error) {
    console.log(error);
    res.status(5000).json({ messsage: "Interval Server Error" });
  }
};
