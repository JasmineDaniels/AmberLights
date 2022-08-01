insert into departments (dept_name) values ("${answers.DEPT}");

INSERT INTO roles (title, salary, dept_name, dept_id)
VALUES ("${answers.ROLE1}", ${answers.ROLE2}, "${answers.ROLE3}",${answers.ROLE4});