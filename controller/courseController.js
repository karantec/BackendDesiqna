const Course = require('../models/Course');

// Login controller
const userLogin = async (req, res) => {
    const { username, password, month } = req.body; // Include month in login payload

    // Validate credentials
    if (username !== 'Student@75' || password !== '75student@desiqna.in') {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Simulate a userId for this example
    const userId = 'user12345'; // Replace with real user authentication logic

    // Send the month along with the userId in the response
    res.status(200).json({ message: 'Login successful', userId, month });
};

// Create course
const createCourse = async (req, res) => {
    try {
        const { courseName, courseLink, courseImage, userId, month, topic } = req.body;

        // Validate required fields
        if (!userId || !month || !courseName || !courseLink || !courseImage) {
            return res.status(400).json({ message: 'userId, month, courseName, courseLink, and courseImage are required' });
        }

        // Create a new course
        const newCourse = new Course({
            courseName,
            courseLink,
            courseImage,
            userId,
            month,
            topic: topic || null // Ensure topic is optional
        });

        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create course', error });
    }
};


// Get courses for a user by month
const getCoursesByTopicAndMonth = async (req, res) => {
    try {
        const { topic, month } = req.query;

        // Validate required query parameters
        if (!topic) {
            return res.status(400).json({ message: 'Topic is required' });
        }

        // Create a filter object dynamically
        let filter = { topic };

        // If month is provided, add it to the filter
        if (month) {
            filter.month = month;
        }

        // Fetch courses based on topic and optional month
        const courses = await Course.find(filter);
        
        res.status(200).json({ message: 'Courses fetched successfully', courses });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch courses', error });
    }
};

module.exports = {
    userLogin,
    createCourse,
    getCoursesByTopicAndMonth
};
