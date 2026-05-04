import "../styles/card.css";
import { FaHeart, FaStar } from "react-icons/fa";
import API from "../services/api";

const AnimeCard = ({ anime }) => {

  const handleAddToWatchlist = async () => {
    try {
      await API.post("/anime/watchlist", {
        animeId: anime.animeId,
        title: anime.title,
        image: anime.image,
        genre: anime.genre,
        rating: anime.rating
      });

      console.log("Added to watchlist");

    } catch (err) {
      console.log("Error:", err.response?.data);
    }
  };

  return (
    <div className="card">
      
      <img src={anime.image} alt={anime.title} />

      <h4 className="title">{anime.title}</h4>

      <p className="rating">
        <FaStar className="icon-star" />
        {anime.rating}
      </p>

      <button className="watchlist-btn" onClick={handleAddToWatchlist}>
        <FaHeart className="icon-heart" />
        Add to Watchlist
      </button>

    </div>
  );
};

export default AnimeCard;