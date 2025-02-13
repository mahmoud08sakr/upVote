import mongoose from "mongoose";


export const DbConnect = async () => {


    await mongoose.connect(process.env.DATABASE_URL).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log(err);
    });
}