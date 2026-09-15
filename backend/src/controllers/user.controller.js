import User from "../models/Users.js";
import Product from "../models/Product.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            college,
            branch,
            year,
            phone
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            college: college || "Manipal University Jaipur",
            branch,
            year,
            phone
        });

        // Create JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                branch: user.branch,
                year: user.year,
                phone: user.phone,
                profilePic: user.profilePic
            }
        });

    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                branch: user.branch,
                year: user.year,
                phone: user.phone,
                profilePic: user.profilePic
            }
        });

    } catch (error) {
        next(error);
    }
};

export const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        next(error);
    }
};

export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const { name, branch, year, phone, profilePic } = req.body;

        if (name !== undefined) user.name = name.trim();
        if (branch !== undefined) user.branch = branch.trim();
        if (year !== undefined) user.year = Number(year);
        if (phone !== undefined) user.phone = phone.trim();
        if (profilePic !== undefined) user.profilePic = profilePic;

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                college: updatedUser.college,
                branch: updatedUser.branch,
                year: updatedUser.year,
                phone: updatedUser.phone,
                profilePic: updatedUser.profilePic
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getUserPublicProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
            .select("name college branch year profilePic createdAt");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Seller not found"
            });
        }

        const activeListings = await Product.find({
            seller: user._id,
            status: "available"
        }).sort({ createdAt: -1 });

        const totalListingsCount = await Product.countDocuments({ seller: user._id });

        res.status(200).json({
            success: true,
            user,
            activeListings,
            totalListings: totalListingsCount
        });
    } catch (error) {
        next(error);
    }
};