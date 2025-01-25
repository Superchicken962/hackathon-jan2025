const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("html", require('ejs').renderFile);
app.set("view-engine", "html");

const PORT = 3000;

app.get("*", (req, res) => {
    res.send("hi there");
});

app.listen(PORT, () => {
    console.log(`[Web] Listening on port ${PORT}`);
});