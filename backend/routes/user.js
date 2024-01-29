const { Router } = require("express");
const { userSignupMiddleware } = require("../middleware/userSignupMiddleware");
const { userSigninMiddleware } = require("../middleware/userSigninMiddleware");
const { User } = require("../database/db");
const { Account } = require("../database/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/authMiddlware");
const userRouter = Router();

userRouter.post("/signup", userSignupMiddleware, async (req, res) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const user = await User.findOne({
    username: username,
  });
  if (user) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  User.create({
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password,
  })
    .then(async (user) => {
      const userid = user._id;
      //   console.log(userid) ;
      await Account.create({
        userId: user._id,
        balance: Math.floor(Math.random() * 10000 + 1),
      });
      const token = jwt.sign(
        {
          userid,
        },
        JWT_SECRET
      );
      return res.status(200).json({
        message: "User created successfully",
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        message: "Faild to create User",
      });
    });
});

userRouter.post("/signin", userSigninMiddleware, async (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];
  const user = await User.findOne({
    username: username,
    password: password,
  });
  if (!user) {
    return res.status(411).json({
      message: "Error while loggin in ",
    });
  }
  const userid = user._id;
  const token = jwt.sign(
    {
      userid,
    },
    JWT_SECRET
  );
  res.status(200).json({
    token: token,
  });
});

userRouter.put("/", authMiddleware, async (req, res) => {
  try {
    await User.updateOne({ _id: req.userId }, { $set: req.body });
  } catch (err) {
    return res.status(411).json({
      message: "failed to update data",
    });
  }
  res.status(200).json({
    message: "updated successfully",
  });
});

userRouter.get("/bulk",authMiddleware, async (req, res) => {
  const name = req.query["filter"] || "";
  const user = await User.find(
    {
      $or: [
        {
          firstName: {
            $regex: name,
          },
        },
        {
          lastName: {
            $regex: name,
          },
        },
      ],
    },
    {
      _id: true,
      firstName: true,
      lastName: true,
    }
  );
  res.status(200).json({
    user: user,
  });
});

module.exports = {
  userRouter,
};
