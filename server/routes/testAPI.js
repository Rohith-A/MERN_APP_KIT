var express = require('express');
var router = express.Router();

router.get('/', function(req, resp) {
    // resp.send('Hello World');
    resp.send({status: 200,
        data: [1,2,3,4,5,6]});
});

module.exports = router;