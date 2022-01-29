import mongoose from 'mongoose';
const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    //  useCreateIndex: true, 
    //thease two seems to be not supported any more .
  });
};
export default dbConnect;
