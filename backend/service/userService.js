const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/token");

async function registerUserService(userData) {
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      throw new Error("Please provide all required fields");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: username,
      email,
      password: passwordHash,
    });
    return user;
}
async function loginUserService(userData) {
    const { email, password } = userData;
    if (!email || !password) {
      throw new Error("Please provide all required fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    // Generate JWT token and set it as an HTTP-only cookie
    const token = generateToken(user);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };
    // res.cookie("token", token, cookieOptions);


    return {
        token,
        cookieOptions,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
}
module.exports = {
    registerUserService,
    loginUserService,
};
