import User from "./../models/userModel.js";
import generateToken from "./../utils/generateToken.js";

export const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExits = await User.findOne({ email: email });
    if (userExits) {
      res.status(400).send({ message: "Email already in the database" });
    }
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "user creation failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).send("User not found");
  }
};

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).send("User not found");
  }
};

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// @desc Delete user
//  @route DELETE /api/users/:id
// @access Private/Admin
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.findByIdAndDelete(id);
  res.json({ message: "User deleted" });
};
