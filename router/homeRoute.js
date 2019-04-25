const router = require('express').Router();
const Model = require('../models');
const User = Model.User
const AWB = Model.AWB
const Location = Model.Location
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('../views/home.ejs');
})

router.get('/register', (req, res) => {
    res.render('../views/register.ejs');
})

router.post('/register', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let userName = req.body.userName;
    let passWord = req.body.passWord;
    let role = "user";
    User.create({firstName: firstName, lastName: lastName, userName: userName, passWord: passWord, role: role})
    .then( (user) => {
        res.redirect(`/history/${user.id}`)
    })
    .catch( (err) => {
        res.send(err)
    })
})

router.post('/statusreport/:AWBId', (req,res)=>{
    AWB.findOne({
        where:{
            id:req.params.AWBId
        }, include:{
            model: Location
        }
    })
    .then((oneAWB)=>{
        console.log(oneAWB)
        res.redirect(`/statusreport/${req.params.AWBId}`)
    })
    .catch((err)=>{
        res.send(err)
    })
})

router.get('/statusreport/:AWBId', (req, res) => {
    res.render('../views/statusReport.ejs');
})

router.get('/history/:userId', (req, res) => {
    User.findOne({
        where: {
            id: req.params.userId
        },
        include: [
            {model: AWB}
        ]
    })
    .then( (oneUser) => {
        res.render('../views/history.ejs', {
            oneUser: oneUser
        });
        // res.send(oneUser);
    })
    .catch( (err) => {
        res.send(err);
    })
})

router.get('/login', (req, res) => {
    res.render('../views/login.ejs', {error: req.query.errMsg});
})

router.post('/login', (req,res)=>{
    let inputUsername = req.body.username
    let inputPassword = req.body.password
    User.findOne({where:{userName:inputUsername}})
    .then((oneUser)=>{
        let check = bcrypt.compareSync(inputPassword, oneUser.passWord);
        if(check){
            res.redirect(`/history/${oneUser.id}`)
        }else{
            res.redirect('/login?errMsg= Username or Password is incorrect')
        }
    })
    .catch((err)=>{
        res.send(err)
    })
})

module.exports = router;