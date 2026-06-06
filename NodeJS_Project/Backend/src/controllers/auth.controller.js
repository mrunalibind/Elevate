import generateToken from "../utils/jwt.js";

const googleCallback = async (req, res) => {
  try {
    const token = generateToken({
      interviewerId: req.user._id,
    });

    return res.redirect(
      `${process.env.FRONTEND_URL}?token=${token}`
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Authentication Failed",
    });
  }
};

export default googleCallback;