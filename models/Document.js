var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var Document = mongoose.Schema({
  name: String
});

Document.plugin(mongoosePaginate);

module.exports = mongoose.model('Document', Document);