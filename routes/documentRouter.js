var express = require('express');
var docRouter = express.Router();
var path = require('path');
var documentMongoDB = require('../models/Document');

/* GET initial page. */
docRouter.get('/', function(req, res, next) {
  res.sendFile(path.resolve('./public/index.html'));
});

/* POST add new document. */
docRouter.post('/add', function(req, res, next) {
  var newDocument = new documentMongoDB({ name: req.body.name});
  newDocument.save(function (err, newDoc) {
    if( err ) return console.error(err);

    res.send(newDocument);
  });
});

/* PUT update document. */
docRouter.put('/update', function(req, res, next) {
  documentMongoDB.findByIdAndUpdate(req.body._id, { $set: {name: req.body.name} }, {new: true}, function (err, newDoc) {
    if( err ) return console.error(err);

    res.send(newDoc);
  });
});

/* GET list of all documents. */
docRouter.get('/list/:page', function(req, res, next) {
  /*documentMongoDB.find( function (err, docs) {
  	if( err ) return console.error(err);

  	res.send(docs);
  });*/
  documentMongoDB.paginate({}, {page:req.params.page, limit: 6}, function(err, result) {
  	if( err ) return console.error(err);
  	console.log(result);
  	res.send(result);
  });
});

/* GET specific document. */
docRouter.get('/find/:id', function(req, res, next) {
  documentMongoDB.find( { _id: req.params.id }, function (err, doc) {
  	if( err ) return console.error(err);
  	console.log(doc);
  	res.send(doc);
  });
});

/* DELETE document. */
docRouter.delete('/remove', function(req, res, next) {
  documentMongoDB.findByIdAndRemove(req.body._id, function (err) {
    if( err ) return console.error(err);

    res.send({message: 'Item deleted!'});
  });
});

module.exports = docRouter;