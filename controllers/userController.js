import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/cookie.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    console.log(name, email, password, mobile);
    if (!name || !email || !password || !mobile) {
      return res.json({ message: "Cannot left field empty." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      const hassedPassword = await bcrypt.hash(password.toString(), 10);

      let isUserCreated = await User.create({
        email,
        name,
        password: hassedPassword,
        mobile,
      });

      if (isUserCreated) {
        sendCookie(isUserCreated, res, "Registered successfully !!!");
      } else {
        return res.json({ success: false, message: "User not created" });
      }
    }
  } catch (error) {
    return res.json({ success: false, message: "User already exists" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "Invalid Credentials" });
  }
  const isMatch = await bcrypt.compare(
    password.toString(),
    user.password.toString()
  );

  if (!isMatch) {
    return res.json({ success: false, message: "Invalid Credentials !!!" });
  } else {
    sendCookie(user, res, "User loggedin successfully !!!");
  }
};

export const getMyDetails = (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .cookie("token", "",
     { expiresIn: new Date(Date.now()) ,
     sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
})
    .json({ success: true, message: "Loggedout successfully !!!" });
};
