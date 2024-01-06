import { NavLink, useNavigate } from "react-router-dom";
import "./MainNavigation.css";
import headerImg from "../assets/headerImg.jpg";

import { useSelector, useDispatch } from "react-redux";

const MainNavigation = () => {
  const auth = useSelector((state) => state.authReducer.auth);

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <h1 onClick={navigateHandler}>75 HARD</h1>
        <nav>
          <ul className="list">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                HomePage
              </NavLink>
            </li>
            {!auth && ( 
              <>
                <li>
                  <NavLink
                    to="/signUp"
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    signup
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/logIn"
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    login
                  </NavLink>
                </li>
              </>
            )}
            {auth && (
              <>
                <li>
                  <NavLink
                    to="/tasks"
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/prog"
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                  >
                    Progress
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainNavigation;
