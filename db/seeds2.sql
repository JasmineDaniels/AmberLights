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

insert into managers (id, role_id)
values  (1, 1),
        (2, 3),
        (3, 5),
        (0, null);

insert into employees (first_name, last_name, manager_id, role_id)
values  ("Sean", "Brown", null, 1),
        ("Mya", "Vasquez", 1, 2),
        ("Tao", "Jin", null, 3),
        ("Ryan", "Hughes", 2, 4),
        ("Tanya", "Pratt", null, 5),
        ("Sabrina", "Dunn", 3, 6);
