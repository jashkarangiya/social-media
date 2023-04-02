import { Express, Router } from "express";
import {get } from "mongoose";
import {
    getUser,
    getUserFriends,
    addRemoveFriends,


} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

// Read
router.get(":/id", verifyToken, getUser);
router.get(":/id/friends", verifyToken, getUserFriends);

// Update:
router.patch(":/id/friendId", verifyToken, addRemoveFriends);

export default router;