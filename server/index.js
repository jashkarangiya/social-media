import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
// import { connections } from "./db/conn.js"


/* CONFIGURATIONS */
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const PORT = process.env.PORT || 6001;

const app = express();
app.use(express.json());
// app.use(connections());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */

// mongoose.connect(process.env.MONGO_URL)
//     .then(() => {
//         app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

//         /* ADD DATA ONE TIME */
//         // User.insertMany(users);
//         // Post.insertMany(posts);
//     })
//     .catch((error) => console.log(`${error} did not connect`));

const MONGO_URL = "mongodb://0.0.0.0:27017/ConnectMore"

const connections = async(req, res) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URL)
        .then(console.log(`DB Connection is success!`))
        .catch((error) => {
            console.log(`DB connection is Failed!`)
            console.log(error);
        })
}

connections()

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));