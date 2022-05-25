const mongoose = require('mongoose');
const { Schema } = mongoose;



const ProductosSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
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

module.exports = mongoose.model('Productos', ProductosSchema);
