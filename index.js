// get the client
const mysql = require(`mysql2`);
const inquirer = require(`inquirer`);
const db = require('./connection');

db.connect(err => {
    if (err) throw err;
    console.log('DataBase Connected!');
    // company_db
})





// Define a function named 'employee_tracker'
var employee_tracker = function () {
    // Prompt the user with a list of choices using inquirer
    inquirer.prompt([{
        // Setup for the list prompt
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']

    }])
    .then((answers) => {
         // Handle user's choice after the prompt

        // View all Employees
        if (answers.prompt === 'View All Employees') {
            // Execute a SQL SELECT query on the 'employee' table
            db.query('SELECT * FROM employee', (err, result) => {
                if (err) throw err;
                // Log a message and display the result in a table format
                console.log("Viewing All Employees: ");
                console.table(result);

                // Call the 'employee_tracker' function recursively to allow the user to choose another action
                employee_tracker();
            });
        } else if (answers.prompt === 'Add Employee') {
            // Find Employyees with Roles and Managers
            // Query to retrieve existing employees, roles, and managers for reference during employee addition
            db.query('SELECT * FROM employee, role', (err, result) => {
                if (err) throw err;
                // Prompt the user to input details for the new employee
                inquirer.prompt([
                    {
                        // Adding Employee First Name
                        type: 'input',
                        name: 'firstName',
                        message: 'Enter employee first name',
                        validate: firstNameInput => {
                            // Validate that the user has entered a first name
                            if (firstNameInput) {
                                return true;
                            } else {
                                 // Display an error message if the user didn't enter a first name
                                console.log('Please Add a First Name');
                                return false;
                            }
                        }
                    },
                    {
                        // Adding Employee Last Name
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the employees last name?',
                        validate: lastNameInput => {
                            // Validate that the user has entered a last name
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Please Add a Last Name');
                                return false;
                            }
                        }
                    },
                    {
                        // Adding Employee Role
                         // Prompt for adding Employee Role
                        type: 'list',
                        name: 'role',
                        message: 'What is the employees role?',
                        choices: () => {
                            // Dynamically generate choices for roles based on the result of the previous database query
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            // Remove duplicate roles using Set and convert back to an array
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        // Adding Employee Manager
                         // Prompt for adding Employee Manager
                        type: 'input',
                        name: 'manager',
                        message: 'Who is the employees manager?',
                        validate: managerInput => {
                             // Validate that the user has entered a manager
                            if (managerInput) {
                                return true;
                            } else {
                                 // Display an error message if the user didn't enter a manager
                                console.log('Please Add A Manager!');
                                return false;
                            }
                        }
                    }
                ]).then((answers) => {
                    // comparing the result and storing into variable
                    // Iterate through the result array to find the role that matches the selected role
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                             // Store the matching role object in the 'role' variable
                            var role = result[i];
                        }
                    }
                    // Execute a SQL INSERT INTO query to add the new employee to the 'employee' table
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                        if (err) throw err;
                        // Log a success message after adding the employee to the database
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
                        // Call the 'employee_tracker' function again to allow the user to perform more actions
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'View All Roles') {
            // View All Roles
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Roles");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add Role') {
            // Add a ROLE
            // Begining with the database so that we may acquire the departments for the choice
            db.query('SELECT * FROM department', (err, result) => {
                if (err) throw err;

                // Prompt the user for details to add a new role
                inquirer.prompt([
                    {
                        // Adding a Role
                        type: 'input',
                        name: 'role',
                        message: 'What is the name of the role?',
                        validate: roleInput => {
                             // Validate that the user has entered a role
                            if (roleInput) {
                                return true;
                            } else {
                                 // Display an error message if the user didn't enter a role
                                console.log('Please Add A Role!');
                                return false;
                            }
                        }
                    },
                    {
                        // Adding the Salary
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?',
                        validate: salaryInput => {
                            // Validate that the user has entered a salary
                            if (salaryInput) {
                                return true;
                            } else {
                                // Display an error message if the user didn't enter a salary
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        // Department
                        type: 'list',
                        name: 'department',
                        message: 'Which department does the role belong to?',
                        choices: () => {
                             // Generate choices dynamically based on departments from the result
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].name);
                            }
                            return array;
                        }
                    }
                ]).then((answers) => {
                    // Comparing the result and storing it into the variable
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].name === answers.department) {
                            var department = result[i];
                        }
                    }

                    // Execute a SQL INSERT INTO query to add the new role to the 'role' table
                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database.`)
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'View All Departments') {
            // View All Departments
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments");
                console.table(result);
                 // Call 'employee_tracker' to allow the user to perform more actions
                employee_tracker();
            });
        } else if (answers.prompt === 'Add Department') {
            // Add a Department
            inquirer.prompt([{
                // Adding a Department
                type: 'input',
                name: 'department',
                message: 'What is the name of the dpeartment?',
                validate: departmentInput => {
                     // Validate that the user has entered a department name
                    if (departmentInput) {
                        return true;
                    } else {
                        // Display an error message if the user didn't enter a department name
                        console.log('Please Add A Department!');
                        return false;
                    }
                }
            }]).then((answers) => {
                 // Execute a SQL INSERT INTO query to add the new department to the 'department' table
                db.query('INSERT INTO department (name) Values (?)', [answers.department], (err, result) => {
                    if (err) throw err;
                    // Log a success message after adding the department to the database
                    console.log(`Added ${answers.department} to the database`)
                    // Call 'employee_tracker' to allow the user to perform more actions
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'Quit') {
             // Quit the application
            // End the database connection and display a goodbye message
            db.end();
            console.log("Good-Bye!");
        }
    })
    
}

// Call the function to start the program
employee_tracker();







