const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    if (connection) {
      console.log(`Mongodb connected HOST: ${connection.connection.host}`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
