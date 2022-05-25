const express = require('express');
const router = express.Router();
//Models
const Productos = require('../models/Productos');
const Ventas = require('../models/Ventas')


//VENTAS

router.get('/ventas', async (req, res) => {
//DATOS generales
  //Productos de la base de datos
  const productos = await Productos.find().lean();
  //Ventas de la base de datos
  const ventas = await Ventas.find().lean();
  //Ultimas 5 ventas para mostrar
  var ultimas = ventas.slice(-4);

    res.render('papeleria/ventas', { productos, ultimas });
});

router.post('/borr/ventas', async (req, res) => {
  const { title } = req.body;
  await Ventas.findByIdAndDelete(title);
  req.flash('success_msg', 'Venta eliminada');
  res.redirect('/ventas')
});

router.post('/ventas', async (req, res) => {
  const { title, cantidad } = req.body;
  const vendedor = "Susana, Yari";

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
  
   //NUEVA CANTIDAD RESTADA DE CANTIDAD DE PRODUCTOOS
   const productos = await Productos.find({nombre: title}).lean();
   const nuevacantidad = cantidad;
   const cantidadproductos = JSON.stringify(productos.cantidad);//transformas la cantidad a numero
   console.log(nuevacantidad);
   console.log(cantidadproductos);
   console.log(title);
 
  const errors = [];
  if (title == 'Selecciona una opcion') {
    errors.push({text: 'Escoge una descripcion.'});
  }
  if (!cantidad) {
    errors.push({text: 'Ingresa una cantidad'});
  }
  //CORREGUIR LA CINCATENACION DE LAS ULTIAS TRANSACCIONES
  if (errors.length > 0) {
    res.render('papeleria/ventas', {
      errors,
      title,
      cantidad
    });
  } else {
    const newVentas = new Ventas({title, cantidad, vendedor,  date, date_d, date_ma, time});
    await newVentas.save();
    req.flash('success_msg', 'Venta registrada');
    res.redirect('/ventas');
  }
});



//INVENTARIO

router.get('/inventario', async (req, res) => {
    //DATOS generales
    //Transacciones de la base de datos
    const productos = await Productos.find().lean();
                                                            
    res.render('papeleria/inventario', { productos });
});

router.post('/borr/inventario', async (req, res) => {
    const { nombre } = req.body;
    await Productos.findByIdAndDelete(nombre);
    req.flash('success_msg', 'Producto Eliminado');
    res.redirect('/inventario')
  });

router.post('/inventario', async (req, res) => {
    const { title, tipo, marca, precio } = req.body;

    const nombre = title + " " + marca
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
    if (!title) {
      errors.push({text: 'Ingresa el nombre'});
    }
    if (!tipo) {
      errors.push({text: 'Ingresa el tipo'});
    }
    if (!marca) {
      errors.push({text: 'Ingresa la marca'});
    }
    if (!precio) {
      errors.push({text: 'Ingresa un precio'});
    }
    if (errors.length > 0) {
      res.render('papeleria/inventario', {
        errors,
        title,
        tipo,
        marca,
        precio,
 
      });
    } else {
      const newProducto = new Productos({nombre, tipo, marca, precio, date, date_d, date_ma, time});
      await newProducto.save();
      req.flash('success_msg', 'Producto agregado');
      res.redirect('/inventario');
    }
  });
module.exports = router;