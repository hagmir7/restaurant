const Reservation = require("../models/Reservation");
const { paginate } = require("../utils");
const fs = require("fs");

const path = require("path");
// Project director path
const __app = path.resolve(path.join(__dirname, ".."));

exports.create = async (req, res, next) => {
    const {start, end, numPersons, hubId,status,phone} = req.body;
    //Add hubId in this function 
    if (!start || !end || !numPersons || !phone) {
        return res.status(500).json({ message: "All fields are required." });
    }

  try {

    const reservation = await Reservation.create({
      costumerId: req.user ? req.user.id : null,
      start, end, numPersons, hubId,status,phone
    });
    res.json(reservation);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.list = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 15;
    const reservations = await Reservation.find();
    const pagination = paginate(reservations, limit, currentPage);
    res.json(pagination);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internl Server Error" });
  }
};

exports.pending = async (req, res, next) => {
    try {
      const currentPage = req.query.page || 1;
      const limit = req.query.limit || 15;
      const reservations = await Reservation.find({
        status:null
      });
      const pagination = paginate(reservations, limit, currentPage);
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
      const reservations = await Reservation.find({
        status:true
      });
      const pagination = paginate(reservations, limit, currentPage);
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
      const reservations = await Reservation.find({
        status:false
      });
      const pagination = paginate(reservations, limit, currentPage);
      res.json(pagination);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internl Server Error" });
    }
  };


exports.update = async (req, res, next) => {
    const {start, end, numPersons, hubId,status,phone} = req.body;
  try {
    const reservation = await Reservation.findOneAndUpdate(
      { _id: req.params.id },
      {start, end, numPersons, hubId,status,phone},
      {new: true}
    );
    res.json(reservation)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Interval Server Error" });
  }
};


exports.confirme = async (req, res, next) => {
// try {
  const reservation = await Reservation.findOneAndUpdate(
    { _id: req.params.id },
    {status:true},
    {new: true}
  );
  if(!reservation){
    console.log('reservation not found');
  }
  res.status(200).json({message:'reservation confirmed',reservation})
// } catch (error) {
//   console.log(error);
//   res.status(500).json({ message: "Interval Server Error" });
// }
};



exports.cancele = async (req, res, next) => {
try {
  const reservation = await Reservation.findOneAndUpdate(
    { _id: req.params.id },
    {status:false},
    {new: true}
  );
  res.status(200).json({message:'reservation canseled',reservation})
} catch (error) {
  console.log(error);
  res.status(500).json({ message: "Interval Server Error" });
}
};



exports.delete = async (req, res, next) => {
  try {
    await Reservation.findOneAndDelete({ _id: req.params.id, });
    res.json({message: 'Reservation delete successfully!'});
  } catch (error) {
    console.log(error);
    res.status(5000).json({ messsage: "Interval Server Error" });
  }
};
