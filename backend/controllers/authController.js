const { registerUserService, loginUserService } = require("../service/userService");

async function registerUser(req, res, next) {
  try {
    const user = await registerUserService(req.body);
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const { user, token, cookieOptions } = await loginUserService(req.body);
    res.cookie("token", token, cookieOptions);
    
    return res.status(200).json({
        message: "Login successful",
        token,
        user
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
  loginUser,
};
