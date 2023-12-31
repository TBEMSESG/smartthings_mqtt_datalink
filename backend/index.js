const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js')

app.use(cors());
app.use(bodyParser.json());

app.use(routes)


app.listen(3000)
console.log("listening on port 3000")