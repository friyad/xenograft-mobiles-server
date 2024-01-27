import mongoose from "mongoose";

const connectDB = async () => {
  const dbURL: string = process.env.DB_URL || "";

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(dbURL, {
      dbName: "xenograft_mobiles",
    });
    console.log("DB connection successfull");
  } catch (error: unknown) {
    console.log(error);
  }
};

export default connectDB;
