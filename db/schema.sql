DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

-- Creates the table "department" within company_db --
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Hold department name --
  name VARCHAR(30)
);

-- Creates the table "role" --
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Holds role title --
  title VARCHAR(30),
  -- Holds role salary --
  salary DECIMAL,
  -- Holds reference to department role belongs to --
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

-- Creates the table "employee" --
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Holds first name --
  first_name VARCHAR(30) NOT NULL,
  -- Holds last name --
  last_name VARCHAR(30) NOT NULL,
  -- Holds role of employee --
  role_id INT,
  -- Holds reference to another employee that is the manager of the current employee (null if the employee has no manager) --
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
