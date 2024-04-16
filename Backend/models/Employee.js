const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Employee", employeeSchema); 