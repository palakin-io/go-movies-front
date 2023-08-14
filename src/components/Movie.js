import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Movie = ()=> {
    const [movie, setMovie] = useState({});
    const [aniPic, setPic] = useState("");
    let {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                'Content-Type': 'application/json',
            };
            try {
              const response = await axios.get(`http://localhost:8080/movies/${id}`, {headers});
              setMovie(response.data);
            } catch (error) {
              console.log(error);
            }
        };

        const fetchAni = async (id) => {
            let randomNum = Math.floor(Math.random() * 6)
            console.log(randomNum);
            try {
                const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/pictures`);
                let aniArray = response.data.data;
                setPic(aniArray[randomNum].jpg.image_url)
            } catch (error) {
                console.log(error);
            }
        }
        
        if (movie.image) {
            fetchAni(movie.image);
        }
        fetchData();
    }, [id, movie.image])

    if (movie.genres) {
        movie.genres = Object.values(movie.genres);
    } else {
        movie.genres = [];
    }

    return(
        <>
            <div>
                <h2>Movie: {movie.title}</h2>
                <small><em>{movie.release_date}, {movie.episodes} episodes, Rating: {movie.rating}</em></small>
                <hr></hr>
                {movie.genres.map((g) => (
                    <span key={g.genre} className="badge bg-secondary me-2">{g.genre}</span>
                ))}
                <hr></hr>
                {movie.image !== "" && 
                    <div className="mb-3">
                        <img src={aniPic} alt="poster" className="img-thumbnail" />
                    </div>
                }
                <p>{movie.description}</p>
            </div>
        </>
    )
}

export default Movie;