const express = require("express");
const app = express.Router();
const fs = require("node:fs");
const { buildJsonError } = require("../utils/utils");
const { getUserByUsername } = require("../utils/users");
const User = require("../classes/User");

app.post("/login", async(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json(buildJsonError(400));
    }

    const account = await getUserByUsername(username);
    if (!account) {
        // return res.json(buildJsonError(404, "User Not Found!", "No account was found that matches this username."));
        return res.json(buildJsonError(401, "Failed To Login!", "Your username or password is incorrect."))
    }

    const user = new User(username, account.id);

    try {
        await user.login(password);
    } catch (error) {
        return res.json(buildJsonError(401, "Failed To Login!", "Your username or password is incorrect."))
    }
    
    res.json({
        "access_token": user.accessToken
    });
});

app.post("/register", async(req, res) => {
    const { username, password, confirm_password } = req.body;

    if (!username || !password || !confirm_password) {
        return res.json(buildJsonError(400));
    }

    if (password !== confirm_password) {
        return res.json(buildJsonError(400, "Invalid Login", "Passwords must match!"))
    }

    const user = new User(username);

    // Handle errors logging in and send a generic error with the caught error as the description.
    try {
        await user.register(password);
    } catch (error) {
        return res.json(buildJsonError(403, "Error Logging In", error));
    }

    res.json({"success": true});
});

module.exports = app;