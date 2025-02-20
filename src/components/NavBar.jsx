import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="topnav">
      {/* <Link to={"/"}>Home</Link> */}
      <Link to="/">Randomizer</Link>
      {/* <Link to="/ArtistList">Artist List</Link>
      <Link to="/SongRandomizer">NSB Song Randomizer</Link> */}
    </div>
  );
};

export default Nav;