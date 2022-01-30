const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Course
exports.create = async (req, res) => {
  // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

// Save Course in the database
try {
  // Create a Course
    const tutorial = new Tutorial({
      title: req.body.title,
      description: req.body.description,
      skills : req.body.skills,
      chapters : req.body.chapters,    // chapter names shd be comma seperated
      published: req.body.published ? req.body.published : false,
      category : req.body.category,
      duration : req.body.duration,
      imageURL : req.body.imageURL,
      videoURL : req.body.videoURL,
      notesURL : req.body.notesURL,
      priceInRupees : req.body.priceInRupees,
      priceAfterDiscount : req.body.priceAfterDiscount,
      author: req.body.author
      
    });
    //console.log('before save');
    let saveCourse = await tutorial.save(); 
    //when fail its goes to catch
    res.send(saveCourse); //when success.
    //console.log('after save');
  } catch (err) {
    //console.log('err' + err);
    res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Course."
        });
  }}



// Retrieve all Courses from the database by title.
// if no title is passed then all courses are retrieved
exports.findAlltitle = async (req, res) => {
  try {
  const title = req.query.title;
  var condition = title ? { title: { 
                            $regex: new RegExp(title), 
                            $options: "i" 
                          } 
                        } : {};

  let data = await Tutorial.find(condition);
//console.log(data);
res.send(data);
  } catch(err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Courses."
      });
    }
};



// Retrieve all Courses from the database by Category.
//if no category is passed then all courses are retrieved
exports.findCoursesByCategory = async (req, res) => {
  try {
  const category = req.params.categoryName;
var condition = category ? { category: { 
                            $regex: new RegExp(category), 
                            $options: "i" } 
                          } : 
                          {};
//console.log(condition);

  let data = await Tutorial.find(condition);
//console.log(data);
res.send(data);
  } catch(err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Courses."
      });
    }
};


exports.findAllCategories = async (req, res) => {
  try {
  let data = await Tutorial.find({}).select('category').distinct('category');
//console.log(data);
res.send(data);
  } catch(err) {
      res.status(500).send({
        message:
          err.message || "Internal error occured"
      });
    }
};




// Find a single Course with an id
exports.findOne = async (req, res) => {
try {
const id = req.params.id;
let data = await Tutorial.findById(id);
//console.log(data);
if (!data)
    res.status(404).send({ message: "Not found Course with id " + id });
else 
    res.send(data);
} catch(err) {
      res.status(500).send({
        message:
          err.message || "Error retrieving Course with id=" + id });
    }
};


// Update a course by the id in the request
exports.update = async (req, res) => {
	if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    try {
	const id = req.params.id;
    let data = await Tutorial.findOneAndUpdate(
                      id, 
                      req.body, 
                      { useFindAndModify: false }
                      );
	//console.log(data);
	  if (!data) {
          res.status(404).send({
            message: `Cannot update Course with id=${id}. Maybe Course not their!`
          });
        } 
    else 
        res.send({ message: "Course was updated successfully." });
  } catch(err) {
        res.status(500).send({
          message:
            err.message || "Error updating Course with id=" + id });
      }
  };



// Delete a Course with the specified id in the request
exports.delete = async (req, res) => {
	
  try {
const id = req.params.id;
  let data = await Tutorial.findOneAndDelete(id);
//console.log(data);
if (!data) {
        res.status(404).send({
          message: `Cannot delete Course with id=${id}. No such course found!`
});
  } else res.send({
          message: "Course was deleted successfully!"
        });
  } catch(err) {
      res.status(500).send({
        message:
          err.message || "Could not delete the specified course" });
    }
};


// Delete all courses from the database.
exports.deleteAll= async (req, res) => {
try {
  let data = await Tutorial.deleteMany({});
//console.log(data);
res.send({
        message: `${data.deletedCount} Courses were deleted successfully!`
      });
  } catch(err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Courses." });
    }
};
  

// Find all published courses
exports.findAllPublished = async (req, res) => {
  try {
  let data = await Tutorial.find({ published: true }).sort('-createdAt');
  //console.log(data);
  res.send(data);
  } catch(err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Courses."
          });
      }
  };