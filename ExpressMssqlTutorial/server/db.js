const sql = require("mssql");

const config = {
  server: "localhost",
  database: "TasksDB",
  user: "api_user",
  password: "1234qwer!",
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

module.exports = {
  connect: () => sql.connect(config),
  sql,
};
