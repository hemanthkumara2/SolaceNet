import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect("mongodb+srv://lsachintha93:ApdvQCwyIomlAx5Q@halochat.kajx4fj.mongodb.net/", {
      dbName: "HaloChat",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.log(error);
  }
};
//lsachintha93
//ApdvQCwyIomlAx5Q
