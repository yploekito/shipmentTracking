const express = require('express')
const app = express()
const port = 3000
const homeRoute = require('./router/homeRoute')

app.use(express.urlencoded({extended:false}))
app.listen(port, ()=>{
    console.log(`connected to port ${port}`)
})

app.use('/', homeRoute)

