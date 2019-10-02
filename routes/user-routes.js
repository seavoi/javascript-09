// Require Express
const express = require('express');
// Require Express Router
const router = express.Router();
// Require a Validation Library
const { check, validationResult } = require('express-validator/check');

// Database
const db = require('../db');
const { User } = db.models;

/*  This array is used to keep track of user records as they are created.
const users = []; */


// Authentication Middleware 
const authenticateUser = require('../middleware/authenticateUser');

// Return the currently authenticated user

router.get('/users', authenticateUser, async (req, res, next) => {
  try {
    const user = await req.currentUser;
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress
    });
  } catch (err) {
    console.error("There's been an error: ", err);
  }
});

// Create a user

router.post('/users', [
  check('firstName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "firstName"'),
  check('lastName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "lastName"'),
  check('emailAddress')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "emailAddress"'),
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "password"'),
], (req, res) => {

  // Attempt to get the validation result from the Request object.
  const errors = validationResult(req);

  // If there are validation errors...
  if (!errors.isEmpty()) {
    // Use the Array `map()` method to get a list of error messages.
    const errorMessages = errors.array().map(error => error.msg);

    // Return the validation errors to the client.
    return res.status(400).json({ errors: errorMessages });
  }

  // Get the user from the request body.
  const user = req.body;

  console.log(user);
  User.create(user);

  /* Hash the new user's password.
  user.password = bcryptjs.hashSync(user.password); */

  /* Add the user to the `users` array.
  users.push(user); */

  // Set the status to 201 Created and end the response.
  res.status(201).end();

});

// Export
module.exports = router;
