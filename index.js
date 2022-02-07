const express = require('express');
const mongoose = require('mongoose');
const employeeRouter = require('./routes/EmployeeRoutes.js');

const app = express();
app.use(express.json()); // Make sure it comes back as json

//TODO - Replace you Connection String here
<<<<<<< HEAD
mongoose.connect('mongodb+srv://yukina:gbcmongoyukina@comp3123.ffyzn.mongodb.net/COMP3123?retryWrites=true&w=majority', {
=======
mongoose.connect('mongodb+srv://yukina:<password>@comp3123.ffyzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
>>>>>>> 4f8a40f9326c2edbf2b22ab7a4b9085aebae5066
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use(employeeRouter);

app.listen(8080, () => { console.log('Server is running...') });
