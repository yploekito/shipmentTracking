const express = require('express')
const app = express()
const port = 3000
const homeRoute = require('./router/homeRoute')
const session = require('express-session')

app.use(express.urlencoded({extended:false}))
let sess = {secret:'daringfox'}
app.use(session(sess))
console.log(sess)

app.listen(port, ()=>{
    console.log(`connected to port ${port}`)
})

app.use('/', homeRoute)

