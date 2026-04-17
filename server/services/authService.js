const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLoginService = async (credential) => {
  if (!credential) {
    throw new Error("No Google credential provided");
  }

  // 1. Verify Google Token
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { sub: googleId, email, name, picture } = payload;

  // 2. Find or Create User
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      googleId,
      name,
      email,
      avatar: picture,
      role: "user", // Default role per requirement
    });
  } else if (!user.googleId) {
    // If user existed manually, link google account safely
    user.googleId = googleId;
    if (!user.avatar) user.avatar = picture;
    await user.save();
  }

  // 3. Generate JWT
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET configuration");
  }

  const token = jwt.sign(
    { 
      id: user._id, 
      role: user.role, 
      email: user.email,
      name: user.name
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // User sessions can last longer safely
  );

  return { user, token };
};

module.exports = {
  googleLoginService,
};
