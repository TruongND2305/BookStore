const Course = require("../models/Course");
const {multipleMongooseToObject} = require("../../util/mongoose");
class DashBoardController {
  index(req, res, next) {

    // Course.countDocumentsDeleted()
    // .then((deletedCount) => {
    //   console.log(deletedCount);
    // }).catch((error) => {});

    Course.find({})
      .then((courses, err) => {
        res.render('courses/dashboard',{
          courses : multipleMongooseToObject(courses),
        })
      })
      .catch(next);
  }
}

module.exports = new DashBoardController();
