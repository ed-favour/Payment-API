const catchAsync = require('../utlis/catchAsync')
const AppError = require('../utlis/appError')


exports.getAllUsers = catchAsync( async(req, res, next) =>{
  const newuserModel = await userModel.find()
  res.status(200).json({
      status: 'success',
      data: {
        newuserModel
      }
    })
})

exports.getUser = catchAsync(async (req, res, next) => {
  //route handler is all the call back function
  const user = await userModel.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });  
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newuserModel = await userModel.create({
    name: req.body.name,
    email: req.body.email
  });
  res.status(201).json({
    status: 'success',
    data: {
      newuserModel,
    },
  });
});


