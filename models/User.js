const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    health: {type: Number, required: true},
    attack: {type: Number, required: true},
    defense: {type: Number, required: true},
    source : {type : String}
})

module.exports = model('User', schema)