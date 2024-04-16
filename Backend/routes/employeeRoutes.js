const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const Employee = require('../models/Employee');


router.post('/add-emp', employeeController.createEmployee);
router.get('/all-emp', employeeController.getEmployees);
router.get('/employee/:id', employeeController.singleEmployee);
router.get('/update/:id', employeeController.renderUpdateForm);
router.put('/update/:id', employeeController.updateEmployee);
router.delete('/delete/:id', employeeController.deleteEmployee);
// router.get('/employee-details', employeeController.getEmployeeDetails);

module.exports = router;