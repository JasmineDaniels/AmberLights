insert into departments (dept_name)
values  ("Sales"),
        ("Engineering"),
        ("Marketing");


insert into roles (title, salary, dept_id)
values  ("Sales Executive", 130000, 1 ),
        ("Salesperson", 80000, 1 ),
        ("Tech Lead", 180000, 2 ),
        ("Software Engineer", 120000, 2 ),
        ("Project Manager", 140000, 3 ),
        ("Promotions Assistant", 70000, 3 );


insert into managers (first_name, last_name, role_id)
values  ("Sean", "Brown", 1),
        ("Tao", "Jin", 2),
        ("Tanya", "Pratt", 3);

insert into employees (first_name, last_name, manager_id, role_id)
values  ("Sean", "Brown", null, 1),
        ("Mya", "Vasquez", 1, 1),
        ("Tao", "Jin", null, 2),
        ("Ryan", "Hughes", 2, 2),
        ("Tanya", "Pratt", null, 3),
        ("Sabrina", "Dunn", 3, 3);


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
