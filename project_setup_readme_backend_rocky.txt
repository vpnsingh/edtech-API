1. Copy the project folder in your PC's node apps path

2. Go to the project folder path and do    npm init
C:\SuvenNodeApps\NodeProjects\nodejs-express-mongodb> npm init
   
3. We need to install necessary modules: 
express, mongoose, body-parser and cors.

Run the command:
C:\SuvenNodeApps\NodeProjects\nodejs-express-mongodb> npm install express mongoose body-parser cors --S


4. To run and test the Content part of the project do as follows : 

4a. Run server.js file.
C:\SuvenNodeApps\NodeProjects\nodejs-express-mongodb> node server

4b. Open Compass. The GUI for MongoDB.

4c. List of Api calls to the test the system and for frontend ( react developer ):

>> To run and test the user management part of the project do as follows : 
Please note : default USER is 'user'.  There would be only 2 kinds of user 
a. user 
b. admin

Make sure that on the frontend ( react.js )  provide a drop down , so that any garbage input is restricted.

> for Signup

Method : POST 
URL -> http://localhost:3000/api/sign-up
body -> {
      "firstName" : "Venky",
	  "lastName" : "ABC123",
	  "email" : "venky@somemail.com",
      "password" : "venky1234",
      "role" : "user"
}

return value -> {
    "role": "user",
    "_id": "6069b434e81fc334e8c7b8d3",
    "email": "venky@somemail.com",
    "password": "venky1234",
    "isLoggedIn": true,
    "createdAt": "2021-04-04T12:42:28.574Z",
    "updatedAt": "2021-04-04T12:42:28.574Z",
    "__v": 0
}

---------------

> for Login

Method : POST 
URL -> http://localhost:3000/api/login
body -> {
     "email": "prachi@somemail.com",
    "password": "prachi1234"
}

return value -> {
    "role": "user",
    "_id": "6069b434e81fc334e8c7b8d3",
    "email": "prachi@somemail.com",
    "password": "prachi1234",
    "isLoggedIn": true,
    "createdAt": "2021-04-04T12:42:28.574Z",
    "updatedAt": "2021-04-04T12:42:28.574Z",
    "__v": 0
}


---------------

> for Logout
Method : POST 

URL -> http://localhost:3000/api/logout
body -> {
      "id": "61549052414f2f1eb8b9ecfd"
}


return value -> {
    "message": "Logged Out successfully."
}

Note : Check at back end the isLoggedIn attribute is reset to FALSE


---------------

> Create a new Tutorial using POST /tutorials Api

method 	: POST   
URL 	: http://localhost:3000/api/tutorials/
body -> {
"title" : "DevOps and javascript",
"description" : "Table of contents - Primary Topics",
"skills" : "HTML, CSS, and more",
"chapters" : "Chapter 1 , Chapter 2",
"published" : true,
"category" : "DevOps",
"priceInRupees" :  "5000",
"priceAfterDiscount" : "4000"
}

return value -> {
    "priceInRupees": 5000,
    "imageURL": "https://ik.imagekit.io/upgrad1/marketing-platform-assets/meta-images/home.jpg",
    "videoURL": "https://www.youtube.com/watch?v=MTdpHs6HWwM",
    "notesURL": "https://www.mongodb.com/mern-stack",
    "duration": 60,
    "popularity": 4,
    "_id": "6069aa1be81fc334e8c7b8d0",
    "title": "AJAX and javascript- advanced",
    "description": "Table of contents - Primary Topics",
    "published": true,
    "category": "DevOps",
    "createdAt": "2021-04-04T11:59:23.696Z",
    "updatedAt": "2021-04-04T11:59:23.696Z",
    "__v": 0
}

-----------------------

> Retrieve a single Tutorial by id using GET /tutorials/:id Api

method 	: GET   
URL 	: http://localhost:3000/api/tutorials/6069aa1be81fc334e8c7b8d0

return value -> {
    "priceInRupees": 5000,
    "imageURL": "https://ik.imagekit.io/upgrad1/marketing-platform-assets/meta-images/home.jpg",
    "videoURL": "https://www.youtube.com/watch?v=MTdpHs6HWwM",
    "notesURL": "https://www.mongodb.com/mern-stack",
    "duration": 60,
    "popularity": 4,
    "_id": "6069aa1be81fc334e8c7b8d0",
    "title": "AJAX and javascript- advanced",
    "description": "Table of contents - Primary Topics",
    "published": true,
    "category": "DevOps",
    "createdAt": "2021-04-04T11:59:23.696Z",
    "updatedAt": "2021-04-04T11:59:23.696Z",
    "__v": 0
}

> if the Id supplied is wrong or nor present then 
> method 	: GET   
  URL 		: http://localhost:3000/api/tutorials/12345
  
