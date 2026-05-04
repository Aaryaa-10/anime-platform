import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/home.css"; // reuse grid layout

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  
  const fetchWatchlist = async () => {
    try {
      const res = await API.get("/anime/watchlist");
      setWatchlist(res.data);
    } catch (err) {
      console.log(err);
    }
  };
 const handleRemove = async (animeId) => {
    try {
      await API.delete(`/anime/watchlist/${animeId}`);

      // update UI instantly
      setWatchlist((prev) =>
        prev.filter((anime) => anime.animeId !== animeId)
      );

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className="home">
      <h2>My Watchlist</h2>

      <div className="anime-grid">
        {watchlist.map((anime) => (
          <div key={anime.animeId} className="card">
            <img src={anime.image} alt={anime.title} />

            <h4>{anime.title}</h4>

            <p>Rating: {anime.rating}</p>

            <button onClick={() => handleRemove(anime.animeId)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;