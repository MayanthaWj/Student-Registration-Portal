const Course = require("../model/course");

const getCourses = async (req, res) => {
  await Course.findAll()
    .then((courses) => {
      res.json(courses);
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ error: err });
      }
    });
};

const deleteCourse = async (req, res) => {
  const id = req.params.id;

  await Course.destroy({ where: { course_id: id } })
    .then(() => {
      res.json("COURSE DELETED");
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ error: err });
      }
    });
};

const createCourse = async (req, res) => {
  const { course_id, name } = req.body;
  await Course.create({
    course_id: course_id,
    name: name,
  })
    .then((course) => {
      res.send(course);
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ error: err });
      }
    });
};

const updateCourse = async (req, res) => {
  const id = req.params.id;
  const new_name = req.body.name;

  if (!new_name) {
    res.json("New Course Name Required! ");
  } else {
    await Course.update(
      { name: new_name },
      {
        where: {
          course_id: id,
        },
      }
    )
      .then((response) => {
        if (response == 0) {
          return res.status(404).send({
            message: "Course not found with id " + req.params.id,
          });
        }
        res.send("Update Successfully!");
      })
      .catch((err) => {
          res.status(500).send({message: "Error updating course with id=" + id});
      });
  }
};
module.exports = { getCourses, createCourse, deleteCourse, updateCourse };
