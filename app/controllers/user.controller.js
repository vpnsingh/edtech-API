const db = require("../models");
const User = db.users;

// Create and Save a user
exports.signUp= async (req, res) => {
  // Validate request
  if (!req.body.email && !req.body.password) {
        res.status(400).send({ message: "Please provide email and password to continue." });
        return;
}
try {
  const filter = { email: req.body.email };
  let data = await User.findOne(filter);
//console.log(data);
if(data === null) {
//If not found , Create a User
const user = new User({
    firstName: req.body.firstName, 
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role ? req.body.role : 'user',
    isLoggedIn : true   
});
try {
let userSaved = await user.save(user);
res.send(userSaved);
} catch(err) {
    res.status(500).send({
    message: err.message || "Some error occurred, please try again later."
    });
}
}
else {
//User found with same email
res.status(400).send({
    message: "User Already Exists."
});
}
} catch(err) {
    res.status(500).send({
    message: err.message || "Some error occurred, please try again later."
    });
} };


// Retrieve user using the email provided in the req parameter.
// Validate user by matching the password provided in the req parameter.
exports.login = async (req, res) => {
try {
  const email = req.body.email;
  const password = req.body.password;
  // Validate request
  if (!email && !password) {
    res.status(400).send({ message: "Please provide email and password to continue." });
    return;
  }
const filter = { email: email, password : password };
let user = await User.findOne(filter);
//console.log(user);
if(user === null) {
res.status(401).send({
//better message wrt security. Prevents brute force attacks
    message: "Email or password not correct."
});
} else {
  if (user.isLoggedIn == true){
  res.status(400).send({message: "You are already Logged In"});
  return;  // CAUTION : don't use res.end() in an async function.
  }
  user.isLoggedIn = true;
  //console.log(user);
try {
let userUpdated = await User.findOneAndUpdate(filter, user, {new: true});
//console.log(userUpdated);
res.status(200).send({
            "firstName" : userUpdated.firstName,
            "lastName" : userUpdated.lastName,
            "email" : userUpdated.email,
            "isLoggedIn": userUpdated.isLoggedIn,
            "role" : userUpdated.role,
            "id" : userUpdated._id
          });
} catch(err) {
  res.status(500).send({
    message: err.message || "Some error occurred, please try again later."
    });
}
}
}catch(err) {
  res.status(500).send({
    message: err.message || "Some error occurred, please try again later."
    });
}
}; 


// Update isLoggedIn parameter of a User.
exports.logout = async (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(401).send({ message: "Please provide user credentials to logout." });
    return;
  }
  
try {
const id = req.body.id;
const update = { isLoggedIn: false };

let data = await User.findByIdAndUpdate(id, update);
//console.log(data);
res.send({ message: "Logged Out successfully." });
} catch(err) {
    res.status(404).send({
      message: "User Not Found - Logout failed."
    });
}
}; 