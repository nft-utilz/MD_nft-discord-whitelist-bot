import express from "express";
const router = express.Router();

import { getWhiteList, createWhiteList } from "../controllers/user";
import auth from "../middleware/auth";

router.get("/", auth, getWhiteList);
router.patch("/:discord_id", auth, createWhiteList);

export default router;
