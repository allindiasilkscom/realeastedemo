import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const newUser = await new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "user Register successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandle(404, "User Not Found"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandle(401, "Please Check the Password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      // Existing user case
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      const { password, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // New user case
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4), // Fixed typo here
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save(); // Ensure this is awaited

      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
      const { password, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true }) // Fixed token name here
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};