class Manager {
    constructor (id, first_name, last_name, role_id){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = id;
    }

    getID(){
        return this.id
    }
    getFirstName(){
        return this.first_name
    }
    getLastName(){
        return this.last_name
    }
    getRoleID(){
        return this.role_id
    }
    getManagerID(){
        return this.manager_id
    }
}

module.exports = Manager