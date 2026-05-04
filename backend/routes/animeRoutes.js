import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  fetchAnimeByGenre,
  searchAnime,
  getAnimeDetails,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
  toggleLike,
  getRecommendations
} from "../controllers/animeController.js";

const router = express.Router();


router.get("/genre/:genre", fetchAnimeByGenre);
router.get("/search", searchAnime);
router.get("/details/:id", getAnimeDetails);


router.get("/recommendations", authMiddleware, getRecommendations);

router.post("/watchlist", authMiddleware, addToWatchlist);
router.delete("/watchlist/:animeId", authMiddleware, removeFromWatchlist);
router.get("/watchlist", authMiddleware, getWatchlist);

router.post("/like", authMiddleware, toggleLike);

export default router;