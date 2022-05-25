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

//Inicio
router.get('/reportes', (req, res) => {
    res.render('reportes/reportes');
});

//Logica deprogramacion; Retiro=aumenta Deposito=disminuye

//Reportes todos
  //Por dia    
router.get('/reportes/todos', async (req, res) => {

    //Transacciones de la base de datos
    const transaccions = await Transaccion.find({date:date}).lean();
    
    //Transacciones de reduccion de capital en la plataforma (Deposito)
    const  dism = transaccions => transaccions.title !== 'Retiro'
    var disminuye = transaccions.filter(dism);
  
    //Transacciones de aumento de capital  en la plataforma (Retiro)
    const  aume = transaccions => transaccions.title == 'Retiro'
    var aumenta = transaccions.filter(aume);
  
    //Suma total de reduccion
    var acumdism = 0;
    for (var i=0; i<disminuye.length; i++){
      acumdism = acumdism + disminuye[i].cantidad;
    };
    
    //Suma total de aumento
    var acumaume = 0;
    for (var i=0; i<aumenta.length; i++){
      acumaume = acumaume + aumenta[i].cantidad
    };
  
    //Suma total de cantidades en la base de datos
    var acum = acumaume - acumdism;
    
    res.render('reportes/movimientos', { transaccions, acum, acumdism, acumaume});
});

  //Por mes
router.get('/reportes/todos/mes', async (req, res) => {

    //Transacciones de la base de datos
    const transaccions = await Transaccion.find({date_ma:date_ma}).lean();

    //Transacciones de reduccion de capital en la plataforma (Deposito)
    const  dism = transaccions => transaccions.title !== 'Retiro'
    var disminuye = transaccions.filter(dism);
  
    //Transacciones de aumento de capital  en la plataforma (Retiro)
    const  aume = transaccions => transaccions.title == 'Retiro'
    var aumenta = transaccions.filter(aume);
  
    //Suma total de reduccion
    var acumdism = 0;
    for (var i=0; i<disminuye.length; i++){
      acumdism = acumdism + disminuye[i].cantidad;
    };
  
    //Suma total de aumento
    var acumaume = 0;
    for (var i=0; i<aumenta.length; i++){
      acumaume = acumaume + aumenta[i].cantidad
    };
  
    //Suma total de cantidades en la base de datos
    var acum = acumaume - acumdism;
    
    res.render('reportes/movimientos', { transaccions, acum, acumdism, acumaume});
});


  //Por busqueda
router.post('/reportes/todos', async (req, res) => {
    const { title } = req.body;
  
    //Transacciones de la base de datos
    const transaccions = await Transaccion.find({date:title}).lean();
  
    //Transacciones de reduccion de capital en la plataforma (Deposito)
    const  dism = transaccions => transaccions.title !== 'Retiro'
    var disminuye = transaccions.filter(dism);
  
    //Transacciones de aumento de capital  en la plataforma (Retiro)
    const  aume = transaccions => transaccions.title == 'Retiro'
    var aumenta = transaccions.filter(aume);
  
    //Suma total de reduccion
    var acumdism = 0;
    for (var i=0; i<disminuye.length; i++){
      acumdism = acumdism + disminuye[i].cantidad;
    };
  
    //Suma total de aumento
    var acumaume = 0;
    for (var i=0; i<aumenta.length; i++){
      acumaume = acumaume + aumenta[i].cantidad
    };
  
    //Suma total de cantidades en la base de datos
    var acum = acumaume - acumdism;
    
    res.render('reportes/movimientos', { transaccions, acum, acumdism, acumaume});
  });





//Reportes Bco. Pichincha
  //Por dia
router.get('/reportes/BcoPichincha', async (req, res) => {
  //Transacciones de la base de datos
  const transaccions = await Transaccion.find({entidad:"Pichincha", date:date}).lean();
  
  //Transacciones de reduccion de capital en la plataforma (Deposito)
  const  dism = transaccions => transaccions.title !== 'Retiro'
  var disminuye = transaccions.filter(dism);

  //Transacciones de aumento de capital  en la plataforma (Retiro)
  const  aume = transaccions => transaccions.title == 'Retiro'
  var aumenta = transaccions.filter(aume);

  //Suma total de reduccion
  var acumdism = 0;
  for (var i=0; i<disminuye.length; i++){
    acumdism = acumdism + disminuye[i].cantidad;
  };

  //Suma total de aumento
  var acumaume = 0;
  for (var i=0; i<aumenta.length; i++){
    acumaume = acumaume + aumenta[i].cantidad
  };

  //Suma total de cantidades en la base de datos
  var acum = acumaume - acumdism;
  
  res.render('reportes/BcoPichincha', { transaccions, acum, acumdism, acumaume});
});

  //Por mes
