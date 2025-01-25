const fs = require("node:fs");
const path = require("node:path");
const { v1: uuid } = require("uuid");
const bcrypt = require("bcrypt");

/**
 * User object.
 * 
 * @typedef { Object } UserObject
 * 
 * @property { String } username
 */

/**
 * Reads & parses users.json.
 */
async function readAndParseUsersFile() {
    const content = fs.promises.readFile(path.join(__dirname, "/data/users.json"));
    const users = JSON.parse(content);
    return users;
}

/**
 * Get a user by id.
 * 
 * @param { String } id - User id.
 * @returns { Promise<UserObject|null> } User object or null if user not found.
 */
async function getUserById(id) {
    let users;

    try {
        users = await readAndParseUsersFile();
    } catch (error) {
        console.error("Error parsing users file!");
        return null;
    }

    return users[id] || null;
}

/**
 * Get a user by username.
 * 
 * @param { String } username 
 * @returns { Promise<UserObject|null> } User object or null if user not found.
 */
async function getUserByUsername(username) {
    /** @type { UserObject[] } */
    let users;

    try {
        users = await readAndParseUsersFile();
    } catch (error) {
        console.error("Error parsing users file!");
        return null;
    }

    return Object.values(users).find(user => user.username === username);
}

/**
 * Creates a new user.
 * 
 * @param { String } username
 * @param { String } password
 * @returns { Promise<void> }
 */
function newUser(username, password) {
    return new Promise(async(resolve, reject) => {
        let users;

        try {
            users = await readAndParseUsersFile();
        } catch (error) {
            console.error("Error parsing users file!");
            return reject("Unexpected Server Error");
        }

        const usernameExists = !!(await getUserByUsername(username));

        if (usernameExists) {
            return reject("This username already exists!");
        }

        const hashedPwd = await hashPassword(password);
        const newId = uuid();

        // Add user to json file and save.
        users[newId] = {
            username,
            password: hashedPwd,
            id: newId
        };

        await fs.promises.writeFile(path.join(__dirname, "../data/users.json"), JSON.stringify(users), "utf-8")
            .then(resolve)
            .catch(reject);
    });
}

/**
 * Creates a hashed password.
 * 
 * @param { String } pwd - Plaintext password.
 * @returns { Promise<String> } Hashed password.
 */
function hashPassword(pwd) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) return reject("Error generating salt:", err);

            bcrypt.hash(pwd, salt, (err, hashed) => {
                if (err) return reject("Error hashing password:", err);

                resolve(hashed);
            });
        });
    });
}

module.exports = {
    getUserById,
    getUserByUsername,
    newUser
}