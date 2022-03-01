module.exports = app => {
  const Survey = require("../controllers/tutorial.controller.js");
  const User = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // Create a new Survey
  router.post("/surveys/", Survey.create);

  // Retrieve all Surveys
  router.get("/surveys/", Survey.findAll);
  router.get("/users/", User.findAll);

  // Retrieve all active Surveys
  router.get("/surveys/active", Survey.findAllactive);

  // Retrieve a single Survey with id
  router.get("/surveys/:id", Survey.findOne);
  router.get("/users/:Username", User.findOne);

  // Update a Survey with id
  router.put("/surveys/:SurveyID", Survey.update);

  // Delete a Survey with id
  router.delete("/surveys/:id", Survey.delete);

  // Delete all Surveys
  router.delete("/surveys/", Survey.deleteAll);

  app.use('/api', router);
};
