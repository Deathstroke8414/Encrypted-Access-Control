const express = require ('express')
const routers = require('./routers/rout')
require('./db/mongoose')

const app = express()
const port = process.env.PORT||3000
app.use(express.json())
app.use(routers)

app.listen(port,()=>{
    console.log("Server is up on port:" +port)
})