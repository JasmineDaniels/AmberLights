insert into departments (dept_name)
values  ("Sales"),
        ("Engineering"),
        ("Marketing");


insert into roles (title, salary, dept_name, dept_id)
values  ("Sales Executive", 130000, "Sales", 1 ),
        ("Salesperson", 80000, "Sales", 1 ),
        ("Tech Lead", 180000, "Engineering", 2 ),
        ("Software Engineer", 120000, "Engineering", 2 ),
        ("Project Manager", 140000, "Marketing", 3 ),
        ("Promotions Assistant", 70000, "Marketing", 3 );


insert into managers (first_name, last_name, role, role_id)
values  ("Sean", "Brown", "Sales Executive", 1),
        ("Tao", "Jin", "Tech Lead", 2),
        ("Tanya", "Pratt", "Project Manager", 3);

insert into employees (first_name, last_name, role, manager, manager_id, role_id)
values  ("Sean", "Brown", "Sales Executive", null, null, 1),
        ("Mya", "Vasquez", "Salesperson", "Sean Brown", 1, 1),
        ("Tao", "Jin", "Tech Lead", null, null, 2),
        ("Ryan", "Hughes", "Software Engineer", "Tao Jin", 2, 2),
        ("Tanya", "Pratt", "Project Manager", null, null, 3),
        ("Sabrina", "Dunn", "Promotions Assistant", "Tanya Pratt", 3, 3);


-- insert into managers (first_name, last_name, role)
-- values  ("Sean", "Brown", "Sales Executive"),
--         ("Tao", "Jin", "Tech Lead"),
--         ("Tanya", "Pratt", "Project Manager"),

-- insert into employees (first_name, last_name, role)
-- values  ("Sean", "Brown", "Sales Executive"),
--         ("Mya", "Vasquez", "Salesperson"),
--         ("Tao", "Jin", "Tech Lead"),
--         ("Ryan", "Hughes", "Software Engineer"),
--         ("Tanya", "Pratt", "Project Manager"),
--         ("Sabrina", "Dunn", "Promotions Assistant"),
