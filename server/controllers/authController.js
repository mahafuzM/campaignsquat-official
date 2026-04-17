const { googleLoginService } = require("../services/authService");

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body; // credential token from frontend popup

    // Handled purely by the service layer (which creates standard 'user' roles by default)
    const { user, token } = await googleLoginService(credential);

    // Enforce role-based access check
    if (user.role !== "admin" && user.role !== "moderator") {
      return res.status(403).json({
        success: false,
        message: "Access Denied! You do not have admin privileges. Please contact the administrator to update your role.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Google Auth Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to authenticate with Google",
    });
  }
};

module.exports = {
  googleLogin,
};
