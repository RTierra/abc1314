const mongoose = require('mongoose');
const { Schema } = mongoose;



const TransaccionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  banco:{
    type: String,
    required: true
  },
  entidad:{
    type:String,
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

module.exports = mongoose.model('Transaccion', TransaccionSchema);
