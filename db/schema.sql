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
    department INT,
    FOREIGN KEY (department)
    REFERENCES departments(id) 
);

create table managers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    role INT,
    FOREIGN KEY (role)
    REFERENCES roles(id)
);

create table employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager INT, 
    role INT, 
    FOREIGN KEY (manager)
    REFERENCES managers(id),
    FOREIGN KEY (role)
    REFERENCES roles(id) 
);