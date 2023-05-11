const mongoose = require("mongoose");

const HubeSchema = mongoose.Schema(
  {
    chief: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    phone: {
      type: String,
      required: true,
      maxlength: 15,
    },

    address: {
      type: String,
      required: true,
      maxlength: 100,
    },

    location: {
      type: String,
      required: true,
      maxlength: 100,
    },

    images: {
      type: [String],
      required: true,
    },

    users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },

    email: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const HubeModel = mongoose.model("Hube", HubeSchema);
module.exports = HubeModel;
