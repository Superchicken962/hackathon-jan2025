const express = require("express");
const app = express();
const config = require("./config.json");
const PORT = config?.production ? 80 : 3000;
const bodyParser = require("body-parser");
const { buildJsonError, createAllFolders, createAllFiles } = require("./utils/utils");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/test", (req, res) => {
    res.json({ "message": "acknowledged" });
});

app.use("/auth", require("./routes/auth"));

// Handle error 404s.
app.use("*", (req, res) => {
    res.json(buildJsonError(404, "Endpoint not found!"));
});

// Ensure necessary folders have been made before starting api server.
(async() => {
    await createAllFolders();
    await createAllFiles();

    app.listen(PORT, () => {
        console.log(`[Web] Listening on port ${PORT}`);
    });
})();