const { connect } = require("mongoose");

async function connectDB() {
    try {
        await connect(process.env.MONGODB_URL);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Connction failed", error);
        process.exit(1);
    }
}

module.exports = connectDB;
