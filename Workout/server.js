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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

app.get("/get", (req, res) => {
  Workout.find({})
    .then(dbWO => {
      res.json(dbWO);
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

})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
