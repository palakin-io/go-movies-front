import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Movies = ()=> {
    const [movies, setMovies] =  useState([]);

    useEffect(() => {
        // const headers = new Headers();
        // headers.append("Content-Type", "application/json");
        // axios({ Algun problema con los headers aca
        //     url: 'http://localhost:8080/movies',
        //     method: "GET",
        //     headers: headers
        // }).then((response) =>{
        //     console.log(response);
        //     setMovies(response.data);
        // }).catch(err => {
        //     console.log(err);
        // })

        const fetchData = async () => {
            const headers = {
                'Content-Type': 'application/json',
            };
            try {
                //changing this to just /movies would work addding a proxy on packe.json to localhost:8080(port of the db)
              const response = await axios.get('http://localhost:8080/movies', {headers});
              setMovies(response.data);
            } catch (error) {
              console.log(error);
            }
        };
      
        fetchData();

        // const headers = new Headers();
        // headers.append("Content-Type", "application/json");

        // const requestOptions = {
        //     method: "GET",
        //     headers: headers,
        // }

        // fetch(`http://localhost:8080/movies`, requestOptions)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setMovies(data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
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
                                <td>{m.release_date}</td>
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