module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Hello@sql9899",
  DB: "surveydata",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
