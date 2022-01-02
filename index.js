const express = require("express");
const Joi = require("joi");
const server = require("./server");
const path = require("path");
const app = express();
const port = 3000;
app.use(express.json());

app.use(server);

app.use(function (req, res, next) {
  console.log("logging");
});

// courses array for creating api
const courses = [
  {
    id: 1,
    name: [
      {
        name1: "HTML",
        name2: "CSS",
      },
    ],
  },
  {
    id: 2,
    name: "JavaScript",
  },
  {
    id: 3,
    name: "React",
  },
];
// get method handling in express
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/json", (req, res) => {
  res.json({ datetime: 12 / 20 / 2021, value: 12 });
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// post handling in express.. post for creating a new feild in object or array
app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(404).send(result.error.details[0].message);
    return;
  }
  let course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
// get request for accessing individual data
app.get("/api/courses/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given ID was not found");
  }
  return;
});
// put method for updating fields in api
app.put("/app/courses/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the ID was not found");
  }
  const result = validateCourse(req.body); //optional
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});
// created function of validation for better structure of code
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}
// delete
app.delete("/app/courses/:id", (req, res) => {
  const course = course.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course with the given id wasn't found");
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});
//PORT
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
