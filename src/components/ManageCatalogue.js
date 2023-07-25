import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

const ManageCatalogue = ()=> {
    const [movies, setMovies] =  useState([]);
    const {jwtToken} = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtToken,
            };
            try {
                //changing this to just /movies would work addding a proxy on packe.json to localhost:8080(port of the db)
              const response = await axios.get('http://localhost:8080/admin/movies', {headers});
              console.log(response.data);
              setMovies(response.data);
            } catch (error) {
              console.log(error);
            }
        };
      
        fetchData();
    }, [jwtToken, navigate])


    return(
        <>
            <div>
                <h2>Manage Catalogue</h2>
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
                                    <Link to={`admin/movies/${m.id}`}>{m.title}</Link>
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

export default ManageCatalogue;