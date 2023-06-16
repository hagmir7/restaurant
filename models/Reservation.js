const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    costumerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
      default: null,
    },
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    },
    numPersons: {
      type: Number
    },
    status: {
      type: Boolean,
      required: true,
      default: null
    },
    phone: {
      type: String,
      required: true,
    },
    hubId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "hubs",
      default: null,
    },

  },
  {
    timestamps: true,
  }
);

ReservationModel = mongoose.model("Reservation", ReservationSchema);
module.exports = ReservationModel;
