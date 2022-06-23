const mongoose = require('mongoose')


const teams = new mongoose.Schema({
    team:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    }
}, {collection: 'Teams'})

const Teams = mongoose.model('Teams',teams)

module.exports = {
    Teams
}