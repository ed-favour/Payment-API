const mongoose= require("mongoose");
const user = require('./userModel')

    const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true,
    },
    // transactionId: {
    //   type: Number,
    //   trim: true,
    // },
    amount: {
      type: Number,
      required: [true, "amount is required"],
      default: 00
    },
    paymentStatus: {
      type: String,
      enum: ['successful', 'pending', 'failed'],
      default: 'pending',
    },
    paymentReference: {
      type: String,
      // required: [true, 'payment gateway is required'],
      enum: ['flutterwave'],
    }, 
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
      }
  
}
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
