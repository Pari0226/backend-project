import mongoose from "mongoose";
import APP_CONFIG from "../utils/config.utils.js";

const connectDB = async () => {
    try {
        const mongooseConnection = await mongoose.connect(
            `${APP_CONFIG.DB_URI}/${APP_CONFIG.DB_NAME}`
        );

        console.log("Database connected successfully!");
        console.log("DB connection host is:", mongooseConnection.connection.host);

    } catch (error) {
        console.log("ERROR WHILE CONNECTING WITH DATABASE:", error);
        process.exit(1);
    }
};

export default connectDB;