const mon = require ('mongoose')

const dataSchema = new mon.Schema({
    data:{
        key:{
        type: String,
        required: true
    },cipher:{
        type: String,
        required: true
    }},
    access:[{
        pub_bob:{
            type: String,
            required: true
    }}],
    key:[{
        re_encr_key:{
            type: String,
            required: true
    }}]
})

const storedData = mon.model('Data',dataSchema)
module.exports = storedData