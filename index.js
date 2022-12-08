// require the dependencies 
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const Department = require('./classes/Department.js');
const Roles = require('./classes/Roles.js');
const Employees = require('./classes/Employees.js');

// will connect to employees database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tencrash907!',
    database: 'employees_db'
});

