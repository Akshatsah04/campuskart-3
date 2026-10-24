import mongoose from "mongoose";

const pendingRegistrationSchema = new mongoose.Schema(
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
            trim: true
        },

        branch: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
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

        password: {
            type: String,
            required: true
        },

        // Hashed OTP — never store the actual OTP
        otpHash: {
            type: String,
            required: true
        },

        // OTP expiration
        otpExpiresAt: {
            type: Date,
            required: true
        },

        // Number of incorrect OTP attempts
        otpAttempts: {
            type: Number,
            default: 0
        },

        // When OTP was last sent
        otpLastSentAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const PendingRegistration = mongoose.model(
    "PendingRegistration",
    pendingRegistrationSchema
);

export default PendingRegistration;