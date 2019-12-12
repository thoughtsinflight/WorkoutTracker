const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Workout = require("./models/Workout");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workoutdb";
mongoose.connect(MONGODB_URI);

app.get("/get", (req, res) => {
  Workout.find({})
    .then(dbWO => {
      $("#workOutName").text(`${dbWO.name}`);
      $("#workOutBody").text(`${dbWO.body}`);
      // res.json(dbWO);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/submit", ({ body }, res) => {
  const newWorkOut = new Workout(body);
  Workout.create(newWorkOut)
    .then(dbWO => {
      res.json(dbWO);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/add", ({ body }, res) => {

});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
