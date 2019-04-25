const router = require('express').Router();
const Model = require('../models');
const User = Model.User
router.get('/', (req, res) => {
    res.render('../views/home.ejs');
})

router.get('/register', (req, res) => {
    res.render('../views/register.ejs');
})

router.get('/statusreport', (req, res) => {
    res.render('../views/statusReport.ejs');
})

router.get('/history/:userId', (req, res) => {
    res.render('../views/history.ejs');
})

router.get('/login', (req, res) => {
    res.render('../views/login.ejs');
})

router.post('/login', (req,res)=>{
    let inputUsername = req.body.username
    let inputPassword = req.body.password
    User.findOne({where:{userName:inputUsername, passWord:inputPassword}})
    .then((oneUser)=>{
        // console.log(oneUser)
        res.redirect(`/history/${oneUser.id}`)
    })
    // .catch((err)=>{
    //     res.send(err)
    // })
})

module.exports = router;