var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('Welcome earthlings to project 3!!');
});

module.exports = router;
