const flutterwave = require("flutterwave-node-v3");
const flw = new flutterwave(
  process.env.FLUTTERWAVE_V3_PUBLIC_KEY,
  process.env.FLUTTERWAVE_SECRET_KEY
);
const catchAsync = require("../utlis/catchAsync");
const AppError = require("../utlis/appError");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

exports.getAllTransaction = catchAsync(async (req, res, next) => {
  const newTransaction = await Transaction.find();
  res.status(200).json({
    status: "success",
    data: {
      newTransaction,
    },
  });
});

exports.getTransaction = catchAsync(async (req, res, next) => {
  //route handler is all the call back function
  const transaction = await Transaction.findById(req.params.id).populate(
    "userId"
  );
  // console.log(transaction)

  if (!transaction) {
    return next(new AppError("No transaction found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      transaction,
    },
  });
});

exports.createTransaction = catchAsync(async (req, res, next) => {
  const newTransaction = await Transaction.create({
    userId: req.body.userId,
    amount: req.body.amount,
    paymentReference: "6578998999877",
  });
  const user = await User.findOne({ _id: req.body.userId });
  const details = {
    card_number: "5531886652142950",
    cvv: "564",
    expiry_month: "09",
    expiry_year: "32",
    currency: "NGN",
    amount: Number(newTransaction.amount),
    fullname: `${user.firstName} ${user.lastName}`,
    email: user.email,
    tx_ref: newTransaction.paymentReference,
    enckey: process.env.FLUTTERWAVE_ENCRYPTION_KEY,
    authorization: {
      mode: "pin",
      pin: "3310",
    },
  };
  const response = await chargeCard(details);

  if (
    response?.status === "success" &&
    response?.data.amount === newTransaction.amount
  ) {
    const result = await Transaction.findOneAndUpdate(newTransaction._id, {
      paymentStatus: "successful",
    });
  } else {
    await Transaction.findOneAndUpdate(newTransaction._id, {
      paymentStatus: "failed",
    });
  }

  res.status(200).json({
    status: "success",
  });
});

const chargeCard = async (payload) => {
  try {
    const response = await flw.Charge.card(payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
