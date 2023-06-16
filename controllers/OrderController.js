const Order = require("../models/Order");
const OrderItems = require("../models/OrderItems");
const { paginate } = require("../utils");



exports.create = async (req, res, next) => {
    const {deliveryPar, costumer, type} = req.body;
    console.log(deliveryPar, costumer, type);
    if (!deliveryPar || !costumer || !type) {return res.status(500).json({ message: "All fields are required." });}

  try {
    const order = await Order.create({
      creator:  req.user.id,
      deliveryPar, costumer, type,
    });
    res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.list = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 15;
    const orders = await Order.find();
    const pagination = paginate(orders, limit, currentPage);
    res.json(pagination);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internl Server Error" });
  }
};


exports.confirmed = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 15;
    const orders = await Order.find({
      status: true,
    });
    const pagination = paginate(orders, limit, currentPage);
    res.json(pagination);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internl Server Error" });
  }
};

exports.canceled = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 15;
    const orders = await Order.find({
      status: false,
    });
    const pagination = paginate(orders, limit, currentPage);
    res.json(pagination);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internl Server Error" });
  }
};


exports.update = async (req, res, next) => {
  const { deliveryPar, costumer, type } = req.body;
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { deliveryPar, costumer, type },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Interval Server Error" });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Order.findOneAndDelete({ _id: req.params.id, });
    res.json({message: 'Reservation delete successfully!'});
  } catch (error) {
    console.log(error);
    res.status(5000).json({ messsage: "Interval Server Error" });
  }
};


exports.getOrder= async(req,res)=>{
  // try {
    const order = await Order.findById(req.params.id)
    if(!order){
      res.status(401)
      throw new Error('order not found')
    }
    const orderItems=await OrderItems.find({orderId:order.id}) 
    res.status(200).json({
      order:order,
      orderItems:orderItems
    })
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ messsage: "Interval Server Error" });
  // }
}

exports.canceleOrder= async(req,res)=>{
// try {
  console.log(req.params.id);    
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id },
    {status:false},
    {new: true}
  );
  if(!order){
    console.log('order not found');
  }
  res.status(200).json({message:'order canceled',order})
// } catch (error) {
//   console.log(error);
//   res.status(500).json({ messsage: "Interval Server Error" });  
// }
}