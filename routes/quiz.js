const express = require("express");
const app = express.Router();

app.get("/get", (req, res) => {
    res.sendStatus(501);
});

app.get("/:id/questions", (req, res) => {
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

app.get("/:id/leaderboard", (req, res) => {
    
});

module.exports = app;