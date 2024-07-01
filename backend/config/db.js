import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(
      // "mongodb://localhost:27017/Khub-Valo-Mon"
      "mongodb+srv://mushfiqbh:Lq6AKM1g5tQDGxLb@cluster0.cppebjh.mongodb.net/Khub-Valo-Mon"
    )
    .then(() => {
      console.log("DB Connected");
    });
};
