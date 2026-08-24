import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Product title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters"],
            maxlength: [100, "Title cannot exceed 100 characters"]
        },

        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [1000, "Description cannot exceed 1000 characters"]
        },

        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"]
        },

        category: {
            type: String,
            required: [true, "Product category is required"],
            trim: true
        },

        condition: {
            type: String,
            required: [true, "Product condition is required"],
            enum: {
                values: ["New", "Like New", "Good", "Fair"],
                message: "Invalid product condition"
            }
        },

        images: {
            type: [String],
            default: []
        },

        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        college: {
            type: String,
            required: [true, "College is required"],
            trim: true
        },

        status: {
            type: String,
            enum: ["available", "sold"],
            default: "available"
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;