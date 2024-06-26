import asyncHandler from "express-async-handler";
import {
  validateLogin,
  validateRegister,
  validateUpdateToken,
} from "../validation/userValidator.js";
import parseValidationError from "../utils/parseValidator.js";
import User from "../models/userModel.js";
import fs from "fs";
import deleteFile from "../utils/deleteFile.js";
import UserFavourite from "../models/userFavouriteModel.js";
//@desc  create a new user
//@right  PUBLIC
//@ route  POST /api/auth/register

const register = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    fullName,
    isServiceProvider,
    phoneNumber,
    imageUrl,
  } = req.body;
  const requestBody = {
    ...req.body,
    pushToken: req.body.pushToken ? req.body.pushToken : "token",
  };
  console.log("request body :", requestBody);
  try {
    const { error } = validateRegister(requestBody);
    console.log(error);
    if (error) {
      const errorMessage = parseValidationError(error);

      return res.status(400).json({
        message: errorMessage.message,
      });
    }

    await User.create({
      email: email,
      password: password,
      fullname: fullName,
      phoneNumber: phoneNumber,
      isServiceProvider: isServiceProvider,
      photoUrl: imageUrl,
      pushToken: requestBody.pushToken,
    });
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});
//@desc  edit a  user
//@right  PUBLIC
//@ route   PUT  /api/auth/register

const editUser = asyncHandler(async (req, res) => {
  const { fullName, phoneNumber, imageUrl } = req.body;
  console.log("request body :", req.body);
  try {
    const user = await User.findById(req.params.userId);
    if (req.body.imageUrl) {
      deleteFile(`.${user.photoUrl}`);
      user.fullname = fullName || user.fullname;
      user.phoneNumber = req.body.phoneNumber
        ? Number(phoneNumber)
        : user.phoneNumber;
      user.photoUrl = imageUrl;
      //  delete image
      await user.save();
    } else {
      user.fullname = req.body.fullName || user.fullname;
      user.phoneNumber = phoneNumber ? Number(phoneNumber) : user.phoneNumber;
      await user.save();
    }

    res.status(200).json({ message: "user modified successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

//@desc  login
//@right  PUBLIC
//@ route  POST /api/auth/login

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = validateLogin(req.body);
    if (error) {
      const errorMessage = parseValidationError(error);
      console.log(errorMessage);
      return res.status(400).json({
        message: errorMessage,
      });
    }
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    if (!(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid password" });
    }
    if (user.isServiceProvider === false) {
      let favouritesServicesIds = [];
      const userFavourite = await UserFavourite.findOne({ userId: user._id });
      if (userFavourite) {
        favouritesServicesIds = userFavourite.Favourites.map((favourite) =>
          favourite.offer.toString()
        );
      }
      // If the email and password are correct, you can handle successful login here
      return res
        .status(200)
        .json({ message: "Login successful", user, favouritesServicesIds });
    } else {
      // If the email and password are correct, you can handle successful login here
      return res.status(200).json({ message: "Login successful", user });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//@desc  update Token
//@right  PUBLIC
//@ route  POST /api/auth/:userId/token

const updateToken = asyncHandler(async (req, res) => {
  const { pushToken } = req.body;
  try {
    const { error } = validateUpdateToken(req.body);
    if (error) {
      const errorMessage = parseValidationError(error);
      console.log(errorMessage);
      return res.status(400).json({
        message: errorMessage,
      });
    }
    // Find the user by email
    const user = await User.findById(req.params.userId);

    if (user.pushToken !== pushToken) {
      user.pushToken = pushToken;
      await user.save();
      return res
        .status(200)
        .json({ message: "pushToken change successful", user });
    }

    return res
      .status(200)
      .json({ message: "pushToken change successful", user });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { register, login, editUser, updateToken };
