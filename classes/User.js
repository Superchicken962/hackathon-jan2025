const { getUserById, newUser, getUserByUsername } = require("../utils/users");
const { generateRandomCode } = require("../utils/utils");
const bcrypt = require("bcrypt");

class User {
    constructor(username, id) {
        this.username = username;
        this.id = id;

        this.isRegistered = !!id ? getUserById(id) : false;
        this.registerDate = null;

        this.accessToken = null;
    }

    /**
     * Registers a new account.
     *
     * @param { String } password - Password to use. 
     * @returns { Promise<void> }
     */
    async register(password) {
        if (this.isRegistered) {
            throw new Error("User is already registered!");
        }

        const user = await newUser(this.username, password);
        
        this.isRegistered = true;
        for (const [key,val] of Object.entries(user)) {
            this[key] = val;
        }
    }

    generateAccessToken() {
        this.accessToken = generateRandomCode(32);
    }

    async login(password) {
        const account = await getUserByUsername(this.username);

        if (!account) {
            throw new Error("User not found!");
        }

        const pwdMatches = await bcrypt.compare(password, account.password);

        if (!pwdMatches) {
            throw new Error("Incorrect password!");
        }

        // Generate a new access token when logging in.
        this.generateAccessToken();
    }
}

module.exports = User;