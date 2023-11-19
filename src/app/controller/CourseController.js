const Course = require("../models/Course");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
class CourseController {
  // [GET]/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("single-product", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // [GET]/ /courses/create
  create(req, res, next) {
    // console.log(res.body);
    // console.log(res.file);
    // return
    res.render("courses/create");
  }

  store(req, res, next) {
    // console.log(req.body);
    // console.log(req.files);
    const images = req.files
    // console.log('Body- ' + JSON.stringify(req.body));
    // console.log('Files '+JSON.stringify(req.files));
    if (!req.files) {
      res.status(400).send('File upload is not valid.');
      return;
    }
    const imgPath = images.map(img => {
      return img.path
    })
    console.log(imgPath);
    Course.create({name: req.body.name, image: imgPath, description: req.body.description})
    .then(() => {
      res.redirect('/dashboard/all')
    })
    .catch(next)
  }
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        res.render("courses/edit", { course: mongooseToObject(course) });
      })
      .catch(next);
  }
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/dashboard/all"))
      .catch(next);
  }
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("/dashboard/all"))
      .catch(next);
  }
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/dashboard/all"))
      .catch(next);
  }
  trash(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) => {
        res.render("courses/trash", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("/dashboard/all"))
      .catch(next);
  }
  upload(req, res, next) {
    console.log(req.file, req.body);
  }
}

module.exports = new CourseController();
