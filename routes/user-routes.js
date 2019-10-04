// Require Express
const express = require('express');
// Require Express Router
const router = express.Router();
// Require a Validation Library
const { validationResult } = require('express-validator');

// Database
const db = require('../db');
const { User } = db.models;

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

// Validation Middleware 
const checkUser = require('../middleware/checkUser');

// Create a user
router.post('/users', checkUser, (req, res) => {

  // Attempt to get the validation result from the Request object.
  const errors = validationResult(req);

  // If there are validation errors...
  if (!errors.isEmpty()) {
    // Use the Array `map()` method to get a list of error messages.
    const errorMessages = errors.array().map(error => error.msg);

    // Return the validation errors to the client.
    return res.status(400).json({ errors: errorMessages });
  }

  const user = req.body;
  console.log(user);
  User.create(user);
  res.status(201).end();

});

// Export
module.exports = router;
