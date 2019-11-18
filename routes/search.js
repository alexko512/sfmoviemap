var express = require('express')
var router = express.Router()

var controller = require('../controllers/controller'); 

router.get("/suggest", controller.suggestForDoc, (req, res) => {
  res.send(res.docs)
});

module.exports = router;