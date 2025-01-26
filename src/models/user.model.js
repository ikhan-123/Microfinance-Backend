import mongoose, { Schema, } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: [true, "password is required"]
        },
        refreshToken: {
            type: String,
        }, loans: [
            {
                type: Schema.Types.ObjectId,
                ref: "Loan"
            }
        ]


    },
    {
        timestamps: true
    }
)




userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)