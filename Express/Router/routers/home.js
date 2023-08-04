const express = require('express');
const {render} = require("express/lib/application");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'My Express App', message: 'Hello'});
});

module.exports = router;