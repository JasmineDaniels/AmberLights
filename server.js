const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table')
//const main_menu = require('./prompts/main-menu')
//const table = cTable.getTable()

const PORT = process.env.PORT || 5001;
const app = express();

//middlewear
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
// static for 

// start server
const db = mysql.createConnection({ //returns a js object 
    host: 'localhost',
    user: 'root',
    password: 'docker',
    database: 'employee_tracker'
});

//Get All Depeartments
db.query('Select * from departments', (err, data) => { // if data JSON.stringify(data) res.json(data)
    err ? console.error(err) : console.table(data)
});

//Get All Roles
db.query('Select * from role', (err, data) => { // if data JSON.stringify(data) res.json(data)
    err ? console.error(err) : console.table(data)
});


// start inquirer menu 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});