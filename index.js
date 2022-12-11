// require the dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// will connect to employees database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tencrash907!",
  database: "employees_db",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("You are connected to the employees database");
  chooseAction();
});

// function that will give users options of what they would like to do
function chooseAction() {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "what action would you like to take?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update employee role",
        "Quit",
      ],
    })
    .then(function ({ choice }) {
      switch (choice) {
        case "View all departments":
          viewDepartments();
          break;

        case "View all roles":
          viewRoles();
          break;

        case "View all employees":
          viewEmployees();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Update employee role":
          updateRole();
          break;

        case "Quit":
          db.end();
          break;

        default:
          console.log(choice);
      }
    });
};

// Query to get information regarding the department from the employees database
function viewDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) { throw err; }
        console.table(res);
        chooseAction();
    });
}; 

// Query to get information regarding roles from the employees database
function viewRoles() {
    db.query('SELECT * FROM roles', (err, res) => {
        if (err) { throw err; }
        console.table(res);
        chooseAction();
    });
};

// 


  