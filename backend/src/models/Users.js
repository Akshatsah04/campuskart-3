import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    },
    { _id: false }
);

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        registrationNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        isEmailVerified: {
            type: Boolean,
            default: false
        },

        password: {
            type: String,
            required: true
        },

        college: {
            type: String,
            trim: true,
            default: "Manipal University Jaipur"
        },

        branch: {
            type: String,
            required: true,
            trim: true
        },

        year: {
            type: Number,
            required: true
        },

        whatsappNumber: {
            type: String,
            required: true,
            trim: true
        },

        profilePic: {
            type: String,
            default: ""
        },

        // 🛒 User's cart
        cart: {
            type: [cartItemSchema],
            default: []
        },

        // ❤️ User's wishlist
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ]
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;