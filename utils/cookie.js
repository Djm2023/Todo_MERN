import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  return res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: message,
    });
};
