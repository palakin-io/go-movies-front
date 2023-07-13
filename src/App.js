import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import Alert from './components/Alert';


function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertClassname, setAlertClass] = useState("d-none");

  const navigate = useNavigate();
  const logOut = () => {
    setJwtToken("");
    navigate("/");
  };

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
          <Outlet context={{jwtToken, setJwtToken, setAlertClass, setAlertMsg}}></Outlet>
        </div>
      </div>
    </div>
  );
}

export default App;
