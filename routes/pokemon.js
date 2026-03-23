const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');


pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
});

pokemon.get('/', async(req, res, next) => {
    const [pkmn] = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);
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

pokemon.get('/:param', async (req, res) => {
    try {
        const param = req.params.param;
        let pkmn = [];

        // Si es número → buscar por ID
        if (!isNaN(param)) {
            pkmn = await db.query(
                "SELECT * FROM pokemon WHERE id = ?", 
                [parseInt(param)]
            );
        } 
        // Si es texto → buscar por nombre
        else {
            pkmn = await db.query(
                "SELECT * FROM pokemon WHERE UPPER(name) = UPPER(?)", 
                [param]
            );
        }

        return (pkmn.length > 0)
            ? res.status(200).json(pkmn)
            : res.status(404).send("Pokemon no encontrado");

    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
});

module.exports = pokemon;