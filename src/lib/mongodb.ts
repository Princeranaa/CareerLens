import mongoose from 'mongoose'

export const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log("mongodb connect")

  } catch (error) {
    console.log("Something went wrong", error);
  }
};
