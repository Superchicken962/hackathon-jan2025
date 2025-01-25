const express = require("express");
const { validateUserAccessToken } = require("../utils/users");
const { buildJsonError } = require("../utils/utils");
const app = express.Router();

app.get("/:id/questions", async (req, res) => {
    const validToken = await validateUserAccessToken(req.cookies.access_token);
    if (!validToken) {
        res.json(buildJsonError(401, "Unauthorised", "Login to access the questions."));
    }

    const sample = {
        questions: [
            "Q1. What's 25 + 72?",
            "Q2. What's 88/11?",
            "Q3. What's 5 x 7?",
            "Q4. What's 35 - 7?"   
        ],
        answers: [
            1,
            2,
            3,
            2
        ],
        options: [
            [
                "97",
                "108",
                "87",
                "52"
            ],
            [
                "7",
                "8",
                "9",
                "6"
            ],
            [
                "30",
                "25",
                "35",
                "32"
            ],
            [
                "32",
                "28",
                "25",
                "22"
            ]
        ]
    };

    res.json(sample);
});

// app.get("/:id/leaderboard", (req, res) => {

// });

// app.post("/:id/update", (req, res) => {

// });

module.exports = app;