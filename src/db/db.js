const mongoose = require("mongoose");

async function connectDb() {
  try {
    const data = await mongoose.connect(
      "mongodb+srv://siddheshmhapankar2478_db_user:sid123@complete-backend-cluste.7srcqlw.mongodb.net/halley",
    );
    console.log("Database connected");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDb;
