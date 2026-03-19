const app = require("./app.js");

const PORT = 3000;

const connectDb = require("./db/db.js");
connectDb();

app.listen(PORT, () => {
  console.log(`App is listening to PORT ${PORT}`);
});
