-- will drop employee database if it exists
DROP DATABASE IF EXISTS employees_db;
-- will create employee database
CREATE DATABASE employees_db;
-- will use the employee database
USE employee_db;

CREATE TABLE department (
    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
