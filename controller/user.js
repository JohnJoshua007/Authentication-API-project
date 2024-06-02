// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
// const User = require("../model/User");

// const userCtrl = {
//   //register
//   register: asyncHandler(async (req, res) => {
//     const { username, email, password } = req.body;
//     //validations
//     if (!username || !email || !password) {
//       throw new Error("Please all fields are required");
//     }
//     // chcek if a user already exists
//     const userExits = await User.findOne({ email });
//     if (userExits) {
//       throw new Error("User already exists");
//     }
//     //hash the user password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     //craete the user
//     const userCreated = await User.create({
//       username,
//       password: hashedPassword,
//       email,
//     });
//     //send the response

//     res.json({
//       username: userCreated.username,
//       email: userCreated.email,
//       id: userCreated.id,
//     });
//   }),

//   //login
//   login: asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     //!check if user email exists
//     const user = await User.findOne({ email });
//     if(!isMatch){
//         throw new Error("Invaid credentials");
//     //!check if user password is
//     const isMatch = await bcrypt.compare(password, user.password);
//     if(!isMatch){
//         throw new Error("Invaid credentials");
//     }
//     //! generate the token
//     const token = jwt.sign({id:user._id}, 'anykey', {expiresIn:"30d"});
//     //!send response
//     res.json({
//         message: "Login success",
//         token,
//         id: user._id,
//         email:user.email,
//         username:user.username,
//     });

//   //profile
//   profile: asyncHandler((req, res) => {
//      //Find the user
//      const user = await User.findById(req.user).select("-password");
//      res.json({ user });
//    }),
//  };

// module.exports = userCtrl;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");

const userCtrl = {
  //!Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    //!Validations
    if (!username || !email || !password) {
      throw new Error("Please all fields are required");
    }
    //! check if user already exists
    const userExits = await User.findOne({ email });
    if (userExits) {
      throw new Error("User already exists");
    }
    //! Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //!Create the user
    const userCreated = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    //!Send the response

    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated.id,
    });
  }),
  //!Login
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //!Check if user email exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    //!Check if user password is valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    //! Generate the token
    const token = jwt.sign({ id: user._id }, "anyKey", { expiresIn: "30d" });
    //!Send the response
    res.json({
      message: "Login success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),
  //!Profile
  profile: asyncHandler(async (req, res) => {
    console.log(req.headers);
    //Find the user
    const user = await User.findById(trq.user).select("-password");
    res.json({ user });
  }),
};
module.exports = userCtrl;
