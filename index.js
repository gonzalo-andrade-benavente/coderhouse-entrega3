const express = require('express');
const app = express();
const { Contenedor } = require('./models/Contenedor');

const PORT = 8080;
const PATH = './data/productos.txt';

app.get('/healtcheck', (req, res) => {
    res.json({
        ok: true,
        msg: 'healtcheck ok!'
    })
})


app.get('/productos', async (req, res) => {
    const contenedor = new Contenedor(PATH);
    const data = await contenedor.readFileContenedor();

    if (data === undefined) {
        res.status(500).json({
            ok: false,
            msg: 'Please contacto with the Admin'
        });
    }

    res.json({
        ok: true,
        total: data.length,
        data
    })
})

app.get('/productoRandom', async (req, res) => {
    const contenedor = new Contenedor(PATH);
    const data = await contenedor.readFileContenedor();

    if (data === undefined) {
        res.status(500).json({
            ok: false,
            msg: 'Please contacto with the Admin'
        });
    }

    res.json({
        ok: true,
        total: data.length,
        data: data[Math.floor(Math.random() * 3)],
    });
});
 
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = server;