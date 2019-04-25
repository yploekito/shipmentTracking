const router = require('express').Router();
const Model = require('../models');
const User = Model.User
const AWB = Model.AWB
router.get('/', (req, res) => {
    res.render('../views/home.ejs');
})

router.get('/register', (req, res) => {
    res.render('../views/register.ejs');
})

router.post('/register', (req, res) => {
    let firstName = req.body.title;
    let lastName = req.body.description;
    let userName = req.body.userName;
    let passWord = req.body.passWord;
    let role = "user";
    User.create({firstName: firstName, lastName: lastName, userName: userName, passWord: passWord, role: role})
    .then( (user) => {
        console.log(user);
        res.redirect(`/history/${user.id}`)
    })
    .catch( (err) => {
        res.send(err)
    })
})


router.get('/statusreport/:awbId', (req, res) => {
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
    User.findOne({where:{userName:inputUsername, passWord:inputPassword}})
    .then((oneUser)=>{
        if(oneUser){
            res.redirect(`/history/${oneUser.id}`, {
                oneUser: oneUser
            })
        }else{
            res.redirect('/login?errMsg= Username or Password is incorrect')
        }
    })
    .catch((err)=>{
        res.send(err)
    })
})

module.exports = router;