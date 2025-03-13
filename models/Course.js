const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    courseLink: { type: String, required: true },
    courseImage: { type: String, required: true },
    userId: { type: String, required: true }, // Associate with the user
    month: { type: String, required: true }, // Month when the course is relevant (1-12)
    topic: { type: String}, // Topic: 'fullstack', 'offcampus', 'maincourse'
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
