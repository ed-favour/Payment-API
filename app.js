const express = require('express');
const morgan = require('morgan')
const app =  express(); 

const userRoute = require('./router/userRoutes')
const paymentRoute = require('./router/transactionRoutes')

app.use(express.json())

app.use(morgan('dev'));


app.use('/api/v1/users', userRoute)
app.use('/api/v1/transaction', paymentRoute)





module.exports = app;