return value -> {
    "message": "Error retrieving Course with id=6069aa1be81fc334e8c7b8d"
}

-----------------------

> Update a Tutorial using PUT /tutorials/:id Api

method 	: PUT   
URL 	: http://localhost:3000/api/tutorials/609637d34914ee1aa49e5e5a
body -> {
"duration": 310
}

return value -> {
    "message": "Course was updated successfully."
}

Note : check at the backend. The course duration would have got updated to 310 minutes. 

-----------------------

> Find all Tutorials which title contains 'ajax' : GET /tutorials?title=ajax

method 	: GET   
URL 	: http://localhost:3000/api/tutorials?title=ajax

return value -> [
    {
        "priceInRupees": 5000,
        "imageURL": "https://ik.imagekit.io/upgrad1/marketing-platform-assets/meta-images/home.jpg",
        "videoURL": "https://www.youtube.com/watch?v=MTdpHs6HWwM",
        "notesURL": "https://www.mongodb.com/mern-stack",
        "duration": 310,
        "popularity": 4,
        "_id": "6069aa1be81fc334e8c7b8d0",
        "title": "AJAX and javascript- advanced",
        "description": "Table of contents - Primary Topics",
        "published": true,
        "category": "DevOps",
        "createdAt": "2021-04-04T11:59:23.696Z",
        "updatedAt": "2021-04-04T12:06:24.128Z",
        "__v": 0
    }
]


> Suppose , if no match is found, then :

method 	: GET   
URL : http://localhost:3000/api/tutorials?title=programming
return value -> []

-----For Admin----
Note : For only Admin login , do try : 
method 	: GET   
URL : http://localhost:3000/api/tutorials/
and 
http://localhost:3000/api/tutorials?title=programming

Did u notice all courses ( published and not published ) ?
This would help the Admin to update a non-published course. 


-------------------

> Find all Tutorials which category contains 'Frontend' : GET /tutorials/categories/Frontend

method 	: GET   
URL : http://localhost:3000/api/tutorials/categories/frontend

return value -> [
    {
        "priceInRupees": 5000,
        "imageURL": "https://ik.imagekit.io/upgrad1/marketing-platform-assets/meta-images/home.jpg",
        "videoURL": "https://www.youtube.com/watch?v=MTdpHs6HWwM",
        "notesURL": "https://www.mongodb.com/mern-stack",
        "duration": 60,
        "popularity": 4,
        "_id": "6069b213e81fc334e8c7b8d1",
        "title": "Javascript for dummies",
        "description": "Table of contents - Primary Topics",
        "published": true,
        "category": "Frontend",
        "createdAt": "2021-04-04T12:33:23.419Z",
        "updatedAt": "2021-04-04T12:33:23.419Z",
        "__v": 0
    }
]

-------------------

> Find all category names : 
GET   /tutorials/categories

method 	: GET   
URL : http://localhost:3000/api/tutorials/categories

return value -> 
[
    "DevOps",
    "javascript"
]


------------------

> Find all published Tutorials using GET /tutorials/published Api

method 	: GET   
URL :  http://localhost:3000/api/tutorials/published
return value -> [
    {
        "priceInRupees": 5000,
        "imageURL": "https://ik.imagekit.io/upgrad1/marketing-platform-assets/meta-images/home.jpg",
        "videoURL": "https://www.youtube.com/watch?v=MTdpHs6HWwM",
        "notesURL": "https://www.mongodb.com/mern-stack",
        "duration": 310,
        "popularity": 4,
        "_id": "6069aa1be81fc334e8c7b8d0",
        "title": "AJAX and javascript- advanced",
        "description": "Table of contents - Primary Topics",
        "published": true,
        "category": "DevOps",
        "createdAt": "2021-04-04T11:59:23.696Z",
        "updatedAt": "2021-04-04T12:06:24.128Z",
        "__v": 0
    }
]

---------------------------

> Delete a Tutorial using DELETE /tutorials/:id Api

method 	: DELETE  
URL :  http://localhost:3000/api/tutorials/6069aa1be81fc334e8c7b8d0
return value -> {
    "message": "Course was deleted successfully!"
}

---------------------------

> Delete all Tutorials using DELETE /tutorials Api

method 	: DELETE
URL : http://localhost:3000/api/tutorials/
return value -> {
    "message": "2 Courses were deleted successfully!"
}

---------------------------
> To create a enrollment into a course , check the enroll api
> Enrollment
	method : POST
    URL -> http://localhost:3000/api/enroll
    body -> {
    "userId" : "609a0c8d6a568132dc352fea",
    "courseId" : "609fbf6c71a3032c4c078fdf"
    }











