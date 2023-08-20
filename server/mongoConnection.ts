import mongoose from "mongoose";

export const MongoConnect = async () => {
  mongoose.connect('mongodb+srv://90Box:90Box@90box.5v3ec0k.mongodb.net/90Box?retryWrites=true&w=majority', {
  }).then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
}