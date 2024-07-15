import logo from './logo.svg';
import './App.css';
import { api } from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = async () => {

    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);

    } catch (err) {
      console.log("Error fetching movies:", err); 
    }

  }

  const getMovieData = async (movieId) => {

    try{
             
          const singleMovie = await api.get(`/api/v1/movies/${movieId}`);
          setMovies(singleMovie.data);
          setReviews(singleMovie.reviews);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);


  return (
    <div className="App">
    <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Revies/:movieId" element={<reviews getMovieData = {getMovieData} movie = {movie} reviews = {reviews} setReviews = {setReviews} />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
