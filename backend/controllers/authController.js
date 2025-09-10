const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ where: { googleId } });

    if (!user) {
      user = await User.create({ googleId, email, name });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30m"
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Google login failed" });
  }
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, password: hashed });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid email" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,
      {expiresIn: '30m'}

    );
    res.json({ token });
  } catch (err) {
    console.error(err); // 🔴 LOG the error
    res.status(500).json({ error: "Server error" });
  }
};

exports.test = async(req, res)=> {
  res.send("Backend is running");
}
