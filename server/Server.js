//Définition des modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Connection à la Base de donnée
mongoose
    .connect("mongodb://localhost/db")
    .then(() => {
        console.log("Connected to MongoDB");
        
    })
    .catch((e) => {
        console.log("Error while DB connecting");
        console.log(e);
    });

   

//On définit notre objet express nommé app
const app = express();

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Définition des CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//On définit la route Hello
app.get('/hello', (req, res) => {
    res.json('Hello world !')
});

//Définition du routeur
const router = express.Router();
app.use("/user", router);
require(__dirname + "/controllers/UserController")(router);

//Définition et mise en place du port d'écoute
const port = 8800;
app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`);
});