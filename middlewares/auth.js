import { User } from "../model/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "First login" });
  }
  const decodeData = jwt.verify(token, process.env.SECRET);
  req.user = await User.findById(decodeData._id);
  next();
};
