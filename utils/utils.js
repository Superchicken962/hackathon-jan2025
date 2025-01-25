const fs = require("node:fs");
const path = require("node:path");

const prefilledErrors = {
    400: buildJsonError(400, "Bad Request!", "Ensure that you are providing the required fields!")
};

/**
 * Builds a json error.
 * 
 * @param { Number } code - Error code (provide code only for premade errors).
 * @param { String? } name - Error name.
 * @param { String? } message - Error message/description.
 */
function buildJsonError(code, name, message) {
    if (code && !name || !message) {
        return prefilledErrors[code] || {};
    }

    return {
        error: {
            code,
            name,
            message: message || name
        }
    };
}

/**
 * Creates data folders that do not exist.
 * 
 * @returns { Promise<void> } Promise for completion.
 */
function createAllFolders() {
    const paths = [
        path.join(__dirname, "..//data")
    ];

    return Promise.all(paths.map(async(pth) => {
        if (!fs.existsSync(pth)) {
            await fs.promises.mkdir(pth, {"recursive": true});
        }
    }));
}

/**
 * Creates files that do not exist.
 * 
 * @returns { Promise<void> } Promise for completion.
 */
function createAllFiles() {
    const files = [
        { path: path.join(__dirname, "../data/users.json"), empty: "{}" },
        { path: path.join(__dirname, "../data/access_tokens.json"), empty: "{}" }
    ];

    return Promise.all(files.map(async(file) => {
        if (!fs.existsSync(file.path)) {
            await fs.promises.writeFile(file.path, file.empty, "utf-8");
        }
    }));
}

/**
 * Generates a random code.
 * 
 * @param { Number } length - Length of code.
 * @returns { String } Generated code.
 */
function generateRandomCode(length) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
        const randomChar = Math.floor(Math.random() * chars.length);
        code += chars[randomChar];
    }

    return code;
}

module.exports = {
    buildJsonError,
    createAllFolders,
    createAllFiles,
    generateRandomCode
}