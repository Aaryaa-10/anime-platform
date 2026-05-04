import User from "../models/User.js";

import {
  fetchAnimeByGenreService,
  searchAnimeService,
  getAnimeDetailsService
} from "../services/animeService.js";



export const fetchAnimeByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const { page = 1 } = req.query;

    const animeList = await fetchAnimeByGenreService(genre, page);

    const formatted = animeList.map(anime => ({
      animeId: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.image_url,
      rating: anime.score,
      genre: genre
    }));

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const searchAnime = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const animeList = await searchAnimeService(q);

    const formatted = animeList.map((anime) => ({
      animeId: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.image_url,
      rating: anime.score
    }));

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getAnimeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const anime = await getAnimeDetailsService(id);

    res.json({
      animeId: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.image_url,
      rating: anime.score,
      episodes: anime.episodes,
      synopsis: anime.synopsis
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const addToWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const exists = user.watchlist.find(
      (anime) => anime.animeId === req.body.animeId
    );

    if (exists) {
      return res.status(400).json({ message: "Already in watchlist" });
    }

    user.watchlist.push(req.body);
    await user.save();

    res.json(user.watchlist);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const removeFromWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.watchlist = user.watchlist.filter(
      (anime) => anime.animeId !== req.params.animeId
    );

    await user.save();

    res.json(user.watchlist);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.watchlist);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const toggleLike = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const exists = user.likedAnime.find(
      (anime) => anime.animeId === req.body.animeId
    );

    if (exists) {
      user.likedAnime = user.likedAnime.filter(
        (anime) => anime.animeId !== req.body.animeId
      );
    } else {
      user.likedAnime.push(req.body);
    }

    await user.save();

    res.json(user.likedAnime);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.watchlist.length) {
      return res.json([]);
    }

   
    const genreCount = {};

    user.watchlist.forEach(anime => {
      const g = anime.genre;
      genreCount[g] = (genreCount[g] || 0) + 1;
    });

    
    const sortedGenres = Object.keys(genreCount).sort(
      (a, b) => genreCount[b] - genreCount[a]
    );

   
    const topGenres = sortedGenres.slice(0, 2);

    let recommendations = [];

 
    for (let genre of topGenres) {
      const animeList = await fetchAnimeByGenreService(genre);

      const formatted = animeList.map(anime => ({
        animeId: anime.mal_id,
        title: anime.title,
        image: anime.images.jpg.image_url,
        rating: anime.score,
        genre: genre
      }));

      recommendations = [...recommendations, ...formatted];
    }

    
    const watchlistIds = user.watchlist.map(a => a.animeId);

    const filtered = recommendations.filter(
      anime => !watchlistIds.includes(String(anime.animeId))
    );

    
    res.json(filtered.slice(0, 20));

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};