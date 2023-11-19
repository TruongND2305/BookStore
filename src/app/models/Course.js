const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const MongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;
const Course = new Schema({
  name: { type: String, maxLength: 255 },
  description: { type: String, maxLength: 255},
  image: { type: Array},
  slug: { type: String, slug: 'name'},
},{
  timestamps: true,
});
// add Plugin
mongoose.plugin(slug);
Course.plugin(MongooseDelete,{ overrideMethods: 'all' , deletedAt : true })
module.exports = mongoose.model("Course", Course);
