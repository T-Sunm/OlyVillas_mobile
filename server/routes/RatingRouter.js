import express from "express";
import { createRating, getAllRatingbyauthorUser, getRating, getRatingByResidency } from "../controller/Rating.js";
const router = express.Router();

router.post('/createRating', createRating)
router.post('getRating', getRating)
router.post('/getAllRatingbyUser', getAllRatingbyauthorUser)
router.get('/getRatingByResidency', getRatingByResidency)

export { router as ratingRouter }