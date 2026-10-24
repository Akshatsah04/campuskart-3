import User from "../models/Users.js";
import Product from "../models/Product.js";

// Get user's cart
export const getCart = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
            .populate({
                path: "cart.product",
                populate: {
                    path: "seller",
                    select: "name college branch year phone profilePic"
                }
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            cart: user.cart
        });

    } catch (error) {
        next(error);
    }
};


// Add product to cart
export const addToCart = async (req, res, next) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.status !== "available") {
            return res.status(400).json({
                success: false,
                message: "This product is no longer available"
            });
        }

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const alreadyInCart = user.cart.some(
            (item) => item.product.toString() === productId
        );

        if (alreadyInCart) {
            return res.status(200).json({
                success: true,
                message: "Product is already in your cart"
            });
        }

        user.cart.push({
            product: productId,
            quantity: 1
        });

        await user.save();

        // Get the updated cart with product + seller details
        const updatedUser = await User.findById(req.userId)
            .populate({
                path: "cart.product",
                populate: {
                    path: "seller",
                    select: "name college branch year phone profilePic"
                }
            });

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart: updatedUser.cart
        });

    } catch (error) {
        next(error);
    }
};

// Remove product from cart
export const removeFromCart = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.cart = user.cart.filter(
            (item) => item.product.toString() !== productId
        );

        await user.save();

        res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart: user.cart
        });

    } catch (error) {
        next(error);
    }
};


// Clear entire cart
export const clearCart = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.cart = [];

        await user.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared",
            cart: []
        });

    } catch (error) {
        next(error);
    }
};