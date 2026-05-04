import { useEffect, useState } from "react";
import API from "../services/api";
import AnimeCard from "../components/AnimeCard";
import "../styles/home.css";

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [genre, setGenre] = useState("action");

  
  const fetchAnime = async (selectedGenre) => {
    try {
      const res = await API.get(`/anime/genre/${selectedGenre}`);
      setAnimeList(res.data);
    } catch (err) {
      console.log(err);
    }
  };
const fetchRecommendations = async () => {
    try {
      const res = await API.get("/anime/recommendations");
      setRecommendations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnime(genre);
    fetchRecommendations();
  }, [genre]);

 return (
  <div className="home">

   
    {recommendations.length > 0 && (
      <>
        <h2>Recommended For You</h2>
        <div className="anime-grid">
          {recommendations.map((anime) => (
            <AnimeCard key={anime.animeId} anime={anime} />
          ))}
        </div>
      </>
    )}

   
    <h2>{genre.toUpperCase()} Anime</h2>

    <div className="genre-buttons">
      <button onClick={() => setGenre("action")}>Action</button>
      <button onClick={() => setGenre("horror")}>Horror</button>
      <button onClick={() => setGenre("romance")}>Romance</button>
      <button onClick={() => setGenre("comedy")}>Comedy</button>
    </div>

    <div className="anime-grid">
      {animeList.map((anime) => (
        <AnimeCard key={anime.animeId} anime={anime} />
      ))}
    </div>

  </div>
);
};

export default Home;