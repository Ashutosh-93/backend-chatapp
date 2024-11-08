import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    let { name, username, gender, password, confirmPassword } = req.body;
    if (!name || !username || !gender || !password || !confirmPassword) {
      return res.status(401).json({
        message: "enter every fields before signing up",
      });
    }
    if (password !== confirmPassword) {
      return res
        .status(401)
        .json({ message: "password do not match with confirm password" });
    }
    let user = await User.findOne({ username });
    if (user) {
      return res.status(401).json({
        message: "username has been taken try different",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword");

    const profilePicMale = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const profilePicFemale = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    user = await User.create({
      name,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender == "male" ? profilePicMale : profilePicFemale
    });
    res.status(202).json({
      message: "user created successfully",
    });
  } catch (err) {
    console.log(`at register controller error: ${err}`);
  }
};

export const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(201)
        .json({ message: "enter all fields before loging in" });
    }
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        message: "invalid Username or Password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "invalid Username or Password",
      });
    }
    
    const getToken = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY);
    

    res.cookie("token",getToken).status(201).json({ message: "logged in" });
  } catch (err) {
    console.log(`at login controller error: ${err}`);
  }
};

export const logOut = (req, res) => {
  try {
    res.cookie("token","").json({"message":"logged out successfully"});
  } catch (err) {
    console.log(`at logout controller error: ${err}`);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    let loggedInUserId = req.Id;
    let users = await User.find({ _id: {$ne: loggedInUserId } }).select("-password");
    
    console.log(users);
    res.status(200).json({users});
    
  } catch (err) {
    console.log(`at get Other user error: ${err}`);
    
  }
};
