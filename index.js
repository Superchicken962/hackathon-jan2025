const express = require("express");
const app = express();
const config = require("./config.json");
const PORT = config?.production ? 80 : 3000;
const bodyParser = require("body-parser");
const { buildJsonError, createAllFolders, createAllFiles } = require("./utils/utils");
const { getUserByAccessToken } = require("./utils/users");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser("dwqjxgauhdjmgfnjhgyyzqk@!*("));

app.get("/test", (req, res) => {
    res.json({ "message": "acknowledged" });
});

app.use("/auth", require("./routes/auth"));
app.use("/quiz", require("./routes/quiz"));

app.get("/whoami", async(req, res) => {
    const token = req.cookies.access_token;
    
    if (!token) {
        return res.json(buildJsonError(403, "Not Logged In", "Please login to access information."));
    }

    const user = await getUserByAccessToken(token);

    if (!user) {
        return res.json(buildJsonError(403, "Invalid Token"));
    }

    res.json(user);
});

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