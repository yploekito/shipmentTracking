const router = require('express').Router();
const model = require('../models');

router.get('/', (req, res) => {
    res.render('../views/home.ejs');
})

router.get('/register', (req, res) => {
    res.render('../views/register.ejs');
})

router.get('/statusreport', (req, res) => {
    res.render('../views/statusReport.ejs');
})

router.get('/history', (req, res) => {
    res.render('../views/history.ejs');
})

router.get('/login', (req, res) => {
    res.render('../views/login.ejs');
})

module.exports = router;