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
    salary: DECIMAL(8,4) NULL,
    department_id: INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

