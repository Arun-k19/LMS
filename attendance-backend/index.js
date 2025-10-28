const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db"); // db.js file

const app = express();
app.use(bodyParser.json());

// Login API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Database error", error: err });
            return;
        }

        if (results.length > 0) {
            res.json({ success: true, message: "Login successful!" });
        } else {
            res.json({ success: false, message: "Invalid username or password" });
        }
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
