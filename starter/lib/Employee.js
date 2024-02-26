// TODO: Write code to define and export the Employee class
class Employee {
      // Save a reference for `this` in `this` as `this` will change inside of inquirer
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    // Methods
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return 'Employee';
    }
}

module.exports = Employee;