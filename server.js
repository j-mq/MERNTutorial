const express = require("express");
//express server

const app = express();
//initialize app with express

app.get("/", (req, res) => res.send("API Running"));
//Basic GET request

const PORT = process.env.PORT || 5000;
//get enviornment variable called PORT for the port number, if none, goes to default

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//Callback
