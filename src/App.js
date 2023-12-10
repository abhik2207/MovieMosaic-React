import React, { useEffect, useState } from 'react'
import MovieList from './components/MovieList'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieListHeading from './components/MovieListHeading'
import SearchBox from './components/SearchBox'
import AddFavourites from './components/AddFavourites'
import RemoveFavourites from './components/RemoveFavourites'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=c8efc2c1`;
    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.Search) {
      setMovies(responseJSON.Search);
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const favouritesMovies = JSON.parse(localStorage.getItem('moviemosaic-favourites'));
    setFavourites(favouritesMovies);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('moviemosaic-favourites', JSON.stringify(items));
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
    toast.success('Movie added to Favourites!', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
    toast.success('Movie removed from Favourites!', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div className='container-fluid movie-app'>
      <ToastContainer />
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} AddFavourites={AddFavourites} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className='row'>
        <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} AddFavourites={RemoveFavourites} />
      </div>
    </div>
  )
}

export default App;
