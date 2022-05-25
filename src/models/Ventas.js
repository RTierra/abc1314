const mongoose = require('mongoose');
const { Schema } = mongoose;



const VentasSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  vendedor:{
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  date_d: {
    type: String,
    required: true
  },
  date_ma: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Ventas', VentasSchema);