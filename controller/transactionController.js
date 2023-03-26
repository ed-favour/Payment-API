const axios = require("axios");
const flutterwave = require("flutterwave-node-v3");
const flw = new flutterwave(
  process.env.FLUTTERWAVE_V3_PUBLIC_KEY,
  process.env.FLUTTERWAVE_SECRET_KEY
);
const catchAsync = require("../utlis/catchAsync");
const AppError = require("../utlis/appError");
const Transaction = require("../models/transactionModel");

exports.getAllTransaction = catchAsync(async (req, res, next) => {
  const newTransaction = await Transaction.find();
  res.status(200).json({
    status: "success",
    data: {
      newTransaction,
    },
  });
  next();
});

exports.getTransaction = catchAsync(async (req, res, next) => {
  //route handler is all the call back function
  const transaction = await Transaction
    .findById(req.params.id)
    .populate("userId");
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
  next();
});

exports.createTransaction = catchAsync(async (req, res, next) => {
  const newTransaction = await Transaction.create({
    userId: req.body.userId,
    amount: req.body.amount,
    paymentReference: "6578998999877",
  });
  console.log("newTransaction");
  console.log(newTransaction);

  const details = {
    card_number: "5531886652142950",
    cvv: "564",
    expiry_month: "09",
    expiry_year: "32",
    currency: "NGN",
    amount: "100",
    fullname: "Yolande Aglaé Colbert",
    email: "user@example.com",
    tx_ref: "MC- 3243e",
    enckey: process.env.FLUTTERWAVE_ENCRYPTION_KEY,
    authorization: {
      " mode": "pin",
      "pin": "3310",
    },
  }; 
  encrypt()
 
  console.log(details);

  axios
    .post(
      "https://api.flutterwave.com/v3/charges?type=card",
      details,

      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      console.log(response);
      res.status(200).send(response.data);
      if (response.data.status === "successful" && response.data.amount === newTransaction.amount) {
        newTransaction.update({ status: "completed" });
      } else {
        newTransaction.update({ status: "initiated" });
      }
      
    })
    .catch((error) => {
      console.log(error.response.data);
    });
});



  const encrypt = (FLUTTERWAVE_ENCRYPTION_KEY, details) => {
    const text = JSON.stringify(details);
    const forge = require("node-forge");
    const cipher = forge.cipher.createCipher(
        "3DES-ECB",
        forge.util.createBuffer(FLUTTERWAVE_ENCRYPTION_KEY)
    );
    
    cipher.start({iv: ""});
    cipher.update(forge.util.createBuffer(text, "utf-8"));
    cipher.finish();
    const encrypted = cipher.output;
    return forge.util.encode64(encrypted.getBytes());
  };
  