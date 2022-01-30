module.exports = (mongoose) => {
  const Tutorial = mongoose.model(
      "tutorial",
      mongoose.Schema(
        {
          title: {type: String, require :true},
          description: String,
          skills : [String],
          chapters : {type: [String], require :true, trim: true},
          published: Boolean, 
          priceInRupees : {type: Number, default: 5000, trim: true, min : 0, max: 30000},
          priceAfterDiscount : {type: Number, min : 0, max: 30000, trim: true},  // at frontend don't allow -ve price
          category : String,    // allow categories through a drop down box from React frontend
          imageURL : { type: String, default: 'https://ik.imagekit.io/upgrad1/marketing-platform-assets/meta-images/home.jpg' },
          videoURL : { type: String, default: 'https://www.youtube.com/watch?v=MTdpHs6HWwM' },
          notesURL : { type: String, default: 'https://www.mongodb.com/mern-stack' },
          duration : { type: Number, default: 60 , min : 0, max: 1200 },  // duration is in minutes
          popularity : { type: Number, default: 4.0 },  // lets start the popularity Index from 4.0 on  5
          author: String
        },
        { timestamps: true }
      )
    );
  
    return Tutorial;
  };

  // Note : popularity Index would not be entered by the Admin from FrontEnd
  // Its for representational purposes only. 
  