const express = require('express');
const mysql = require('mysql2');
//const main_menu = require('./prompts/main-menu')

const PORT = process.env.PORT || 5001;
const app = express();

//middlewear
app.use(express.urlencoded({ extended: false}))

// start server
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'docker',
    database: 'employee_tracker'
});
  



// start inquirer menu 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});