const transactionModel = require('../models/transactionModel')
const catchAsync = require('../utlis/catchAsync')


exports.getAllTransaction = catchAsync( async(req, res, next) =>{
    const newtransactionModel = await transactionModel.find()
    res.status(200).json({
        status: 'success',
        data: {
          newtransactionModel
        }
      })
    next()
})

exports.getTransaction = catchAsync(async (req, res, next) => {
  //route handler is all the call back function
  const transaction = await transactionModel.findById(req.params.id);

  if (!transaction) {
    return next(new AppError('No transaction found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });  
});


exports.createTransaction = catchAsync(async (req, res, next) => {
  const  newtransactionModel = await transactionModel.create({
    userId: req.body.userId,
    amount:  req.body.amount,
    paymentStatus:  req.body.paymentStatus
  });
  res.status(201).json({
    status: 'success',
    data: {
      newtransactionModel,
    },
  });
});