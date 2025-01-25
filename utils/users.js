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
 * @property { String } password - Password (hashed).
 * @property { String } id
 * @property { Number } registerDate - Timestamp of register.
 */

/**
 * Reads & parses users.json.
 */
async function readAndParseFile(fileName) {
    const content = await fs.promises.readFile(path.join(__dirname, `../data/${fileName}.json`));
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
        users = await readAndParseFile("users");
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
        users = await readAndParseFile("users");
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
 * @returns { Promise<UserObject> }
 */
function newUser(username, password) {
    return new Promise(async(resolve, reject) => {
        let users;

        try {
            users = await readAndParseFile("users");
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

        const userObj = {
            username,
            password: hashedPwd,
            id: newId,
            registerDate: Date.now()
        };

        // Add user to json file and save.
        users[newId] = userObj;

        await fs.promises.writeFile(path.join(__dirname, "../data/users.json"), JSON.stringify(users), "utf-8")
            .then(() => resolve(userObj))
            .catch((error) => {
                console.error("Error saving users file:", error);
                reject("Unexpected Server Error");
            });
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

/**
 * Reads access token from files.
 * 
 * @param { String } userId - user to get token for.
 */
async function getAccessToken(userId) {
    const tokens = await readAndParseFile("access_tokens");
}

/**
 * Stores access token for user.
 * 
 * @param { String } userId - User to store token for.
 * @param { String } token - Token to store.
 */
async function saveAccessToken(userId, token) {
    const tokens = await readAndParseFile("access_tokens");
    tokens[userId] = token;
    return fs.promises.writeFile(path.join(__dirname, "../data/access_tokens.json"), JSON.stringify(tokens), "utf-8");
}

/**
 * Gets user info given an access token.
 * 
 * @param { String } token
 * @returns { Promise<UserObject | null> }
 */
async function getUserByAccessToken(token) {
    const tokens = await readAndParseFile("access_tokens");
    const reversed = {};

    for (const [key, val] of Object.entries(tokens)) {
        reversed[val] = key;
    }

    const userId = reversed[token];
    let userInfo;

    if (!userId) return null;

    if (userId) {
        userInfo = await getUserById(userId);
    }

    return userInfo;
}

module.exports = {
    getUserById,
    getUserByUsername,
    newUser,
    getAccessToken,
    saveAccessToken,
    getUserByAccessToken
}