import React from 'react'

const MovieList = (props) => {
    const AddFavourites = props.AddFavourites;
    const defaultPoster = 'https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png';
    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='image-container d-flex justify-content-start m-3' key={index}>
                    {/* <img src={movie.Poster} alt="movie" /> */}
                    <img src={movie.Poster!=='N/A' ? movie.Poster : defaultPoster} alt="movie" />
                    <div onClick={()=>props.handleFavouritesClick(movie)} className="overlay d-flex align-items-center justify-content-center">
                        <AddFavourites />
                    </div>
                </div>
            ))}
        </>
    )
}

export default MovieList;
