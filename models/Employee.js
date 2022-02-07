const mongoose = require('mongoose');

//Create Schema
const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
<<<<<<< HEAD
    required: [true, 'Please enter first name'],
=======
    required: [true, "Please Enter First Name"],
>>>>>>> 4f8a40f9326c2edbf2b22ab7a4b9085aebae5066
    trim: true,
    lowercase: true
  },
  lastname: {
    type: String,
<<<<<<< HEAD
    alias: 'surname',
=======
    alias:'surname', //Family Name
>>>>>>> 4f8a40f9326c2edbf2b22ab7a4b9085aebae5066
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
<<<<<<< HEAD
    //index: true, //Optional if unique is defined
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    uppercase: true,
    //minlength:10,
    //maxlength: 50,
    //Custom validation
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
=======
    trim: true,
    uppercase: true,
    minlength: 5,
    maxlength: 50,
    //Custom Validator for Email
    validate: function(value){
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value)
>>>>>>> 4f8a40f9326c2edbf2b22ab7a4b9085aebae5066
    }
  },
  gender: {
    type: String,
    required: true,
<<<<<<< HEAD
    enum: ['male', 'female', 'other'],
    trim: true,
    lowercase: true
=======
    enum: ['male','female','other']
>>>>>>> 4f8a40f9326c2edbf2b22ab7a4b9085aebae5066
  },
  city:{
    type: String,
    required: true,
<<<<<<< HEAD
    trim: true,
    lowercase: true
=======
    trim: true
>>>>>>> 4f8a40f9326c2edbf2b22ab7a4b9085aebae5066
  },
  designation: {
    type: String,
    required: true,
<<<<<<< HEAD
    trim: true,
    lowercase: true
=======
    trim: true
>>>>>>> 4f8a40f9326c2edbf2b22ab7a4b9085aebae5066
  },
  salary: {
    type: Number,
    default: 0.0,
<<<<<<< HEAD
    //min: [1000, 'Too less Salary'],
    //max: 12000,
    validate(value) {
      if (value < 0.0){
         throw new Error("Negative Salary aren't real.");
=======
    //min: [1000, 'Too less salary'],
    //max: 25000
    validate: function(value){
      if(value < 0){
        throw new Error("Negative Salary not allowed")
>>>>>>> 4f8a40f9326c2edbf2b22ab7a4b9085aebae5066
      }
    }
  },
  created: { 
    type: Date,
    default: Date.now,
    alias: 'createdat'
  },
  updatedat: { 
    type: Date,
    default: Date.now
  },
});

//Declare Virtual Fields
EmployeeSchema.virtual('fullname')
              .get(function(){
                return `${this.firstname} ${this.lastname}`
              })
              .set(function(value){
                //Set values as needed
              })

//Custom Schema Methods
//1. Instance Method Declaration
EmployeeSchema.methods.getFullName = function(){
  console.log(`Full Name : ${this.firstname} ${this.lastname}`)
  return `${this.firstname} ${this.lastname}`
}

EmployeeSchema.methods.getFormatedSalary = function(){
  return `$${this.salary}`
}

//2. Static method declararion
EmployeeSchema.static("getEmployeeByFirstName", function(value) {
  return this.find({firstname: value})
});

//Writing Query Helpers
EmployeeSchema.query.byFirstName = function(name) {
  //return this.where({ name: new RegExp(name, 'i') })
  return this.where({ name: name, })
  //const escapedName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"); 
  //const regex = new RegExp(escapedName, "gi");
  //return User.find({ firstName: regex, isDeleted: false });
};


EmployeeSchema.pre('save', (next) => {
  console.log("Before Save")
  let now = Date.now()
   
  this.updatedat = now
  // Set a value for createdAt only if it is null
  if (!this.created) {
    this.created = now
  }
  
  // Call the next function in the pre-save chain
  next()
});

EmployeeSchema.pre('findOneAndUpdate', (next) => {
  console.log("Before findOneAndUpdate")
  let now = Date.now()
  this.updatedat = now
  console.log(this.updatedat)
  next()
});


EmployeeSchema.post('init', (doc) => {
  console.log('%s has been initialized from the db', doc._id);
});

EmployeeSchema.post('validate', (doc) => {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

EmployeeSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

EmployeeSchema.post('remove', (doc) => {
  console.log('%s has been removed', doc._id);
});

//Create Model
const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;