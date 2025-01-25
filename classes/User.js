const { getUserById, newUser } = require("../utils/users");

class User {
    constructor(username, id) {
        this.username = username;
        this.id = id;

        this.isRegistered = !!id ? getUserById(id) : false;
    }

    /**
     * Registers a new account.
     *
     * @param { String } password - Password to use. 
     * @returns { Promise<void> }
     */
    register(password) {
        if (this.isRegistered) {
            throw new Error("User is already registered!");
        }

        return newUser(this.username, password);
    }
}

module.exports = User;