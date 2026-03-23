const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
Verbos HTTP
GET - obtener recursos
POST - almacenar/crear recursos
PATCH - modificar una parte de un recurso
PUT - modificar un recurso 
DELETE - borrar un recurso
*/

app.get("/", (req, res, next) => {
    return res.status(200).send("Bienvenido al Pokedex");
});

app.post("/pokemon", (req, res, next) => {
    return res.status(200).send(req.body);
});

app.get('/pokemon', (req, res, next) => {
    return res.status(200).send(pokemon);
});

/*
app.get('/pokemon/:name', (req, res, next) => {

    // condicion ? valor si verdadero : valor si falso

    const name = req.params.name;

    const pk = pokemon.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) ? p : null;
    });

    return (pk.length > 0) ? 
        res.status(200).send(pk) : 
        res.status(404).send("Pokemon no encontrado");
});

app.get('/pokemon/:id', (req, res, next) => {

    const id = req.params.id - 1;

    if (id >= 0 && id <= 150) {
        return res.status(200).send(pokemon[req.params.id - 1]);
    } else {
        return res.status(404).send("Pokemon no encontrado");
    }

});
*/


app.get('/pokemon/:param', (req, res) => {
    const param = req.params.param;

    let pk = [];

    //  Si es número → buscar por ID
    if (!isNaN(param)) {
        pk = pokemon.filter(p => p.id === parseInt(param));
    } 
    //  Si es texto → buscar por nombre
    else {
        pk = pokemon.filter(p => 
            p.name.toUpperCase() === param.toUpperCase()
        );
    }

    return (pk.length > 0)
        ? res.status(200).send(pk)
        : res.status(404).send("Pokemon no encontrado");
});


app.listen(process.env.PORT || 3000, () =>{
    console.log("Server is running...");
});