drop database if exists employee_tracker;
create database employee_tracker;

use employee_tracker;

create table departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(40) NOT NULL
);

create table roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    salary DECIMAL,
    dept_id INT,
    FOREIGN KEY (dept_id)
    REFERENCES departments(id) 
);

create table managers (
    id INT PRIMARY KEY,
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
);

create table employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT, 
    role_id INT, 
    FOREIGN KEY (manager_id)
    REFERENCES managers(id),
    FOREIGN KEY (role_id)
    REFERENCES roles(id) 
);