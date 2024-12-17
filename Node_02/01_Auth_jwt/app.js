const express = require("express");
const app = express();

require("dotenv").config();
const users = require("./routes/users");
const connectDb = require("./dbConnection/db");



app.use(express.json());

app.use("/api/users", users);

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
    connectDb();
});
