import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;

    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullName,
        email,
        username,
        password: hashedPassword,
        // Uncomment these lines if you are handling file uploads
        // avatar: avatar.url,
        // coverImage: coverImage?.url
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, 'Invalid email or password');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, 'Invalid email or password');
    }

    const token = user.generateAccessToken();
    res.status(200).json({ token });
});

export { loginUser };

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('token', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logged out successfully' });
});

export { registerUser,  logoutUser };