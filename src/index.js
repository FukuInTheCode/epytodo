const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({path: "../.env"});
var bcrypt = require('bcryptjs');
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended : false}));
const port = process.env.PORT;
require("./routes/auth/auth.js")(app, bcrypt);
// require("./routes/user/user.js")(app);
// require("./routes/todos/todos.js")(app);

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});

