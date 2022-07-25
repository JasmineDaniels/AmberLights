class Department {
    constructor (id, name){
        this.id = id;
        this.name = name;
    }

    getID(){
        return this.id
    }
    getName(){
        return this.name
    }
}

module.exports = Department