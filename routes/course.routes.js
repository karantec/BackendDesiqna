const express = require('express');
const { userLogin, createCourse, getCoursesByTopicAndMonth} = require('../controller/courseController');

const router = express.Router();

router.post('/login', userLogin);
router.post('/courses', createCourse);
router.get('/courses', getCoursesByTopicAndMonth);

module.exports = router;
