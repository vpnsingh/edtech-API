const db = require("../models");
const Enrollment = db.enrollments;

// Create and Save a user
exports.enroll = async (req, res) => {
  // Validate request
  if (!req.body.userId && !req.body.courseId) {
    res.status(400).send({ message: "Enrollment should have loggedIn UserId and CourseId" });
    return;
  }

 // Save User in the database
 // REMEMBER
/* 
save() is a method on a Mongoose document. 
The save() method is asynchronous, 
so it returns a promise that you can await on.
*/
try {
  const enrollment = new Enrollment({
      userId: req.body.userId,
      courseId: req.body.courseId,
    });
    //console.log('before save');
    let saveEnrollment = await enrollment.save(); 
    //when fail its goes to catch
    res.send(saveEnrollment); //when success.
    //console.log('after save');
  } catch (err) {
    //console.log('err' + err);
    res.status(500).send({
          message:
            err.message || "Enrollment error occurred, please try again later."
        });
  }}