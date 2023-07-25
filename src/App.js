import { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Alert from './components/Alert';


function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertClassname, setAlertClass] = useState("d-none");

  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();
  const logOut = async () => {
    // const requestOptions = {
    //   method: "GET",
    //   credentials: "include"
    // }

    // fetch(`http://localhost:8080/logout`, requestOptions).catch(error => {
    //   console.log("error logging out", error);
    // }).finally(() => {
    //   setJwtToken("");
    // })

    try {
      await axios.get('http://localhost:8080/logout', {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setJwtToken("");
      navigate("/");
      toggleRefresh(false);
    }
  };

  const toggleRefresh = useCallback((status) => {
    const fetchData = async () => {
      if (jwtToken === '') {
        try {
          const response = await axios.get('http://localhost:8080/refresh', {
            withCredentials: true,
          });
          const data = response.data;
          if (data.access_token) {
            setJwtToken(data.access_token);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (status) {
      let i = setInterval(() => {
        fetchData();
      }, 600000);
      console.log("turning on ticking");
      setTickInterval(i);
      console.log("sdasdsad");
    } else {
      console.log("turning off");
      console.log("turning off", tickInterval);
      setTickInterval(null);
      clearInterval(tickInterval);
    }
  }, [tickInterval, jwtToken])

  useEffect(() => {
    // if (jwtToken === ""){
    //   const requestOptions = {
    //     method: "GET",
    //     credentials: "include"
    //   }

    //   fetch(`http://localhost:8080/refresh`, requestOptions).then((response) => response.json()).then((data) => {
    //     if (data.access_token) {
    //       setJwtToken(data.access_token)
    //     }
    //   }).catch(error => {
    //     console.log(error);
    //   })
    // }
    const fetchData = async () => {
      if (jwtToken === '') {
        try {
          const response = await axios.get('http://localhost:8080/refresh', {
            withCredentials: true,
          });
          const data = response.data;
          if (data.access_token) {
            setJwtToken(data.access_token);
            toggleRefresh(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [jwtToken, toggleRefresh])

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go watch a movie</h1>
        </div>
        <div className="col text-end">
          {jwtToken === ""
          ? <Link to="/login"><span className="badge bg-success">Log in</span></Link>
          : <a href="#!" onClick={logOut}><span className="badge bg-danger">Log out</span></a>
          }
        </div>
        <hr className="mb-3"></hr>
      </div>
      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">Home</Link>
              <Link to="/movies" className="list-group-item list-group-item-action">Movies</Link>
              <Link to="/genres" className="list-group-item list-group-item-action">Genres</Link>
              {jwtToken !== "" &&
              <>
                <Link to="/admin/movie/0" className="list-group-item list-group-item-action">Add Movie</Link>
                <Link to="/admin" className="list-group-item list-group-item-action">Manage Catalogue</Link>
                <Link to="/graphql" className="list-group-item list-group-item-action">GraphQl</Link>
              </>
              }
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <Alert className={alertClassname} message={alertMsg}></Alert>
          <Outlet context={{jwtToken, setJwtToken, setAlertClass, setAlertMsg, toggleRefresh}}></Outlet>
        </div>
      </div>
    </div>
  );
}

export default App;
