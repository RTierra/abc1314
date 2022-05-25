const express = require('express');
const router = express.Router();
const Transaccion = require('../models/Transacciones');

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

router.post('/borr', async (req, res) => {
  const { title } = req.body;
  await Transaccion.findByIdAndDelete(title);
  req.flash('success_msg', 'Transaccion eliminada');
  res.redirect('/')
});

router.get('/', async (req, res) => {
//DATOS generales
  //Transacciones de la base de datos
  const transaccions = await Transaccion.find().lean();
                                                                         //INTEGRAR EL FILTRO EN FIND PARA MEJORAR LA VELOCIDAD
  //Ultimas 5 transaccciones para mostrar
  var ultimas = transaccions.slice(-4);
  
 

//DATOS Banco Pichincha
  //Transacciones de la base de datos
  const pichincha = await (await Transaccion.find({entidad:"Pichincha", date:date})).length;



//DATOS Full-carga
  //Transacciones de la base de datos
  const full_carga = await (await Transaccion.find({entidad:"Full-carga", date:date})).length;
   


  //DATOS Guayaquil
  //Transacciones de la base de datos
  const guayaquil = await (await Transaccion.find({entidad:"Guayaquil", date:date})).length;
   


  res.render('index', { transaccions, ultimas, pichincha, full_carga, guayaquil });
});


module.exports = router;
