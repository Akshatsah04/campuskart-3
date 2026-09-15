import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        reporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        reason: {
            type: String,
            required: [true, "Report reason is required"],
            enum: [
                "Inappropriate Content",
                "Scam or Fraud",
                "Misleading Information",
                "Duplicate or Spam Listing",
                "Prohibited Item",
                "Other"
            ]
        },
        description: {
            type: String,
            required: [true, "Please provide brief details for the report"],
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"]
        },
        status: {
            type: String,
            enum: ["pending", "reviewed", "dismissed"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

reportSchema.index({ product: 1 });
reportSchema.index({ reporter: 1 });

const Report = mongoose.model("Report", reportSchema);

export default Report;
