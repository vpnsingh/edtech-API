const express = require("express");
bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


(async function() {
  const db = require("./app/models");
  let client;

  try {
   client = await db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
    console.log("Connected to the database");
 } catch (err) {
    console.log("Cannot connect to the database!", err);
    process.exit(1);
  }

})();


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application development - MERN Stack Development." });
});

require("./app/routes/tutorial.routes")(app);
// app which is the express object , 
// is being passed as a paramter to the tutorial.routes
// As all the internal page routing for the application is being done 
// by express in the  routes/tutorial.routes file.

require("./app/routes/user.routes")(app);

require("./app/routes/enrollment.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
