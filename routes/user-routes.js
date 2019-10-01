'use strict';

// Require Express
const express = require('express');
// Require Express Router
const router = express.Router();
// Require a Validation Library
const { check, validationResult } = require('express-validator/check');
// Require bcrypt.js - Hashing User Passwords
const bcryptjs = require('bcryptjs');
// Require Basic Auth (A Library to Parse the Authorization Header)
const auth = require('basic-auth');

// Database
const db = require('../db');
const { User } = db.models;

// This array is used to keep track of user records as they are created.
const users = [];

// Middleware - Authenticate User
const authenticateUser = (req, res, next) => {
  let message = null;

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If the user's credentials are available...
  if (credentials) {
    // Attempt to retrieve the user from the data store by their username (i.e. the user's "key" from the Authorization header).
    const user = users.find(u => u.username === credentials.emailAddress);

    // If a user was successfully retrieved from the data store...
    if (user) {
      // Use the bcryptjs npm package to compare the user's password (from the Authorization header) to the user's password that was retrieved from the data store.
      const authenticated = bcryptjs
        .compareSync(credentials.pass, user.password);

      // If the passwords match...
      if (authenticated) {
        console.log(`Authentication successful for username: ${user.username}`);

        // Then store the retrieved user object on the request object so any middleware functions that follow this middleware function will have access to the user's information.
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.username}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = 'Oops, no Auth header was found';
  }

  // If user authentication failed...
  if (message) {
    console.warn(message);
    // Return a response with a 401 Unauthorized HTTP status code.
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
};

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

  // Hash the new user's password.
  user.password = bcryptjs.hashSync(user.password);

  // Add the user to the `users` array.
  users.push(user);

  // Set the status to 201 Created and end the response.
  res.status(201).end();

});

// Export
module.exports = router;
