const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/visita', function(req, res){
    
    const datos = req.body;
    console.log('Nueva visita registrada:', datos);
    res.json({mensaje: 'Datos recibidos correctamente'});

});

app.listen(3000, function(){

    console.log('Servidor corriendo en http://localhost:3000');

});