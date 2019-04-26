const router = require('express').Router();
const Model = require('../models');
const User = Model.User
const AWB = Model.AWB
const Location = Model.Location
const Provider = Model.Provider
const TypeProvider = Model.TypeProvider
const ShipmentType = Model.ShipmentType
const bcrypt = require('bcrypt')
const checkLoginFunction = require('../helpers/checkLogin')
let timeFormat = require('../helpers/getTimeFormat') 


router.get('/', (req, res) => {
    // console.log(req.query.errMsg)
    let isLogin = req.session.login
    let role = req.session.role
    let userId = req.session.userId
    console.log(req.query.logout)
    if(req.query.logout === 'true'){
        req.session.destroy()
    }
    res.render('../views/home.ejs', {
        error: req.query.errMsg,
        isLogin:isLogin,
        role:role,
        userId:userId
    });
})

router.get('/services', checkLoginFunction, (req, res) => {
    let isLogin = req.session.login
    let role = req.session.role
    let userId = req.session.userId
    TypeProvider.findAll({
        include: [
            {model: Provider},
            {model: ShipmentType}
        ]
    }).then( (allTypeProvider) => {
        res.render('../views/services.ejs', {
            error: req.query.errMsg, 
            shipment: allTypeProvider,
            isLogin:isLogin,
            role:role,
            userId:userId
        })
        // res.send(allTypeProvider)
    }).catch( (err) => {
        res.send(err)
    })
})

router.get('/services/delete/:typeProviderId', checkLoginFunction, (req, res) => {

    let id = req.params.typeProviderId
    TypeProvider.findOne({
        where: {
            id: id
        },
        include: [
            {model: Provider},
            {model: ShipmentType}
        ]
    }).then( (oneTypeProvider) => {
        oneTypeProvider.destroy()
    })
    .then( ()=> {
        res.redirect('/services')
    }).catch( (err) => {
        res.send(err)
    })
})

router.post('/services/add', (req, res) => {
    let providerId = req.body.providerId;
    let shipmentId = req.body.shipmentId;
    TypeProvider.create({
        ProviderId: providerId,
        ShipmentTypeId: shipmentId 
    })
    .then( () => {
        res.redirect(`/services`)
    })
    .catch( (err) => {
        res.send(err)
    })
    
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
    
    User.create({firstName: firstName,
         lastName: lastName, 
         userName: userName, 
         passWord: passWord, 
         role: role
    })
    .then( (user) => {
        res.redirect(`/history/${user.id}`)
    })
    .catch( (err) => {
        res.send(err)
    })
})

router.post('/statusreport', (req,res)=>{
    AWB.findOne({
        where:{
            id:req.body.AWB
        }, include:{
            model: Location
        }
    })
    .then((oneAWB)=>{
        if(oneAWB){
            res.redirect(`/statusreport/${req.body.AWB}`)
        }else{
            res.redirect('/?errMsg=not found, input another AWB')
        }
    })
    .catch((err)=>{
        res.send(err)
    })
})

router.get('/statusreport/:AWBId', (req, res) => {
    let isLogin = req.session.login
    let role = req.session.role
    let userId = req.session.userId

    AWB.findOne({
        where:{
            id:req.params.AWBId
        }, include:{
            model: Location
        }
    })
    .then((oneAWB)=>{
        res.render('../views/statusReport.ejs', {
            oneAWB:oneAWB,
            isLogin:isLogin,
            role:role,
            userId:userId,
            timeFormatFunction: timeFormat
        });
    })
    .catch((err)=>{
        res.send(err)
    })
})

router.get('/history/:userId',checkLoginFunction, (req, res) => {
    let isLogin = req.session.login
    let role = req.session.role
    let userId = req.session.userId
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
            oneUser: oneUser,
            isLogin:isLogin, 
            role:role,
            userId: userId
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
            let sess= req.session
            req.session.login = true
            req.session.role = oneUser.role
            req.session.userId = oneUser.id
            console.log(sess)
            res.redirect(`/history/${oneUser.id}`)
        }else{
            res.redirect('/login?errMsg= Username or Password is incorrect')
        }
    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })

})

router.post('/addLocation/:AWBId', (req, res)=>{
    let currentLocation = req.body.currentLocation
    let area = req.body.area
    let date = req.body.date
    let time = req.body.time
    let fullDate = new Date(date + ' '+ time)
    fullDate = fullDate.toLocaleString()

    Location.create({
        currentLocation: currentLocation,
        area: area, 
        AWBId: req.params.AWBId,
        createdAt: fullDate
    })
    .then(()=>{
        return AWB.findOne({
            where:{
                id:req.params.AWBId
            }
        })
    })
    .then((oneAWB)=>{
        if(oneAWB.finalLocation === currentLocation){
            return oneAWB.update({
                status:'complete'
            })
        }else{
            return oneAWB
        }
    })
    .then(()=>{
        res.redirect(`/statusreport/${req.params.AWBId}`)
    })
    .catch((err)=>{
        res.send(err)
    })
    
})

module.exports = router;