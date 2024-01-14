 Use company_db;

 -- Insert into department --
INSERT INTO department (id, name)
VALUES 
(001, "Finance"),
(002, "Legal"),
(003, "Sales");
-- Insert into role --
INSERT INTO role (id, title, salary, department_id)
VALUES
(1, "Accounts Assistant", 35000, 001),
(2, "Accounts Assistant", 100000, 003),
(3, "Accounts Assistant", 60000, 002);
-- Insert into employee --
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, "Oliver", "Foster", 001, 1),
(2, "Javier", "Rodriguez", 001, 1),
(3, "Fred", "Robertson", 001, 1),
(4, "Mia", "Thompson", 002, 4),
(5, "Emily", "Carter", 002, 4),
(6, "Ethan", "Patel", 002, 4),
(7, "Mia", "Thompson", 003, 7),
(8, "Emily", "Carter", 003, 7),
(9, "Ethan", "Patel", 003, 7);
