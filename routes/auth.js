const express = require("express");
const app = express.Router();

app.get("/", (req, res) => {
    res.json({"message": "acknowledged"});
});

module.exports = app;