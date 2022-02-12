const db = require("../models");
// const Tutorial = db.tutoria;
const userData = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Survey
  const Data = {
    Username: req.body.Username,
    Password: req.body.Password,
    DataJSON: req.body.DataJSON
  };

  // Save Survey in the database
  userData.create(Data)
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
  const Username = req.query.Username;
  var condition = Username ? { Username: { [Op.like]: `%${Username}%` } } : null;

  userData.findAll({ where: condition })
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
  const Username = req.params.Username;

  // Tutorial.findOne({ where: { title: Username } });

  userData.findByPk(Username)
    .then(data => {
      res.send(data);
      console.log(data)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving data with id=" + Username
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const Username = req.params.Username;

  userData.update(req.body, {
    where: { Username: Username }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Survey JSON was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Survey JSON with Username=${Username}. Maybe Survey JSON was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Survey JSON with Username=" + Username
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  userData.destroy({
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
  userData.destroy({
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
  userData.findAll({ where: { Status: "Live" } })
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
