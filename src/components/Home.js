import { Link } from "react-router-dom";
import ticket from "./../images/001689a8cd27f899c4583111c113454a.jpg";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="text-center">
        <h2>Find a Movie To watch tonight</h2>
        <hr></hr>
        <Link to='/movies'>
          <img src={ticket} alt="movies" className="img-thumbnail f-alch"></img>
        </Link>
      </div>
    </>
  );
};

export default Home;
