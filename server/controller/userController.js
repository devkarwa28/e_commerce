const mongoose = require("mongoose");
const User = require("../models/UserModel");
const cloudinary = require("../config/cloudinary");

exports.updateProfile = async (req, res) => {
  try {
    const { uname, avatar } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (uname) {
      user.uname = uname;
    }
    if (avatar) {
      user.avatar = avatar;
    }
    await user.save();
    res.status(200).json({ message: "Profile Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { fullName, phone, pincode, city, state, street, landmark, type, isDefault } =
      req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!fullName || !phone || !pincode || !city || !state || !street) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    if (type && !["home", "work"].includes(type)) {
      return res.status(400).json({ message: "Invalid address type" });
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
      return res.status(400).json({ message: "Invalid pincode" });
    }
    const newAddress = {
      fullName,
      phone,
      pincode,
      city,
      state,
      street,
      landmark,
      type,
      isDefault
    };
    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
      newAddress.isDefault = true;
    } else if (user.addresses.length === 0) {
      newAddress.isDefault = true;
    }
    user.addresses.push(newAddress);
    await user.save();
    res.status(201).json({ message: "Address Added Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      phone,
      pincode,
      city,
      state,
      street,
      landmark,
      type,
      isDefault,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const address = user.addresses.id(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    if (phone && !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (pincode && !/^[0-9]{6}$/.test(pincode)) {
      return res.status(400).json({ message: "Invalid pincode" });
    }

    if (type && !["home", "work"].includes(type)) {
      return res.status(400).json({ message: "Invalid address type" });
    }

    if (fullName) {
      address.fullName = fullName;
    }
    if (phone) {
      address.phone = phone;
    }
    if (pincode) {
      address.pincode = pincode;
    }
    if (city) {
      address.city = city;
    }
    if (state) {
      address.state = state;
    }
    if (street) {
      address.street = street;
    }
    if (landmark !== undefined) {
      address.landmark = landmark;
    }
    if (type) {
      address.type = type;
    }
    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
      address.isDefault = true;
    }
    await user.save();
    res.status(200).json({ message: "Address Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const address = user.addresses.id(id);
    if (!address) {
      return res.status(404).json({ message: "Address Not Found" });
    }
    const wasDefault = address.isDefault;
    user.addresses.pull(id);
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }
    await user.save();
    res.status(200).json({ message: "Address Deleted Sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No File Uploaded" });
    }
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {folder: "avatars",},
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          },
        );
        stream.end(req.file.buffer);
      });
    };
    const result = await streamUpload();
    user.avatar = result.secure_url;
    await user.save();
    res.status(200).json({ message: "Avatar Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ addresses: user.addresses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
