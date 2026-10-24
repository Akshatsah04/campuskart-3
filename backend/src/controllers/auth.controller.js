import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/Users.js";
import PendingRegistration from "../models/PendingRegistration.js";


// =====================================================
// START SIGNUP
// =====================================================

export const startSignup = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            registrationNumber,
            branch,
            year,
            whatsappNumber,
            password
        } = req.body;


        // =============================================
        // BASIC VALIDATION
        // =============================================

        if (
            !firstName ||
            !lastName ||
            !registrationNumber ||
            !branch ||
            !year ||
            !whatsappNumber ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "All signup fields are required"
            });
        }


        // =============================================
        // NORMALIZE DATA
        // =============================================

        const cleanFirstName = firstName.trim();
        const cleanLastName = lastName.trim();
        const cleanRegistrationNumber =
            registrationNumber.trim().toLowerCase();

        const cleanBranch = branch.trim();
        const cleanWhatsappNumber = whatsappNumber.trim();


        // =============================================
        // GENERATE COLLEGE EMAIL
        // =============================================

        const email =
            `${cleanFirstName}.${cleanRegistrationNumber}@muj.manipal.edu`
                .toLowerCase();


        // =============================================
        // CHECK EXISTING USER
        // =============================================

        const existingUser = await User.findOne({
            $or: [
                { email },
                { registrationNumber: cleanRegistrationNumber }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with these registration details already exists"
            });
        }


        // =============================================
        // GENERATE OTP
        // =============================================

        const otp = crypto.randomInt(100000, 1000000).toString();


        // =============================================
        // HASH PASSWORD
        // =============================================

        const hashedPassword = await bcrypt.hash(password, 10);


        // =============================================
        // HASH OTP
        // =============================================

        const otpHash = await bcrypt.hash(otp, 10);


        // =============================================
        // OTP EXPIRATION
        // 10 MINUTES
        // =============================================

        const otpExpiresAt = new Date(
            Date.now() + 10 * 60 * 1000
        );


        // =============================================
        // SAVE PENDING REGISTRATION
        // =============================================

        await PendingRegistration.findOneAndUpdate(
            {
                registrationNumber: cleanRegistrationNumber
            },
            {
                firstName: cleanFirstName,
                lastName: cleanLastName,
                registrationNumber: cleanRegistrationNumber,
                email,
                branch: cleanBranch,
                year: Number(year),
                whatsappNumber: cleanWhatsappNumber,
                password: hashedPassword,
                otpHash,
                otpExpiresAt,
                otpAttempts: 0,
                otpLastSentAt: new Date()
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );


        // =============================================
        // SEND OTP THROUGH BREVO
        // =============================================

        const brevoResponse = await fetch(
            "https://api.brevo.com/v3/smtp/email",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "api-key": process.env.BREVO_API_KEY
                },

                body: JSON.stringify({
                    sender: {
                        name: process.env.BREVO_SENDER_NAME,
                        email: process.env.BREVO_SENDER_EMAIL
                    },

                    to: [
                        {
                            email,
                            name: `${cleanFirstName} ${cleanLastName}`
                        }
                    ],

                    subject: "MujShoppers Email Verification OTP",

                    htmlContent: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                            
                            <h2>Welcome to MujShoppers 👋</h2>

                            <p>
                                Hi ${cleanFirstName},
                            </p>

                            <p>
                                Use the OTP below to verify your Manipal University Jaipur
                                college email address.
                            </p>

                            <div style="
                                font-size: 32px;
                                font-weight: bold;
                                letter-spacing: 8px;
                                padding: 20px;
                                text-align: center;
                                background: #f3f4f6;
                                border-radius: 10px;
                                margin: 25px 0;
                            ">
                                ${otp}
                            </div>

                            <p>
                                This OTP will expire in <strong>10 minutes</strong>.
                            </p>

                            <p>
                                If you did not request this verification, you can safely
                                ignore this email.
                            </p>

                            <p>
                                — MujShoppers Team
                            </p>

                        </div>
                    `
                })
            }
        );


        // =============================================
        // BREVO ERROR
        // =============================================

        if (!brevoResponse.ok) {
            const brevoError = await brevoResponse.text();

            console.error("Brevo error:", brevoError);

            return res.status(500).json({
                success: false,
                message: "Unable to send verification email"
            });
        }


        // =============================================
        // SUCCESS
        // =============================================

        return res.status(200).json({
            success: true,
            message: "Verification OTP sent to your college email",
            email
        });

    } catch (error) {
        next(error);
    }
};






// =====================================================
// VERIFY SIGNUP OTP
// =====================================================

export const verifySignup = async (req, res, next) => {
    try {
        const {
            registrationNumber,
            otp
        } = req.body;

        // =============================================
        // BASIC VALIDATION
        // =============================================

        if (!registrationNumber || !otp) {
            return res.status(400).json({
                success: false,
                message: "Registration number and OTP are required"
            });
        }

        const cleanRegistrationNumber =
            registrationNumber.trim().toLowerCase();

        const cleanOtp = otp.trim();

        // =============================================
        // FIND PENDING REGISTRATION
        // =============================================

        const pendingRegistration =
            await PendingRegistration.findOne({
                registrationNumber: cleanRegistrationNumber
            });

        if (!pendingRegistration) {
            return res.status(404).json({
                success: false,
                message: "Signup session not found. Please start signup again."
            });
        }

        // =============================================
        // CHECK OTP EXPIRATION
        // =============================================

        if (
            new Date() >
            pendingRegistration.otpExpiresAt
        ) {
            await PendingRegistration.deleteOne({
                _id: pendingRegistration._id
            });

            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new OTP."
            });
        }

        // =============================================
        // CHECK MAXIMUM ATTEMPTS
        // =============================================

        if (pendingRegistration.otpAttempts >= 5) {
            await PendingRegistration.deleteOne({
                _id: pendingRegistration._id
            });

            return res.status(429).json({
                success: false,
                message: "Too many incorrect attempts. Please start signup again."
            });
        }

        // =============================================
        // VERIFY OTP
        // =============================================

        const isOtpCorrect = await bcrypt.compare(
            cleanOtp,
            pendingRegistration.otpHash
        );

        if (!isOtpCorrect) {

            pendingRegistration.otpAttempts += 1;

            await pendingRegistration.save();

            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // =============================================
        // DOUBLE-CHECK USER DOESN'T EXIST
        // =============================================

        const existingUser = await User.findOne({
            $or: [
                {
                    email: pendingRegistration.email
                },
                {
                    registrationNumber:
                        pendingRegistration.registrationNumber
                }
            ]
        });

        if (existingUser) {
            await PendingRegistration.deleteOne({
                _id: pendingRegistration._id
            });

            return res.status(409).json({
                success: false,
                message: "An account with these registration details already exists"
            });
        }

        // =============================================
        // CREATE USER
        // =============================================

        const user = await User.create({
            firstName: pendingRegistration.firstName,
            lastName: pendingRegistration.lastName,

            registrationNumber:
                pendingRegistration.registrationNumber,

            email: pendingRegistration.email,

            isEmailVerified: true,

            password: pendingRegistration.password,

            college: "Manipal University Jaipur",

            branch: pendingRegistration.branch,

            year: pendingRegistration.year,

            whatsappNumber:
                pendingRegistration.whatsappNumber,

            profilePic: "",

            cart: [],

            wishlist: []
        });

        // =============================================
        // DELETE PENDING REGISTRATION
        // =============================================

        await PendingRegistration.deleteOne({
            _id: pendingRegistration._id
        });

        // =============================================
        // GENERATE JWT
        // =============================================

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // =============================================
        // RESPONSE
        // =============================================

        return res.status(201).json({
            success: true,
            message: "Email verified and account created successfully",

            token,

            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                registrationNumber:
                    user.registrationNumber,
                email: user.email,
                college: user.college,
                branch: user.branch,
                year: user.year,
                whatsappNumber:
                    user.whatsappNumber,
                profilePic: user.profilePic
            }
        });

    } catch (error) {
        next(error);
    }
};