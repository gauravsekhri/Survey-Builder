const db = require("../models");
const Tutorial = db.tutoria;
const Op = db.Sequelize.Op;



// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.SurveyID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Survey
  const Data = {
    SurveyID: req.body.SurveyID,
    SurveyJSON: req.body.SurveyJSON,
    CreatedBy: req.body.CreatedBy,
    Responses: req.body.Responses,
    Status : "Draft"
  };

  // Save Survey in the database
  Tutorial.create(Data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred"
      });
    });
};

// Retrieve all Tutorial from the database.
exports.findAll = (req, res) => {
  const SurveyID = req.query.SurveyID;
  var condition = SurveyID ? { SurveyID: { [Op.like]: `%${SurveyID}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving"
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving data with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const SurveyID = req.params.SurveyID;

  Tutorial.update(req.body, {
    where: { SurveyID: SurveyID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Survey JSON was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Survey JSON with SurveyID=${SurveyID}. Maybe Survey JSON was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Survey JSON with SurveyID=" + SurveyID
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Survey JSON was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Survey JSON with id=${id}. Maybe Survey JSON was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Survey JSON with id=" + id
      });
    });
};

// Delete all Survey JSON from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Survey JSON were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Survey JSON."
      });
    });
};

// find all LIVE Surveys
exports.findAllactive = (req, res) => {
  Tutorial.findAll({ where: { Status: "Live" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Survey JSON."
      });
    });
};
