import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
  animeId: String,   // from API (like Jikan/MAL)
  title: String,
  image: String,
  genre: String,
  rating: Number
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ""
  },
  likedAnime: [
    {
      type: Number
    }
  ],
 watchlist: [
  {
    animeId: String,
    title: String,
    image: String,
    genre: String,
    rating: Number
  }
]
}, { timestamps: true });

export default mongoose.model("User", userSchema);