-- will drop employee database if it exists
DROP DATABASE IF EXISTS employees_db;
-- will create employee database
CREATE DATABASE employees_db;
-- will use the employee database
USE employees_db;

CREATE TABLE department (
    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name: VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title: VARCHAR(30) NOT NULL,
    salary: DECIMAL(8,2) NULL,
    department_id: INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE employees (
    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    role_id: INT NOT NULL,
    manager_id: INT NULL,
    FOREIGN KEY (roles_id)
    REFERENCES roles(id)
    ON DELETE RESTRICT ON UPDATE CASCADE, 
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL ON UPDATE CASCASE
);