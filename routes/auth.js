const express = require("express");
const app = express.Router();
const fs = require("node:fs");
const { buildJsonError } = require("../utils/utils");

app.get("/", (req, res) => {
    res.json({"message": "acknowledged"});
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json(buildJsonError(400));
    }


});

module.exports = app;