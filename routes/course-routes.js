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
    console.log(course);
    res.status(200).json({
      title: course.dataValues.title,
      description: course.dataValues.description,
    });
  } catch (err) {
    console.error("There's been an error: ", err);
  }
})

// Export
module.exports = router;
