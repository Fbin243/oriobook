const database = require("./config/db.config");
const app = require("./app");

database.connect();
const port = process.env.PORT || 4000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Payment server is running on http://localhost:${port}`);
});
