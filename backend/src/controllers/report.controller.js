import Report from "../models/Report.js";
import Product from "../models/Product.js";

export const createReport = async (req, res, next) => {
    try {
        const { productId, reason, description } = req.body;

        if (!productId || !reason || !description) {
            return res.status(400).json({
                success: false,
                message: "Product, reason, and description are required"
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const report = await Report.create({
            reporter: req.userId,
            product: productId,
            reason,
            description: description.trim()
        });

        res.status(201).json({
            success: true,
            message: "Listing reported successfully. Thank you for keeping our campus safe.",
            report
        });
    } catch (error) {
        next(error);
    }
};
