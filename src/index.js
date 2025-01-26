import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./env"
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port : ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.log("MONGO DB connection failed  !!!", err);
    });
