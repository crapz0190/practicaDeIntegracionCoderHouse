import mongoose from "mongoose";

const URI =
  "mongodb+srv://crapz0190:nDL34FvHs5UmP07@codercluster.vojlqwl.mongodb.net/ecommerce?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
  } catch (e) {
    console.log(e);
  }
};

mongoose.connection.once("open", (_) => {
  console.log("DB is connected");
});

export default connectDB;
