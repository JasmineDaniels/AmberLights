drop database if exists employee_tracker;
create database employee_tracker;

use employee_tracker;

create table department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(40) NOT NULL
);

create table role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    salary DECIMAL,
    FOREIGN KEY (department_id)
    REFERENCES department(id) 
);

create table employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    manager_id INT 
    FOREIGN KEY (manager_id)
    REFERENCES employee_manager(id) 
)