router.get('/reportes/BcoPichincha/mes', async (req, res) => {
    //Transacciones de la base de datos
    const transaccions = await Transaccion.find({entidad:"Pichincha", date_ma:date_ma}).lean();
    
    //Transacciones de reduccion de capital en la plataforma (Deposito)
    const  dism = transaccions => transaccions.title !== 'Retiro'
    var disminuye = transaccions.filter(dism);
  
    //Transacciones de aumento de capital  en la plataforma (Retiro)
    const  aume = transaccions => transaccions.title == 'Retiro'
    var aumenta = transaccions.filter(aume);
  
    //Suma total de reduccion
    var acumdism = 0;
    for (var i=0; i<disminuye.length; i++){
      acumdism = acumdism + disminuye[i].cantidad;
    };
  
    //Suma total de aumento
    var acumaume = 0;
    for (var i=0; i<aumenta.length; i++){
      acumaume = acumaume + aumenta[i].cantidad
    };
  
    //Suma total de cantidades en la base de datos
    var acum = acumaume - acumdism;
    
    res.render('reportes/BcoPichincha', { transaccions, acum, acumdism, acumaume});
  });
  
  //Por busqueda
router.post('/reportes/BcoPichincha', async (req, res) => {
    const { title } = req.body;
  
    //Transacciones de la base de datos
    const transaccions = await Transaccion.find({entidad:"Pichincha", date:title}).lean();
  
    //Transacciones de reduccion de capital en la plataforma (Deposito)
    const  dism = transaccions => transaccions.title !== 'Retiro'
    var disminuye = transaccions.filter(dism);
  
    //Transacciones de aumento de capital  en la plataforma (Retiro)
    const  aume = transaccions => transaccions.title == 'Retiro'
    var aumenta = transaccions.filter(aume);
  
    //Suma total de reduccion
    var acumdism = 0;
    for (var i=0; i<disminuye.length; i++){
      acumdism = acumdism + disminuye[i].cantidad;
    };
  
    //Suma total de aumento
    var acumaume = 0;
    for (var i=0; i<aumenta.length; i++){
      acumaume = acumaume + aumenta[i].cantidad
    };
  
    //Suma total de cantidades en la base de datos
    var acum = acumaume - acumdism;
    
    res.render('reportes/BcoPichincha', { transaccions, acum, acumdism, acumaume});
  });





//Reportes Full-carga
  //Por dia
router.get('/reportes/Full-carga', async (req, res) => {
    //Transacciones de la base de datos
    const transaccions = await Transaccion.find({entidad:"Full-carga", date:date}).lean();
    
    //Transacciones de reduccion de capital en la plataforma (Deposito)
    const  dism = transaccions => transaccions.title !== 'Retiro'
    var disminuye = transaccions.filter(dism);
  
    //Transacciones de aumento de capital  en la plataforma (Retiro)
    const  aume = transaccions => transaccions.title == 'Retiro'
    var aumenta = transaccions.filter(aume);
  
    //Suma total de reduccion
    var acumdism = 0;
    for (var i=0; i<disminuye.length; i++){
      acumdism = acumdism + disminuye[i].cantidad;
    };
  
    //Suma total de aumento
    var acumaume = 0;
    for (var i=0; i<aumenta.length; i++){
      acumaume = acumaume + aumenta[i].cantidad
    };
  
    //Suma total de cantidades en la base de datos
    var acum = acumaume - acumdism;
    
    res.render('reportes/Full-carga', { transaccions, acum, acumdism, acumaume});
});

  //Por mes
