
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { FaSearch } from "react-icons/fa";
import avatarImg from "../../../assets/placeholder.jpg";

const NavBar = () => {
  const { user, logOut, role } = useAuth();
  console.log(role);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <nav className="bg-opacity-70 w-full p-4 bg-black text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <div className="lg:flex gap-3 items-center">
          {/* <img className="w-12 lg:w-20" src="./images/logo.png" alt="" /> */}
          <h3 className="text-3xl lg:text-4xl font-bold text-white">
            Eventease
          </h3>
        </div>

        {/* Navigation Links */}
        <ul className="hidden lg:flex space-x-8 text-lg font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About Us</Link>
          </li>
          {
            role == "admin" && <>
             <li><Link to="/manageusers">Manage Users</Link> </li>
             <li><Link to="/manageData">Manage Data</Link> </li>
            </>
          }
          {
            role == "organizer" && <>
             <li><Link to="/addData">Add Events</Link> </li>
             <li><Link to="/myData">Events List</Link> </li>
            </>
          }
          {
            role == "user" && <>
             <li><Link to="/selectedData">My bookings</Link> </li>
            </>
          }
        </ul>

        {user ? (
        <div className="flex items-center ">
           <img
              className="rounded-full mx-2"
              src={user && user.photoURL ? user.photoURL : avatarImg}
              title={user.displayName}
              height="40"
              width="40"
            />
          <li className="list-none">
            <span>{user.displayName}</span>
          </li>
          <button onClick={handleLogOut} className="btn btn-ghost text-lg font-medium">
            LogOut
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login" className="text-lg font-medium">Login</Link>
        </div>
      )}

         {/* Search Input */}
         <div className="flex items-center border-2 bg-white text-black rounded-full px-7 ">
          <input
            className="text-base text-[#12121266] border-0 outline-none p-3 rounded-full"
            type="text"
            placeholder="Search here"
          />
          <FaSearch></FaSearch>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
