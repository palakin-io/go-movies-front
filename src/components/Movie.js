import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Movie = ()=> {
    const [movie, setMovie] = useState({});
    let {id} = useParams();

    useEffect(() => {
        let myMovie = {
            id: 1,
            title: "Full Metal Alchemist Brotherhood",
            releaseDate: "2010-04-07",
            episodes: 64,
            rating: "10",
            description: "some long description"
        }
        setMovie(myMovie);
    }, [id])

    return(
        <>
            <div>
                <h2>Movie: {movie.title}</h2>
                <small><em>{movie.releaseDate}, {movie.episodes} episodes, Rating: {movie.rating}</em></small>
                <hr></hr>
                <p>{movie.description}</p>
            </div>
        </>
    )
}

export default Movie;