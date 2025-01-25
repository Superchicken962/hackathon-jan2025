const express = require("express");
const app = express();
const config = require("./config.json");
const PORT = config?.production ? 80 : 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/test", (req, res) => {
    res.json({ "message": "acknowledged" });
});

app.listen(PORT, () => {
    console.log(`[Web] Listening on port ${PORT}`);
});