import mongoose from "mongoose";

const connectDB = async () => {
   try {
      const con = mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
      });
      // console.log(`MongoDB Connected: ${con.connection.host}`);
      console.log(`MongoDB Connected`);
   } catch (error) {
      console.log(error);
      process.exit(1);
   }
};

export default connectDB;
