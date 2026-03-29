const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');


pokemon.post("/", async(req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
        query += `VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Pokemon insertado correctamente"});
        }

        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.get('/', async(req, res, next) => {
    const [pkmn] = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 1, message: pkmn});
});


pokemon.get('/:param', async (req, res) => {
    const param = req.params.param;

    try {
        //  Si es número → buscar por ID
        if (!isNaN(param)) {
            const id = parseInt(param);

            const [pkmn] = await db.query(
                "SELECT * FROM pokemon WHERE pok_id = ?",
                [id]
            );

            if (pkmn.length === 0) {
                return res.status(404).json({ code: 404, message: "Pokémon no encontrado" });
            }

            return res.status(200).json({code:200, message: pkmn});
        }

        //  Si es texto → buscar por nombre
        const [pkmn] = await db.query(
            "SELECT * FROM pokemon WHERE LOWER(pok_name) = LOWER(?)",
            [param]
        );

        if (pkmn.length === 0) {
            return res.status(404).json({ code: 404, message: "Pokémon no encontrado" });
        }

        return res.status(200).json({code: 200, message: pkmn});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});



module.exports = pokemon;