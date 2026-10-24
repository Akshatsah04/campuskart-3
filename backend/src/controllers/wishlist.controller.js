import User from "../models/Users.js";
import Product from "../models/Product.js";


// Get user's wishlist
export const getWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
            .populate({
                path: "wishlist",
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
            wishlist: user.wishlist
        });

    } catch (error) {
        next(error);
    }
};


// Add product to wishlist
export const addToWishlist = async (req, res, next) => {
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

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const alreadyInWishlist = user.wishlist.some(
            (id) => id.toString() === productId
        );

        if (alreadyInWishlist) {
            return res.status(200).json({
                success: true,
                message: "Product is already in your wishlist"
            });
        }

        user.wishlist.push(productId);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            wishlist: user.wishlist
        });

    } catch (error) {
        next(error);
    }
};


// Remove product from wishlist
export const removeFromWishlist = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.wishlist = user.wishlist.filter(
            (id) => id.toString() !== productId
        );

        await user.save();

        res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
            wishlist: user.wishlist
        });

    } catch (error) {
        next(error);
    }
};


// Clear wishlist
export const clearWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.wishlist = [];

        await user.save();

        res.status(200).json({
            success: true,
            message: "Wishlist cleared",
            wishlist: []
        });

    } catch (error) {
        next(error);
    }
};