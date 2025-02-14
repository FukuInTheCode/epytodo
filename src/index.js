const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
var bcrypt = require('bcryptjs');
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended : false}));
const port = process.env.PORT || 3000;
require("./routes/user/user.js")(app, bcrypt);
require("./routes/auth/auth.js")(app, bcrypt);
require("./routes/todo/todo.js")(app);

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});

