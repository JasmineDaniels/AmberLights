const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table')
//const queries = require('./prompts/queries')
//const table = cTable.getTable()
const inquirer = require('inquirer');
const { error } = require('console');

const PORT = process.env.PORT || 5001;
const app = express();

//middlewear
// app.use(express.urlencoded({ extended: false}))
// app.use(express.json())
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
            getDepartments()
        }

        if (answers.MAIN == "View All Roles"){
            getRoles()
        }

        if (answers.MAIN == "View All Employees"){
            getEmployees()
        }

        if (answers.MAIN == "Add Department"){
            addDepartment()
        }

        if (answers.MAIN == "Add Role"){
            addRole()
        }

        if (answers.MAIN == "Add Employee"){
            
        }

        if (answers.MAIN == "Update Employee Role"){
            employeePrompts()
            
        }

        if (answers.MAIN == "Quit"){
            return;
        }
    })
    .catch(() => {

    })

}
main_menu()

const getDepartments = () => {
    return new Promise((resolve, reject) => {
        db.query('Select * from departments', (err, data) => {  
            err ? reject(console.error(err)) : resolve(data)
        })
    })
    .then((data) => {
        console.table(data)
    })
    .then(() => { 
        main_menu()
    })
}

const addDepartment = () => {
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
    .then(() => getDepartments())
    .then(() => {
        console.table(`Department Successfully Added`)
    })
}

const getRoles = () => {
    return new Promise((resolve, reject) => {
        db.query('select departments.id, departments.dept_name, roles.title, roles.salary from departments inner join roles on  departments.id = roles.dept_id;', (err, data) => { 
            err ? reject(console.error(err)) : resolve(console.table(data))
        });
    })
    .then(() => {
        main_menu()
    })
}

const getEmployees = () => {
    return new Promise((resolve, reject) => {
        db.query('Select * from employees', (err, data) => { 
            err ? reject(console.error(err)) : resolve(console.table(data))
        });
    })
    .then(() => {
        main_menu()
    })
}

// Add Roles ==================================================================
const deptList = () => {
    return db.promise().query(`select * from departments`)
}

const addRole = async () => {
    try {
        const [depts] = await deptList()
        
        const filteredDepts = depts.map((dp) => {
            return {
                name: dp.dept_name,
                value: dp.id
            }
        })

        const answers = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the name of the role?',
                    name: 'ROLE1'
                },
                {
                    type: 'input',
                    message: 'What is the salary of the role?',
                    name: 'ROLE2',
                    validate(value){
                        if (isNaN(value)){
                            return (`You must enter a number`)
                        } return true
                    }
                },
                {
                    type: 'list',
                    message: 'What is the name of the department?',
                    choices: filteredDepts,
                    name: 'ROLE3'
                },
                
            ])

        const newRole = await db.promise().query(`insert into roles (title, salary, dept_id) values ('${answers.ROLE1}', ${answers.ROLE2}, ${answers.ROLE3})`)

        main_menu()

    } catch (error) {
        console.log(error)
    }
}

// Update Employees ========================================================

const getEmployeeNames = () => {
   return db.promise().query(`Select first_name, last_name from employees`)
}

const getAllRoles = () => {
    return new Promise((resolve, reject) => {
        db.query('Select * from roles', (err, data) => { 
            err ? reject(console.error(err)) : resolve(data)
        });
    })
    
}

const employeePrompts = async () => {
    try {
        const employeesArr = await getEmployeeNames()
        const { ...allEmployees } = employeesArr
    
        const rolesArr = await getRoles()
        const { ...allRoles } = rolesArr
            
        //const updateEmployee = getAnswers(allEmployees, allRoles)
        if (allEmployees && allRoles){
            inquirer.prompt([
                {
                    type: 'checkbox',
                    message: 'Which Employee would you like to update?',
                    choices: allEmployees,
                    name: 'EMPLOYEE1'
                },
                {
                    type: 'checkbox',
                    message: `Which role would you like to assign to selected employee?`,
                    choices: allRoles,
                    name: 'EMPLOYEE2'
                },
            ])
            .then((answers) => {
                const selectedEmp = db.query(`select * from employees where first_name, last_name = "${answers.EMPLOYEE1}"`, (err, data) => {
                    err ? reject(console.table(err)) : resolve(data)
                });
            
                updateAnswers(answers, selectedEmp)
            })
        }
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const updateAnswers = (answers, selectedEmp) => {
        return new Promise((resolve, reject) => {
            db.query(`update employees set role = "${answers.EMPLOYEE2}" where first_name, last_name = ?`, selectedEmp, (err, data) => {
                err ? reject(console.table(err)) : resolve(console.table(data))
            });
        })
    }

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});