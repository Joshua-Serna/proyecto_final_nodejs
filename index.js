const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

/*
Verbos HTTP
GET
POST
PATCH
PUT
DELETE
*/

app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Bienvenido al Pokedex");
});

app.get('/pokemon/all', (req, res, next) => {
    res.status(200);
    res.send(pokemon);
});

app.get('/pokemon/:name', (req, res, next) => {
    const name = req.params.name;
    for(let i = 0; i < pokemon.length; i++){
        if(pokemon[i].name == name){
            res.status(200);
            return res.send(pokemon[i]);
        }
    }

    res.status(404);
    res.send("Pokemon no encontrado");
})

app.get('/pokemon/:id', (req, res, next) => {

    const id = parseInt(req.params.id);

    if (!isNaN(id) && id >= 1 && id <= 150) {
        res.status(200);
        res.send(pokemon[id - 1]);
    } else {
        res.status(404);
        res.send("Pokemon no encontrado");
    }

});


app.listen(process.env.PORT || 3000, () =>{
    console.log("Server is running...");
});