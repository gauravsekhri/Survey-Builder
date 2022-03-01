module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("User", {
    //SurveyID
    Username: {
      type: Sequelize.STRING
    },
    //Status
    Password: {
      type: Sequelize.STRING
    },
    Projects: {
      type: Sequelize.STRING
    }
  });

  return Tutorial;
};
