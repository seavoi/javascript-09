const express = require('express');
const router = express.Router();

// Database
const db = require('../db');
const { Course } = db.models;

let courses;

// Return a list of courses
router.get('/courses', async (req, res, next) => {
  try {
    courses = await Course.findAll({courses});
    console.log(courses);
    res.status(200).json({
      title: courses.title,
      description: courses.description,
    });
  } catch (err) {
    console.error("There's been an error: ", err);
  }
})

// Export
module.exports = router;
