const express = require('express')
const storedData = require('../model/data')

const routers = new express.Router()

routers.get('/data',async(req,res)=>{
    
    const store = await storedData.find({})

    var arr = []
    await store.forEach((obj)=>{
        arr = arr.concat(obj._id.toString())
    })
     res.send(arr)
})

routers.get('/data/access/:uid',async(req,res)=>{
    const _id = req.params.uid

    try {
        const data = await storedData.findOne( _id)

        if (!data) {
            return res.send("No data with id: "+_id + " found!")
        }

        res.send(data.access)
    } catch (e) {
        res.send("Unknown Error!")
    }
})

routers.get('/data/:uid',async(req,res)=>{
    const _id = req.params.uid
    
    try {
        const data = await storedData.findOne( {_id})

        if (!data) {
            return res.send("No data with id: "+_id + " found!")
        }

        res.send(data)
    } catch (e) {
        res.send("Unknown Error!")
    }
    
})

routers.post('/data',async(req,res)=>{
    const data = new storedData (req.body)
    await data.save()
    res.send("Data saved!"+ data._id.toString())
})

routers.post('/data/grant_access/:uid',async(req,res)=>{
    const ac_key = req.body
    
    const _id = req.params.uid

    try {
        const data = await storedData.findOne({_id})

        if (!data) {
            return res.send("No data with id: "+_id + " found!")
        }
        
        const pub_bob = ac_key.pub_bob
        const re_encr_key = ac_key.re_encr_key

        data.access = await data.access.concat({pub_bob})
        data.key = await data.key.concat({re_encr_key})

        await data.save()
        res.send("Granted Access!")
        
    } catch (e) {
        res.send("Unknown Error!")
    }
})


module.exports = routers