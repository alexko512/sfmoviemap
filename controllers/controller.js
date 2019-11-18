var doc = require('../models/Schema');

//making suggestions
exports.suggestForDoc = async function(req, res) {
    var keywords = req.query.key;
    var k = {$regex: new RegExp(keywords), $options: 'i'};
    var field = req.query.field;
    query = {};
    query[field] = k;

    try {
        docs =  await doc.find(query);
        if (docs.length < 1){
        console.log("nothing to fetch");
        res.status(404).end();
        } else {
            console.log(docs);
            res.send(docs);
            res.status(200);
        } 
    }  catch (err) {
        console.log(err)
        res.status(500)}
    };