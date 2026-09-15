import Product from "../models/product.js";
import User from "../models/Users.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const createProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            category,
            condition
        } = req.body;

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Upload images to Cloudinary
        const imageUrls = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file.buffer);

                imageUrls.push(result.secure_url);
            }
        }

        const product = await Product.create({
            title,
            description,
            price,
            category,
            condition,
            images: imageUrls,
            seller: req.userId,
            college: user.college
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create product",
            error: error.message
        });
    }
};



export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("seller", "name college branch year");

        res.status(200).json({
            count: products.length,
            products
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product
            .findById(req.params.id)
            .populate("seller", "name college branch year");

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            product
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch product",
            error: error.message
        });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Check ownership
        if (product.seller.toString() !== req.userId) {
            return res.status(403).json({
                message: "You are not allowed to update this product"
            });
        }

        const {
            title,
            description,
            price,
            category,
            condition,
            status
        } = req.body;

        product.title = title ?? product.title;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.category = category ?? product.category;
        product.condition = condition ?? product.condition;
        product.status = status ?? product.status;

        const updatedProduct = await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update product",
            error: error.message
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Check ownership
        if (product.seller.toString() !== req.userId) {
            return res.status(403).json({
                message: "You are not allowed to delete this product"
            });
        }

        await product.deleteOne();

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        });
    }
};