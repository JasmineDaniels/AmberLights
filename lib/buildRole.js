class Role {
    constructor (id, title, salary, dept_id){
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.dept_id = dept_id;
    }

    getID(){
        return this.id
    }
    getTitle(){
        return this.title
    }
    getSalary(){
        return this.salary
    }
    getDeptID(){
        return this.dept_id
    }
}

module.exports = Role