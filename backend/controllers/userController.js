import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const getUserInfo = async (req, res) => {
  const { userId } = req.body;

  try {
    const userInfo = await userModel.findById(userId, { password: 0 });

    res.json({ success: true, data: userInfo });
  } catch (error) {
    res.json({ success: false, error });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesnot Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Password did not match" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "Interal Server Error" });
  }
};

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "This Email already registered",
      });
    }
    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: f + alse, message: "Enter valid Email" });
    }

    if (password.length < 8) {
      res.json({
        success: false,
        message: "Please Enter at least 8 digit password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred" });
  }
};

export { loginUser, registerUser, getUserInfo };
