import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="topnav">
      <Link to={"/"}>Home</Link>
      <Link to="/ArtistSearchContainer">Artist Search</Link>
      <Link to="/ArtistList">Artist List</Link>
      <Link to="/RehearsalList">Rehearsal List</Link>
    </div>
  );
};

export default Nav;