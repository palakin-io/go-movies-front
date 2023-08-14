import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Input from "./form/Input";
import Select from "./form/Select";
import TextArea from "./form/TextArea";
import axios from "axios";
import CheckBox from "./form/Checkbox";


const EditMovie = ()=> {
    const navigate = useNavigate();
    const {jwtToken} = useOutletContext();

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const hasError = (key) => {
        return errors.indexOf(key) !== -1;
    }
    const [movie, setMovie] = useState({
        id: 0,
        title: "",
        release_date: "",
        episodes: "",
        image: "",
        rating: "",
        description: "",
        genres: [],
        genres_array: [Array(13).fill(false)]
    })

    const ratings = [
        {id: "1", value:1},
        {id: "2", value:2},
        {id: "3", value:3},
        {id: "4", value:4},
        {id: "5", value:5},
        {id: "6", value:6},
        {id: "7", value:7},
        {id: "8", value:8},
        {id: "9", value:9},
        {id: "10", value:10},
    ]

    //get id from url
    let {id} = useParams();
    if (id === undefined) {
        id = 0;
    }

    const fetchGenress = useCallback(async() => {
        const headers = {
            'Content-Type': 'application/json',
        };
        try {
          const response = await axios.get(`http://localhost:8080/genres`, {headers});
          let genres = response.data
          const checks = [];
          genres.forEach(g => {
            checks.push({id: g.id, checked: false, genre: g.genre});
          });
          setMovie(m => ({
            ...movie,
            genres: checks,
            genres_array: [],
          }));
        } catch (error) {
          console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const saveMovie = useCallback(async() => {
        try {
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`,
            };
      
            const url = `http://localhost:8080/admin/movies/${id}`;
            debugger;
      
            const requestBody = movie;
            //we need to conver the values in json for release date to date and episodes to int

            requestBody.release_date = new Date(movie.release_date);
            requestBody.episodes = parseInt(movie.episodes, 10)
            requestBody.rating = parseInt(movie.rating, 10)
      
            const method = movie.id > 0 ? 'PATCH' : 'PUT';
      
            const response = await axios({
              url,
              method,
              headers,
              withCredentials: true,
              data: requestBody,
            });
      
            const data = response.data;
      
            if (data.error) {
              console.log(data.error);
            } else {
              navigate('/admin');
            }
          } catch (error) {
            console.log(error);
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const editMovie = useCallback(async() => {
        try {
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`,
            };
      
            const response = await axios.get(`http://localhost:8080/admin/movies/${id}`, {headers});
            if (response.status !== 200) {
                setError("invalid response " + response.status);
            }
            const data = response.data;
  
            data.movie.release_date = new Date(data.movie.release_date).toISOString().split('T')[0];
            
            const checks = [];

            data.genres.forEach(g => {
                if (data.movie.genres_array.indexOf(g.id) !== 1) {
                    checks.push({id: g.id, checked: false, genre: g.genre});
                } else {
                    checks.push({id: g.id, checked: true, genre: g.genre});
                }
            });
            debugger


            
            setMovie({
                ...data.movie,
                genres: checks,
            })

            let asda = movie
            
          } catch (error) {
            console.log(error);
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    useEffect(() => {
        if(jwtToken === "") {
            navigate("/login");
            return;
        }
        if (id === 0) {
            //adding movie
            setMovie({
                id: 0,
                title: "",
                release_date: "",
                episodes: "",
                image: "",
                rating: "",
                description: "",
                genres: [],
                genres_array: [Array(13).fill(false)]
            })
            fetchGenress();
        } else {
            //edit movie
            editMovie(); 
        }
    }, [jwtToken, navigate, id, fetchGenress, editMovie]);

    const handleSubmit = (event) => {
        event.preventDefault();

        let errors = [];
        let required = [
            { field: movie.title, name: "title"},
            { field: movie.release_date, name: "release_date"},
            { field: movie.episodes, name: "episodes"},
            { field: movie.image, name: "image"},
            { field: movie.description, name: "description"},
            { field: movie.rating, name: "rating"},
        ]

        required.forEach(function (obj) {
            if (obj.field === "") {
                errors.push(obj.name);
            }
        })

        if (movie.genres_array.length === 0) {
            alert("must choose at least one genre")
            errors.push("genres")
        }

        setErrors(errors);
        if (errors.length > 0) {
            return false;
        }
        
        saveMovie();
    }

    const handleChange = () => (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setMovie({
            ...movie,
            [name]: value,
        })
    }

    const handleCheck = (e , position) => {
        console.log("handleCheck called")
        console.log("value: ", e.target.value);
        console.log("checked is ", e.target.checked);
        console.log("positions is", position);

        let tmpArr = movie.genres;
        tmpArr[position].checked = !tmpArr[position].checked

        let tmpIDs = movie.genres_array;
        if (!e.target.checked) {
            tmpIDs.splice(tmpIDs.indexOf(e.target.value))
        } else {
            tmpIDs.push(parseInt(e.target.value, 10))
        }

        setMovie({
            ...movie,
            genres_array: tmpIDs,
        })
    }

    return(
        <>
            <div>
                <h2>Add/Edit Movie</h2>
                <hr></hr>

                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={movie.id} id="id"></input>
                    <Input title={"Title"}
                        className={"form-control"}
                        id={""}
                        type={"text"}
                        name={"title"}
                        placeholder={""}
                        onChange={handleChange("title")}
                        value={movie.title}
                        errorDiv={hasError("title") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a title"}
                        >
                    </Input>

                    <Input title={"Release Date"}
                        className={"form-control"}
                        id={""}
                        type={"date"}
                        name={"release_date"}
                        placeholder={""}
                        onChange={handleChange("release_date")}
                        value={movie.release_date}
                        errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a release date"}
                        >
                    </Input>

                    <Input title={"episode"}
                        className={"form-control"}
                        id={""}
                        type={"number"}
                        name={"episodes"}
                        placeholder={""}
                        onChange={handleChange("episodes")}
                        value={movie.episodes}
                        errorDiv={hasError("episodes") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a number of episodes aired"}
                        >
                    </Input>

                    <Input title={"Image ID"}
                        className={"form-control"}
                        id={""}
                        type={"text"}
                        name={"image"}
                        placeholder={""}
                        onChange={handleChange("image")}
                        value={movie.image}
                        errorDiv={hasError("image") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter the movie id"}
                        >
                    </Input>

                    <Select
                        title={"Rating"}
                        name={"rating"}
                        options={ratings}
                        value={movie.rating}
                        onChange={handleChange("rating")}
                        placeholder={"Choose"}
                        errorMsg={"Please choose"}
                        errorDiv={hasError("rating") ? "text-danger" : "d-none"}
                    >

                    </Select>

                    <TextArea
                        title={"description"}
                        name={"description"}
                        value={movie.description}
                        rows={"3"}
                        onChange={handleChange("description")}
                        errorMsg={"Please enter a description"}
                        errorDiv={hasError("description") ? "text-danger" : "d-none"}
                    >

                    </TextArea>

                    <hr></hr>
                    <h3>Genres</h3>
                    {movie.genres && movie.genres.length > 1 &&
                        <>
                            {Array.from(movie.genres).map((g, index) => 
                                <CheckBox
                                    title={g.genre}
                                    name={"genre"}
                                    key={index}
                                    id={"genre-" + index}
                                    onChange={(event) => handleCheck(event, index)}
                                    value={g.id}
                                    checked={movie.genres[index].checked}
                                ></CheckBox>
                            )}
                        </>
                    }

                    <hr></hr>
                    <button className="btn btn-primary">Save</button>
                    
                </form>
            </div>
        </>
    )
}

export default EditMovie;