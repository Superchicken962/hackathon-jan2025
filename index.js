const express = require("express");
const app = express();

const config = require("./config.json");

const PORT = config?.production ? 80 : 3000;

app.get("*", (req, res) => {
    res.send("hi there");
});

app.listen(PORT, () => {
    console.log(`[Web] Listening on port ${PORT}`);
});