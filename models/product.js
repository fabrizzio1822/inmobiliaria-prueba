import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 160,
      text: true,
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 1000000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 6,
      validate: {
        validator: function (value) {
          return value !== 0;
        },
        message: "",
      },
    },
    baños: Number,
    habitaciones: Number,
    metros: Number,
    location: {
      type: String,
      trim: true,
      required: true,
      minLength: 1,
      maxLength: 255,
    },
    shipping: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    images: [
      {
        secure_url: {
          type: String,
          default: "",
        },
        public_id: {
          type: String,
          default: "",
        },
      },
    ],
  },
  { timestamps: true }
);
productSchema.plugin(uniqueValidator, { message: "ya existe" });
export default mongoose.models.Product || mongoose.model("Product", productSchema);
