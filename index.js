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
        "Delete a role",
        "Delete an employee",
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

        case "Delete a department":
          deleteDepartment();
          break;

        case "Delete a role":
          deleteRole();
          break;

        case "Delete an employee":
          deleteEmployee();
          break;

        case "Quit":
          db.end();
          break;

        default:
          console.log(choice);
      }
    });
}

// Query to get information regarding the department from the employees database
function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    chooseAction();
  });
}

// Query to get information regarding roles from the employees database
function viewRoles() {
  db.query(`SELECT * FROM roles`, (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    chooseAction();
  });
}

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
}

// helps with giving the user the option to add a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department",
      },
    ])
    .then((res) => {
      db.query(
        `INSERT INTO department (department_name) VALUES (?)`,
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
  db.query(`SELECT * FROM department`, (err, res) => {
    const departments = res.map((dept) => {
      return { name: dept.department_name, value: dept.id };
    });
    inquirer
      .prompt([
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
          type: "list",
          name: "department_id",
          choices: departments,
          message: "What department does the role belong to?",
        },
      ])
      .then((res) => {
        db.query(
          `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
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
  });
};

// will help user add a new employee
const addEmployee = () => {
  db.query(`SELECT * FROM roles`, (err, res) => {
    const roles = res.map((role) => {
      return { name: role.title, value: role.id };
    });
    db.query(`SELECT * FROM employees`, (err, res) => {
      const employees = res.map((employee) => {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id,
        };
      });
      employees.push({ name: "No manager", value: null });
      inquirer
        .prompt([
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
            type: "list",
            name: "role_id",
            choices: roles,
            message: "What is the employees role?",
          },
          {
            type: "list",
            name: "manager_id",
            choices: employees,
            message: "Who is the employee's manager?",
          },
        ])
        .then((res) => {
          db.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
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
    });
  });
};

// will update new role
const updateRole = () => {
  db.query(`SELECT * FROM roles`, (err, res) => {
    const roles = res.map((role) => {
      return { name: role.title, value: role.id };
    });
    db.query(`SELECT * FROM employees`, (err, res) => {
      const employees = res.map((employee) => {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            choices: employees,
            message: "Select employee you would like to update the role for?",
          },
          {
            type: "list",
            name: "role_id",
            choices: roles,
            message: "What is the new role of the employee?",
          },
        ])
        .then((res) => {
          db.query(
            `Update employees SET role_id=? WHERE id=?`,
            [res.role_id, res.id],
            (err, res) => {
              if (err) {
                throw err;
              }
              console.log("Updated Employee");
              chooseAction();
            }
          );
        });
    });
  });
};

// will delete department
const deleteDepartment = () => {
  db.query(`SELECT * FROM department`, (err, res) => {
    const departments = res.map((dept) => {
      return { name: dept.department_name, value: dept.id };
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "id",
          choices: departments,
          message: "What department would you like to delete?",
        },
      ])
      .then((res) => {
        db.query(`DELETE FROM department WHERE id=?`, [res.id], (err, res) => {
          if (err) {
            throw err;
          }
          console.log("Deleted department");
          chooseAction();
        });
      });
  });
};

// this function will delete a role
const deleteRole = () => {
  db.query(`SELECT * FROM roles`, (err, res) => {
    const roles = res.map((role) => {
      return { name: role.title, value: role.id };
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "id",
          choices: roles,
          message: "Select the role you would like to delete?",
        },
      ])
      .then((res) => {
        db.query(`DELETE FROM roles WHERE id=?`, [res.id], (err, res) => {
          if (err) {
            throw err;
          }
          console.log("Deleted role");
          chooseAction();
        });
      });
  });
};

// this function will delete employee
const deleteEmployee = () => {
  db.query(`SELECT * FROM employees`, (err, res) => {
    const employees = res.map((employee) => {
      return {
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "id",
          choices: employees,
          message: "Select employee you would like to delete the role for?",
        },
      ])
      .then((res) => {
        db.query(`DELETE FROM employees WHERE id=?`, [res.id], (err, res) => {
          if (err) {
            throw err;
          }
          console.log("Deleted Employee");
          chooseAction();
        });
      });
  });
};