router.get('/reportes/Full-carga/mes', async (req, res) => {
    //Transacciones de la base de datos
    const transaccions = await Transaccion.find({entidad:"Full-carga", date_ma:date_ma}).lean();
    
    //Transacciones de reduccion de capital en la plataforma (Deposito)
    const  dism = transaccions => transaccions.title !== 'Retiro'
    var disminuye = transaccions.filter(dism);
  
    //Transacciones de aumento de capital  en la plataforma (Retiro)
    const  aume = transaccions => transaccions.title == 'Retiro'
    var aumenta = transaccions.filter(aume);
  
    //Suma total de reduccion
    var acumdism = 0;
    for (var i=0; i<disminuye.length; i++){
      acumdism = acumdism + disminuye[i].cantidad;
    };
  
    //Suma total de aumento
    var acumaume = 0;
    for (var i=0; i<aumenta.length; i++){
      acumaume = acumaume + aumenta[i].cantidad
    };
  
    //Suma total de cantidades en la base de datos
    var acum = acumaume - acumdism;
    
    res.render('reportes/Full-carga', { transaccions, acum, acumdism, acumaume});
});

    //Por busqueda
  router.post('/reportes/Full-carga', async (req, res) => {
    const { title } = req.body;
  
    //Transacciones de la base de datos
    const transaccions = await Transaccion.find({entidad:"Full_carga", date:title}).lean();
  
    //Transacciones de reduccion de capital en la plataforma (Deposito)
    const  dism = transaccions => transaccions.title !== 'Retiro'
    var disminuye = transaccions.filter(dism);
  
    //Transacciones de aumento de capital  en la plataforma (Retiro)
    const  aume = transaccions => transaccions.title == 'Retiro'
    var aumenta = transaccions.filter(aume);
  
    //Suma total de reduccion
    var acumdism = 0;
    for (var i=0; i<disminuye.length; i++){
      acumdism = acumdism + disminuye[i].cantidad;
    };
  
    //Suma total de aumento
    var acumaume = 0;
    for (var i=0; i<aumenta.length; i++){
      acumaume = acumaume + aumenta[i].cantidad
    };
  
    //Suma total de cantidades en la base de datos
    var acum = acumaume - acumdism;
    
    res.render('reportes/Full-carga', { transaccions, acum, acumdism, acumaume});
  });


  //Reportes Guayaquil
  //Por dia
router.get('/reportes/guayaquil', async (req, res) => {
  //Transacciones de la base de datos
  const transaccions = await Transaccion.find({entidad:"Guayaquil", date:date}).lean();
  
  //Transacciones de reduccion de capital en la plataforma (Deposito)
  const  dism = transaccions => transaccions.title !== 'Retiro'
  var disminuye = transaccions.filter(dism);

  //Transacciones de aumento de capital  en la plataforma (Retiro)
  const  aume = transaccions => transaccions.title == 'Retiro'
  var aumenta = transaccions.filter(aume);

  //Suma total de reduccion
  var acumdism = 0;
  for (var i=0; i<disminuye.length; i++){
    acumdism = acumdism + disminuye[i].cantidad;
  };

  //Suma total de aumento
  var acumaume = 0;
  for (var i=0; i<aumenta.length; i++){
    acumaume = acumaume + aumenta[i].cantidad
  };

  //Suma total de cantidades en la base de datos
  var acum = acumaume - acumdism;
  
  res.render('reportes/Guayaquil', { transaccions, acum, acumdism, acumaume});
});

//Por mes
router.get('/reportes/Guayaquil/mes', async (req, res) => {
  //Transacciones de la base de datos
  const transaccions = await Transaccion.find({entidad:"Guayaquil", date_ma:date_ma}).lean();
  
  //Transacciones de reduccion de capital en la plataforma (Deposito)
  const  dism = transaccions => transaccions.title !== 'Retiro'
  var disminuye = transaccions.filter(dism);

  //Transacciones de aumento de capital  en la plataforma (Retiro)
  const  aume = transaccions => transaccions.title == 'Retiro'
  var aumenta = transaccions.filter(aume);

  //Suma total de reduccion
  var acumdism = 0;
  for (var i=0; i<disminuye.length; i++){
    acumdism = acumdism + disminuye[i].cantidad;
  };

  //Suma total de aumento
  var acumaume = 0;
  for (var i=0; i<aumenta.length; i++){
    acumaume = acumaume + aumenta[i].cantidad
  };

  //Suma total de cantidades en la base de datos
  var acum = acumaume - acumdism;
  
  res.render('reportes/Guayaquil', { transaccions, acum, acumdism, acumaume});
});

  //Por busqueda
router.post('/reportes/Guayaquil', async (req, res) => {
  const { title } = req.body;

  //Transacciones de la base de datos
  const transaccions = await Transaccion.find({entidad:"Guayaquil", date:title}).lean();

  //Transacciones de reduccion de capital en la plataforma (Deposito)
  const  dism = transaccions => transaccions.title !== 'Retiro'
  var disminuye = transaccions.filter(dism);

  //Transacciones de aumento de capital  en la plataforma (Retiro)
  const  aume = transaccions => transaccions.title == 'Retiro'
  var aumenta = transaccions.filter(aume);

  //Suma total de reduccion
  var acumdism = 0;
  for (var i=0; i<disminuye.length; i++){
    acumdism = acumdism + disminuye[i].cantidad;
  };

  //Suma total de aumento
  var acumaume = 0;
  for (var i=0; i<aumenta.length; i++){
    acumaume = acumaume + aumenta[i].cantidad
  };

  //Suma total de cantidades en la base de datos
  var acum = acumaume - acumdism;
  
  res.render('reportes/Guayaquil', { transaccions, acum, acumdism, acumaume});
});

  module.exports = router;