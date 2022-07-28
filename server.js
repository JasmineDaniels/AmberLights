const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table')
//const queries = require('./prompts/queries')
//const table = cTable.getTable()
const inquirer = require('inquirer')

const PORT = process.env.PORT || 5001;
const app = express();

//middlewear
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
// static for main menu.js file ?

// start server
const db = mysql.createConnection({ //returns a js object 
    host: 'localhost',
    user: 'root',
    password: 'docker',
    database: 'employee_tracker'
});

const main_menu = () => {
    inquirer.prompt([
        {
            type: 'checkbox',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit'],
            name: 'MAIN',
        },
    ])
    .then((answers) => {


        if (answers.MAIN == "View All Departments"){
            // db.query('Select * from departments', (err, data) => { // if data JSON.stringify(data) res.json(data)
            //     err ? console.error(err) : console.table(data)
            // })
            getDepartments()
        }

        if (answers.MAIN == "View All Roles"){
            db.query('Select * from roles', (err, data) => { // if data JSON.stringify(data) res.json(data)
                err ? console.error(err) : console.table(data)
            });
        }

        if (answers.MAIN == "View All Employees"){
            db.query('Select * from employees', (err, data) => { // if data JSON.stringify(data) res.json(data)
                err ? console.error(err) : console.table(data)
            });
        }

        if (answers.MAIN == "Add Department"){
            departmentPrompts()
        }
    })
    .catch(() => {

    })

}
main_menu()

const getDepartments = () => {
    return new Promise((resolve, reject) => {
        db.query('Select * from departments', (err, data) => { // if data JSON.stringify(data) res.json(data)
            err ? reject(console.error(err)) : resolve(data)
        })
    })
    .then((data) => {
        console.table(data)
    })
    .then(() => { //too fast
        main_menu()
    })
}

const departmentPrompts = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'DEPT'
        }
    ])
    .then((answers) => {
        db.query(`insert into departments (dept_name) values ("${answers.DEPT}")`, (err, data) => { // values 
            err ? console.error(err) : console.table(data)
        });
    })
    .then(() => {
        console.table(`Department Successfully Added`)
    })
}


// start inquirer menu 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});