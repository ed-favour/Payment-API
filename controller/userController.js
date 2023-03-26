const catchAsync = require("../utlis/catchAsync");
const userModel = require("../models/userModel");
const AppError = require("../utlis/appError");


exports.getAllUsers = catchAsync(async (req, res, next) => {
  const newuserModel = await userModel.find();
  res.status(200).json({
    status: "success",
    data: {
      newuserModel,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  //route handler is all the call back function
  // const user = await userModel.findById(req.params.id);
  // const {ObjectId} = require('mongodb');
  // console.log("i amm in the user controller")
  // console.log(new ObjectId(req.params.id))
  const user = await userModel.aggregate([
    
    { $match: { _id: req.params.id } },
    // {
    //   $lookup: {
    //     from: "transactions",
    //     localField: "users._id",
    //     foreignField: "userId",
    //     as: "customerTransactions",
    //   },
    // },
  ]);
  console.log(user)
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
  const newuserModel = await userModel.create({
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
