const express = require('express');
const router = express.Router();

// Database
const db = require('../db');
const { Course } = db.models;

let course;

// Return a list of courses
router.get('/courses', async (req, res, next) => {
  try {
    course = await Course.findAll({course});
    // console.log(course);
    res.status(200).json({
      course,
    });
  } catch (err) {
    console.error("There's been an error: ", err);
  }
})

// Export
module.exports = router;


// To get just title -=-=- You would have to loop through the courses array that is returned from the findAll and then retrieve the title property.
// There is a handy method called findOne which will just give you one course which is good for your /courses/:id route 