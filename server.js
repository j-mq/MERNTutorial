const express = require("express");
//express server
const connectDB = require("./config/db");
//Connect to DB

const app = express();
//initialize app with express

//Connect to DB
connectDB();

app.get("/", (req, res) => res.send("API Running"));
//Basic GET request

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
//Associate the url with the defined in routes/api/

const PORT = process.env.PORT || 5000;
//get enviornment variable called PORT for the port number, if none, goes to default

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//Callback
