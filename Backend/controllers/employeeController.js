const { json } = require('body-parser');
const Employee = require('../models/Employee');



// Fetch Employee Id

const fetchEmployeeById = async (id) => {
    try {
        const employee = await Employee.findById(id);
        return employee;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching employee by ID');
    }
};

// Create Employee Data
const createEmployee = async (req, res) => {
    try {
        const { name, email, mobile, salary, role, dept, location } = req.body;
        const empDetails = new Employee({
            name, email, mobile, salary, role, location, dept
        });
        await empDetails.save();
        res.status(201).json(empDetails);
    } catch (error) {
        console.log("There is an Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all Employees

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error("There is an error", error);
        res.status(500).json({ message: "Server Error" });
    }
};


// Get single Employee by Id

const singleEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee nont found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error("There is an error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update Employee

const renderUpdateForm = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.render('updateEmployeeForm', { employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


const updateEmployee = async (req, res) => {
    try {
        const { name, email, mobile, salary, role, dept, location } = req.body;
        const employee = await Employee.findByIdAndUpdate(req.params.id, {
            name, email, mobile, salary, role, dept, location
        }, {
            new: true
        }
        );
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Employee

const deleteEmployee = async (req, res) => {
    try {
        const deleteEmployee = await Employee.findByIdAndDelete(req.params.id);
        res.status(204).save();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// employeeController.js


const getEmployeeDetails = async (req, res) => {
    try {
        const employees = await Employee.find();
        // res.render('employeeDetails', { employees: employees });
        return employees;
    } catch (error) {
        console.error("There is an error", error);
        // res.status(500).json({ message: "Server Error" });
        throw new Error('Error fetching employee details');
    }
};

const fetchEmployees = async () => {
    try {
        const employee = await Employee.find();
        return employee;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching employees');
    }
};




module.exports = { createEmployee, getEmployees, singleEmployee, updateEmployee, deleteEmployee, getEmployeeDetails, renderUpdateForm, fetchEmployeeById, fetchEmployees };