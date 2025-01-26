import { Loan } from "../models/loan.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const applyForLoan = asyncHandler(async (req, res) => {
    const { amount, category, repaymentDate } = req.body;
    const loan = await Loan.create({
        user: req.user._id,
        amount,
        category,
        repaymentDate
    });

    return res.status(201).json(new ApiResponse(201, loan, "Loan application submitted successfully"));
});

export { applyForLoan, ApiResponse };