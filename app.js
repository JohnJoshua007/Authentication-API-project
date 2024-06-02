const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
//connect to mongodb
mongoose
  .connect(
    "mongodb+srv://johnobed3108:OaW4ellXiGKrtbUn@masynctech.in9reoi.mongodb.net/students-dataappNamebase&=masynctech"
  )
  .then(() => console.log("DB connected successfully"))
  .catch((e) => console.log(e));

//Middlewares
app.use(express.json()); //pass incoming json data

//routes
app.use("/", router);
//error handler
app.use(errorHandler);

//start the server
const PORT = 8000;
app.listen(PORT, console.log(`Server is up and running`));
