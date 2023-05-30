const express = require ('express');
const app = express();
const  cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./config/database");

const routes = require('./routes/api/route');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use( '/', routes );  

const port = process.env.PORT || 3001;
app.listen(port, ()=> console.log( `Listening on port ${port}...` ));
 