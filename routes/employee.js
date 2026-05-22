const express = require('express');
const employee = express.Router();
const db = require('../config/database');


employee.post("/", async(req, res, next) => {
    const { name, lastname, phone, email, address } = req.body;

    if(name && lastname && phone && email && address){
        let query = "INSERT INTO employees (name, lastname, phone, email, address)";
        query += `VALUES('${name}', '${lastname}', '${phone}', '${email}', '${address}')`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Empleado insertado correctamente"});
        }

        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

employee.delete("/:id", async (req, res, next) => {
    const query = `DELETE FROM employees WHERE id=${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Empleado borrado correctamente"});
    }

    return res.status(404).json({ code: 404, message: "Empleado no encontrado"});
});

employee.put("/:id", async (req, res, next) =>{
    const { name, lastname, phone, email, address } = req.body;

    if(name && lastname && phone && email && address){
        let query = `UPDATE employees SET name = '${name}', lastname = '${lastname}',`;
        query += `phone = '${phone}', email = '${email}', address = '${address}' WHERE id = ${req.params.id};`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
        }

        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});

});

employee.get('/', async(req, res, next) => {

    const rows = await db.query("SELECT * FROM employees");
    return res.status(200).json({code: 1, message: rows});

});

employee.get("/:param", async (req, res) => {
    const param = req.params.param;

    try {
        if (!isNaN(param)) {
            const rows = await db.query("SELECT * FROM employees WHERE id = ?", [param]);

            if (rows.length === 0) {
                return res.status(404).json({ message: "Empleado no encontrado" });
            }

            return res.status(200).json(rows);
        }

        const rows = await db.query(
            "SELECT * FROM employees WHERE LOWER(name) = LOWER(?)",
            [param]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        return res.status(200).json(rows);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


module.exports = employee;