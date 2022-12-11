INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 80000, 1),
       ("Salesperson", 75000, 1),
       ("Lead Engineer", 120000, 2),
       ("Software Engineer", 100000, 2),
       ("Account Manager", 95000, 3),
       ("Accountant", 90000, 3),
       ("Legal Team Lead", 150000, 4),
       ("Lawyer", 130000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Betty", "Davis", 1, NULL),
       ("Bob", "Hoskins", 2, 1),
       ("Tom", "Canary", 3, NULL),
       ("Tim", "Can", 4, 3),
       ("Kathy", "Bates", 5, NULL),
       ("Tim", "Curry", 6, 5),
       ("Nicole", "Sanders", 7, NULL),
       ("Brady", "Tan", 8, 7);
