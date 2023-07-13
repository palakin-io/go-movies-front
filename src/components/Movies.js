import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Movies = ()=> {
    const [movies, setMovies] =  useState([]);

    useEffect(() => {
        let movieList = [
            {
                id: 1,
                title: "Full Metal Alchemist Brotherhood",
                releaseDate: "2010-04-07",
                episodes: 64,
                rating: "10",
                description: "some long description"
            },
            {
                id: 2,
                title: "Fruits Basket",
                releaseDate: "2019-04-12",
                episodes: 60,
                rating: "9",
                description: "some long description"
            },
        ];
        setMovies(movieList);
    }, [])


    return(
        <>
            <div>
                <h2>Movies</h2>
                <hr></hr>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Release Date</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((m) =>(
                            <tr key={m.id}>
                                <td>
                                    <Link to={`/movies/${m.id}`}>{m.title}</Link>
                                </td>
                                <td>{m.releaseDate}</td>
                                <td>{m.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Movies;