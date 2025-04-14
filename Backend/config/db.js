const mongoose = require("mongoose");

const mongo_url = process.env.DB_URL

mongoose.connect(mongo_url)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });
