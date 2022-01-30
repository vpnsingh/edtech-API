module.exports = app => {
  const enrollments = require("../controllers/enrollment.controller");
  
    var router = require("express").Router();
  
    router.post("/enroll", enrollments.enroll);
    
    app.use('/api', router);
  };

  /*
    Enrollment
    URL -> http://localhost:3000/api/enroll
    body -> {
    "userId" : "6069b434e81fc334e8c7b8d3",
    "courseId" : "606f395167a42d2f501eb1c5"
    }

  */