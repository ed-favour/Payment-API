const catchAsync = require("../utlis/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utlis/appError");
const {ObjectId} = require('mongodb')

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const newuserModel = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      newuserModel,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.aggregate([
    { $match: { _id: new ObjectId(req.params.id) } },
    {
      $lookup: {
        from: "transactions",
        localField: "userId",
        foreignField: "users._id",
        as: "customerTransactions",
      },
    },
  ]);
  
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newuserModel = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  res.status(201).json({
    status: "success",
    data: {
      newuserModel,
    },
  });
});
