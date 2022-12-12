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
        "Delete a department",
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

        case "Delete a department" :
          deleteDepartment();
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
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    chooseAction();
  });
};

// Query to get information regarding roles from the employees database
function viewRoles() {
  db.query(`SELECT * FROM roles`, (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    chooseAction();
  });
};

// Query to get information regarding all employees from the employees database
function viewEmployees() {
  db.query(
    `SELECT employees.id, employees.first_name, employees.last_name, roles.title, department_name, roles.salary, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager 
  FROM employees 
  INNER JOIN roles on roles.id = employees.role_id 
  INNER JOIN department on department.id = roles.department_id 
  LEFT JOIN employees e on employees.manager_id = e.id;`,
    (err, res) => {
      if (err) {
        throw err;
      }
      console.table(res);
      chooseAction();
    }
  );
};

// helps with giving the user the option to add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department"
        }
    ])
    .then(res => {
        db.query(`INSERT INTO department (department_name) VALUES (?)`,
        [res.department],
        (err, res) => {
            if (err) {
                throw err;
            }
            console.log("Added department");
            chooseAction();
        }
      );
    });
};

// helps user with inputting the title name, salary and department of the new role
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of the role",
        },
        {
            type: "number",
            name: "salary",
            message: "What is the salary of the role?",
        },
        {
            type: "number",
            name: "department_id",
            message: "What department does the role belong to?"
        }
    ])
    .then(res => {
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
        [res.title, res.salary, res.department_id],
        (err, res) => {
            if (err) {
                throw err;
            }
            console.log("Added role");
            chooseAction();
        }
      );
    });
};

// will help user add a new employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employees last name?",
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the employees role?",
        },
        {
            type: "input",
            name: "manager_id",
            message: "Who is the employee's manager?"
        }
    ])
    .then(res => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [res.first_name, res.last_name, res.role_id, res.manager_id],
        (err, res) => {
            if (err) {
                throw err;
            }
            console.log("Added employee");
            chooseAction();
        }
      );
    });
};

// will update new role
const updateRole = () => {
    inquirer.prompt([
        {
            type: "number",
            name: "id",
            message: "Input employee id",
        },
        {
            type: "number",
            name: "role_id",
            message: "Input new role id"
        }
    ])
    .then(res => {
        db.query(`Update employee SET role_id=?, WHERE id=?)`,
        [res.id, res.role_id],
        (err, res) => {
            if (err) {
                throw err;
            }
            console.log("Updated Employee");
            chooseAction();
        }
       );
    });
};    
