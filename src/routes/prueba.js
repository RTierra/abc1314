const express = require('express');
const router = express.Router();
const Chart = require('chart.js');

router.get('/prueba',  (req, res) => {
  //  var { myChart } = req.body;


    res.render('reportes/prueba');
    
});

module.exports = router;