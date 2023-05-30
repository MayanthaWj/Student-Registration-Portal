const express = require('express');
const router = express.Router();
const { createUser, userLogin } = require("../../controllers/userController");
const { getCourses, deleteCourse, createCourse, updateCourse } = require("../../controllers/courseController");
const{ validateToken } = require("../../middleware/jwt");

//create user
router.post( "/createUser", createUser );

//login checking
router.post( "/login", userLogin );

//get all course_details from the database
router.get("/courses", validateToken, getCourses);

//Delete a raw in database
router.delete("/courses/delete/:id", validateToken, deleteCourse);

//create a course in database
router.post("/courses/insert", validateToken, createCourse);

//update a course in database
router.put("/courses/update/:id", validateToken, updateCourse);

module.exports = router;