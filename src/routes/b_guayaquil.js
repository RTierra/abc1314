const express = require('express');
const router = express.Router();

//Models
const Transaccion = require('../models/Transacciones');
const banco = 'Guayaquil';
const entidad = 'Guayaquil';



//Transacciones

router.get('/guayaquil/transacciones_guayaquil', (req, res) => {
    res.render('banco_guayaquil/transacciones_b');
});

router.post('/guayaquil/transacciones_guayaquil', async (req, res) => {
    const { title, cantidad } = req.body;
    const descripcion = "transaccion";

    //Tiempo
    var tiempo = new Date();

    const dia = tiempo.getDate();
    const mes = tiempo.getMonth() + 1;
    const ano = tiempo.getFullYear();

    const minuto = tiempo.getMinutes();
    const hora = tiempo.getHours();

    const date_d = dia;
    const date_ma = mes + "/" + ano;

    const date = dia + '/' + mes + '/' + ano;
    const time = hora + ':' + minuto;

    const errors = [];
    if (title == 'Choose...') {
      errors.push({text: 'Escoge una descripcion.'});
    }
    if (!cantidad) {
      errors.push({text: 'Ingresa una cantidad'});
    }
    if (errors.length > 0) {
      res.render('banco_guayaquil/transacciones_b', {
        errors,
        title,
        cantidad
      });
    } else {
      const newTranscacion = new Transaccion({title, descripcion, cantidad, banco, entidad, date, date_d, date_ma, time});
      await newTranscacion.save();
      req.flash('success_msg', 'Transaccion registrada');
      res.redirect('/');
    }
  });

//Pagos y cobros

router.get('/guayaquil/pagosycobros', (req, res) => {
    res.render('banco_guayaquil/pagosycobros');
});


router.post('/guayaquil/pagosycobros', async (req, res) => {
    const {  descripcion, cantidad } = req.body;
    const title = "Pagos y cobros";
    const errors = [];
    
    //Tiempo
    var tiempo = new Date();

    const dia = tiempo.getDate();
    const mes = tiempo.getMonth() + 1;
    const ano = tiempo.getFullYear();

    const minuto = tiempo.getMinutes();
    const hora = tiempo.getHours();

    const date_d = dia;
    const date_ma = mes + "/" + ano;

    const date = dia + '/' + mes + '/' + ano;
    const time = hora + ':' + minuto;

    if (!descripcion) {
      errors.push({text: 'Ingresa una descripcion.'});
    }
    if (!cantidad) {
      errors.push({text: 'Ingresa tu descripción'});
    }
    if (errors.length > 0) {
      res.render('banco_guayaquil/pagosycobros', {
        errors,
        descripcion,
        cantidad
      });
    } else {
      const newTranscacion = new Transaccion({title, descripcion, cantidad, banco, entidad, date, date_d, date_ma, time});
      await newTranscacion.save();
      req.flash('success_msg', 'Transaccion registrada');
      res.redirect('/');
    }
  });

module.exports = router;