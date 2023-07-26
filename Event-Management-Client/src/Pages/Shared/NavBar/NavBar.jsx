import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const NavBar = () => {
  const { user, logOut, role } = useAuth();
  console.log(role);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <ul className="flex items-center">
      <li>
        <Link to="/">Home</Link>
      </li>
      {/* <li><Link to="/instructors">Instructors</Link></li> */}
      {/* <li><Link to="/dashboard/dashboardPage">DashBoard</Link></li> */}

      {user ? (
        <div className="flex items-center">
          <li>
            <span>{user.displayName}</span>
          </li>
          <button onClick={handleLogOut} className="btn btn-ghost">
            LogOut
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
        </div>
      )}
    </ul>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* Navigation options */}
              {navOptions}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Event Management <br /> Services
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* Navigation options */}
            {navOptions}
          </ul>
        </div>
        <div className="navbar-end">
          {
            role == "admin" && <>
             <div><Link to="/manageusers">Manage Users</Link> </div>
             <div><Link to="/manageData">Manage Data</Link> </div>
            </>
          }
          {
            role == "organizer" && <>
             <div><Link to="/addData">Add Data</Link> </div>
             <div><Link to="/myData">My Data</Link> </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default NavBar;
