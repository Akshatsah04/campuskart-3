import Product from "../models/Product.js";
import User from "../models/Users.js";
import { uploadToCloudinary, deleteFromCloudinary, extractPublicIdFromUrl } from "../utils/uploadToCloudinary.js";

// ==========================================
// CREATE PRODUCT
// ==========================================
export const createProduct = async (req, res, next) => {
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
                success: false,
                message: "User account not found"
            });
        }

        // Upload images to Cloudinary
        const images = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file.buffer);
                images.push({
                    url: result.url,
                    publicId: result.publicId
                });
            }
        }

        const product = await Product.create({
            title: title.trim(),
            description: description.trim(),
            price: Number(price),
            category: category.trim(),
            condition,
            images,
            seller: req.userId,
            college: user.college || "Manipal University Jaipur",
            status: "available"
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        next(error);
    }
};

// ==========================================
// GET PRODUCTS (SEARCH, FILTER, PAGINATE, SORT)
// ==========================================
export const getProducts = async (req, res, next) => {
    try {
        const {
            search,
            category,
            condition,
            college,
            minPrice,
            maxPrice,
            status = "available",
            seller,
            sort = "newest",
            page = 1,
            limit = 12
        } = req.query;

        const filter = {};

        // Status filter (default to 'available' for public browse)
        if (status && status !== "All") {
            filter.status = status;
        }

        // Search query (title or description)
        if (search && search.trim()) {
            const regex = new RegExp(search.trim(), "i");
            filter.$or = [
                { title: regex },
                { description: regex },
                { category: regex }
            ];
        }

        // Category
        if (category && category !== "All") {
            filter.category = category;
        }

        // Condition
        if (condition && condition !== "All") {
            filter.condition = condition;
        }

        // College
        if (college && college !== "All") {
            filter.college = college;
        }

        // Specific seller
        if (seller) {
            filter.seller = seller;
        }

        // Price range
        if (minPrice !== undefined && minPrice !== "" || maxPrice !== undefined && maxPrice !== "") {
            filter.price = {};
            if (minPrice !== undefined && minPrice !== "") {
                filter.price.$gte = Number(minPrice);
            }
            if (maxPrice !== undefined && maxPrice !== "") {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // Sorting options
        let sortOption = { createdAt: -1 };
        if (sort === "price_asc" || sort === "Price: Low to High") {
            sortOption = { price: 1 };
        } else if (sort === "price_desc" || sort === "Price: High to Low") {
            sortOption = { price: -1 };
        } else if (sort === "oldest") {
            sortOption = { createdAt: 1 };
        } else if (sort === "newest" || sort === "Newest") {
            sortOption = { createdAt: -1 };
        }

        // Pagination
        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
        const skip = (pageNum - 1) * limitNum;

        const total = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNum)
            .populate("seller", "name college branch year phone profilePic");

        res.status(200).json({
            success: true,
            count: products.length,
            total,
            totalPages: Math.ceil(total / limitNum) || 1,
            currentPage: pageNum,
            products
        });

    } catch (error) {
        next(error);
    }
};

// ==========================================
// GET SINGLE PRODUCT BY ID
// ==========================================
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("seller", "name college branch year phone profilePic createdAt");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        next(error);
    }
};

// ==========================================
// GET CURRENT SELLER'S PRODUCTS
// ==========================================
export const getMyProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ seller: req.userId })
            .sort({ createdAt: -1 });

        const activeCount = products.filter((p) => p.status === "available").length;
        const soldCount = products.filter((p) => p.status === "sold").length;

        res.status(200).json({
            success: true,
            total: products.length,
            activeCount,
            soldCount,
            products
        });
    } catch (error) {
        next(error);
    }
};

// ==========================================
// UPDATE PRODUCT
// ==========================================
export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check ownership
        if (product.seller.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this listing"
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

        if (title !== undefined) product.title = title.trim();
        if (description !== undefined) product.description = description.trim();
        if (price !== undefined) product.price = Number(price);
        if (category !== undefined) product.category = category.trim();
        if (condition !== undefined) product.condition = condition;
        if (status !== undefined) product.status = status;

        // Handle new images upload if any
        if (req.files && req.files.length > 0) {
            const newImages = [];
            for (const file of req.files) {
                const result = await uploadToCloudinary(file.buffer);
                newImages.push({
                    url: result.url,
                    publicId: result.publicId
                });
            }
            product.images = [...product.images, ...newImages];
        }

        const updatedProduct = await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        next(error);
    }
};

// ==========================================
// UPDATE PRODUCT STATUS (AVAILABLE / SOLD)
// ==========================================
export const updateProductStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!["available", "sold"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be either 'available' or 'sold'"
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.seller.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this listing status"
            });
        }

        product.status = status;
        await product.save();

        res.status(200).json({
            success: true,
            message: `Product status marked as ${status}`,
            product
        });
    } catch (error) {
        next(error);
    }
};

// ==========================================
// DELETE PRODUCT (WITH CLOUDINARY CLEANUP)
// ==========================================
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check ownership
        if (product.seller.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this product"
            });
        }

        // Delete all associated images from Cloudinary
        if (product.images && product.images.length > 0) {
            for (const img of product.images) {
                const publicId = typeof img === "object" ? img.publicId : extractPublicIdFromUrl(img);
                if (publicId) {
                    await deleteFromCloudinary(publicId);
                }
            }
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};