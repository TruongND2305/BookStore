const Course = require("../models/Course");
const {multipleMongooseToObject} = require("../../util/mongoose");
class SiteController {
  index(req, res, next) {
    Course.find({})
      .then((courses, err) => {
        res.render('home',{
         courses : multipleMongooseToObject(courses)
        })
      })
      .catch(next);
  }

  // [get] /home/:slug
  search(req, res) {
    res.render("search");
  }

  // [nhap] /search/
  nhap(req, res) {
    console.log(req.body);
    res.send("");
  }
}

module.exports = new SiteController();
