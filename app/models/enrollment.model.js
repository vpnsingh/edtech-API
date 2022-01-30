module.exports = mongoose => {
    const Enrollment = mongoose.model(
        "enrollment",
        mongoose.Schema(
          {
            userId: { type : String , required : true },
            courseId: { type : String , required : true }
          },
          { timestamps: true }
        )
      );
    
      return Enrollment;
    };