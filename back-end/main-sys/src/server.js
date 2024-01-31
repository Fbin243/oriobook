const database = require("./config/db.config");
const app = require("./app");

database.connect();
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`App is running on https://localhost:${port}`);
});