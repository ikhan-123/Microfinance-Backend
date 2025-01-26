import mongoose, { Schema } from "mongoose";

const loanSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            enum: ["education", "health", "business"],
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },
        repaymentDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Loan = mongoose.model("Loan", loanSchema);