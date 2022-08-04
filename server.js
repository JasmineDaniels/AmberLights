const mysql = require('mysql2');
const cTable = require('console.table')
const inquirer = require('inquirer');

//Database Connection
const db = mysql.createConnection({ 
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
            addEmployee()
        }

        if (answers.MAIN == "Update Employee Role"){
            employeePrompts()
        }

        if (answers.MAIN == "Quit"){
            return;
        }
    })
    .catch((error) => {
        console.log(error)
    })

}

const welcomeNote =  () => {
    console.log('\x1b[33m%s\x1b[0m', `Welcome to Employee Tracker`)
    main_menu()
}
welcomeNote()

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
    .catch((error) => console.log(error))
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
        db.query('select employees.first_name, employees.last_name, roles.title from employees inner join roles on employees.role_id = roles.id', (err, data) => { 
            err ? reject(console.error(err)) : resolve(console.table(data))
        });
    })
    .then(() => {
        main_menu()
    })
}

// Add Department =========================================================================================
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'DEPT'
        }
    ])
    .then((answers) => {
        db.query(`insert into departments (dept_name) values ("${answers.DEPT}")`)
    })
    .then(() => {
        console.log('\x1b[33m%s\x1b[0m', `Department Successfully Added`)
    })
    .then(() => getDepartments())
    .catch((error) => console.log(error))
}

// Add Roles ==============================================================================================
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
        console.log('\x1b[33m%s\x1b[0m', `Successfully added Role to the Database`)
        const allRoles = await getRoles()

    } catch (error) {
        console.table(error)
    }
}

// Update Employees =======================================================================================
const getEmployeeNames = () => {
   return db.promise().query(`Select first_name, last_name, id from employees`) // id
}

const getRoleTitle = () => {
    return db.promise().query('Select id, title from roles')
}

const employeePrompts = async () => {
    try { 
        const employeesArr = await getEmployeeNames()
        //destructure nested array
        const [ employees ] = employeesArr
        //create a new array of employees
        //with proper formatting for inquirer list
        const filteredEmp = employees.map((emp) => {
            return {
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id
            }
        })
    
        const [ roles ] = await getRoleTitle()
        const filteredRoles = roles.map((role) => {
            return {
                name: role.title,
                value: role.id
            }
        })
            
        const answers = await inquirer.prompt([
            {
                type: 'checkbox',
                message: 'Which Employee would you like to update?',
                choices: filteredEmp,
                name: 'EMPLOYEE1'
            },
            {
                type: 'checkbox',
                message: `Which role would you like to assign to selected employee?`,
                choices: filteredRoles,
                name: 'EMPLOYEE2'
            },
        ])

        const updatedEmp = await db.promise().query(`update employees set role_id = "${answers.EMPLOYEE2}" where id = "${answers.EMPLOYEE1}"`)
        //show employees
        if (updatedEmp) {
            const newEmpList = await updateAnswers()
            console.log('\x1b[33m%s\x1b[0m', `Successfully Updated Employee`)
            main_menu()
        }
    } 
    catch (error) {
        console.log(error)
    }
}
    
const updateAnswers = () => {
    return new Promise((resolve, reject) => {
        db.query(`select employees.first_name, employees.last_name, roles.title from employees inner join roles on employees.role_id = roles.id`, (err, data) => {
            err ? reject(console.table(err)) : resolve(console.table(data))
        });
    })
}

// Add Employee ===============================================================================================

const getManagers = () => {
    return db.promise().query(`select managers.id as mgr_id, employees.id as role_id, employees.first_name, employees.last_name from employees right outer join managers on employees.role_id = managers.role_id`)
}

const addEmployee = async () => {
    try {
        const rolesArr = await getRoleTitle()
        const [ roles ] = rolesArr
        const filteredRoles = roles.map((role) => {
            return {
                name: role.title,
                value: role.id
            }
        })

        const [ managers ] = await getManagers()
        const filteredManagers = managers.map((mgr) => {
            return {
                name: `${mgr.first_name} ${mgr.last_name}`,
                value: mgr.mgr_id
            }
        })

        const answers = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the employees first name?',
                name: 'EMPLOYEE1'
            },
            {
                type: 'input',
                message: 'What is the employees last name?',
                name: 'EMPLOYEE2'
            },
            {
                type: 'checkbox',
                message: 'What what is the employees role?',
                choices: filteredRoles, 
                name: 'EMPLOYEE3'
            },
            {
                type: 'checkbox',
                message: 'Who is the employees manager?',
                choices: filteredManagers, 
                name: 'EMPLOYEE4'
            }
        ])

        const newEmployee = await db.promise().query(`insert into employees (first_name, last_name, manager_id, role_id) values ("${answers.EMPLOYEE1}", "${answers.EMPLOYEE2}", ${answers.EMPLOYEE4}, ${answers.EMPLOYEE3})`)
        
        // show new employee
        if (newEmployee){
            console.log('\x1b[33m%s\x1b[0m', `Employee successfully added to database`)
            const updatedEmployee = await updateAnswers()
            main_menu()
            
        } 
    } catch (error) {
        console.table(error)
    }
}
    

