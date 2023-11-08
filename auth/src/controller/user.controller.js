const UserModel = require("../model/user.model");
const bcrypt = require('bcrypt');
const { app } = require("../config");
const jwt = require("jsonwebtoken")

class UserController {
  constructor() {

  }

  async register(data) {
    const { email, password } = data
    try {
      const existingUser = await UserModel.exists({ email });

      if (existingUser) {
        return { ok: false, message: "Email is already registered" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      data.password = hashedPassword

      const newUser = new UserModel(data);
      const savedUser = await newUser.save();

      const { password: _, ...userWithoutPassword } = savedUser.toObject();
      return { ok: true, data: userWithoutPassword };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }

  async login(email, password) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return { ok: false, message: "Invalid email or password" };
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return { ok: false, message: "Invalid email or password" };
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          userType: user.userType
        },
        app.jwtSecret
      );

      const { password: _, ...userWithoutPassword } = user.toObject();
      return { ok: true, data: { user: userWithoutPassword, token } };
    }

    catch (error) {
      return { ok: false, message: error.message };
    }
  }

  async getUsers() {
    try {
      const users = await UserModel.find();
      return { ok: true, data: users };
    } catch (err) {
      console.log({ err })
      return { ok: false, message: err.message };
    }
  }

  async getUser(id) {
    try {
      const user = await UserModel.findById(id);
      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  async updateUser(id, newData) {
    try {
      const user = await UserModel.findByIdAndUpdate(id, newData, { new: true });
      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }


}

module.exports = new UserController();