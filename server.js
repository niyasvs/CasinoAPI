var express = require("express");
const bodyParser = require('body-parser');

var app = express();

var HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./src/routes'));