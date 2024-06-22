import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Navbar.css";
export function Navbar() {
  const { user, logOut, loading, userRole } = useAuth();
  return (
    <div>
      <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-blue-600 text-sm py-3 md:py-0">
        <nav
          className="relative max-w-[85rem] w-full mx-auto px-2 md:flex md:items-center md:justify-between md:px-1 lg:px-3"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <Link
              className="flex-none text-xl font-semibold text-white"
              to="/"
              aria-label="Brand"
            >
              Abacus News
            </Link>
            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-9 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-white/20 text-white hover:border-white/40 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-end py-2 md:py-0 md:ps-7">
              <NavLink
                to="/"
                end
                className="py-3 ps-px md:px-2 font-medium text-white/80 hover:text-white md:block"
              >
                Home
              </NavLink>
              {user ? (
                <NavLink
                  to="/add-article"
                  className="py-3 ps-px md:px-2 font-medium text-white/80 hover:text-white md:block"
                >
                  Add Articles
                </NavLink>
              ) : (
                ""
              )}
              <NavLink
                to="/all-articles"
                className="py-3 ps-px md:px-2 font-medium text-white/80 hover:text-white md:block"
              >
                All Articles
              </NavLink>
              {user ? (
                <NavLink
                  to="/subscribe"
                  className="py-3 ps-px md:px-2 font-medium text-white/80 hover:text-white md:block"
                >
                  Subscription
                </NavLink>
              ) : (
                ""
              )}
              {userRole === "admin" ? (
                <Link
                  className="py-3 ps-px md:px-2 font-medium text-white/80 hover:text-white md:block"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              ) : (
                ""
              )}
              {user ? (
                <>
                  <NavLink
                    to="/my-articles"
                    className="py-3 ps-px md:px-2 font-medium text-white/80 hover:text-white md:block"
                  >
                    My Articles
                  </NavLink>
                  <NavLink
                    className="py-3 ps-px md:px-2 font-medium text-white/80 hover:text-white md:block"
                    to="/premium"
                  >
                    Premium Articles
                  </NavLink>
                </>
              ) : (
                ""
              )}
              {loading ? (
                "Loading..."
              ) : user ? (
                <Link
                  onClick={logOut}
                  className="py-3 ps-px md:px-2 font-medium text-white/80 hover:text-white"
                  to="/"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="py-3 ps-px md:px-2 font-medium text-white/80 hover:text-white"
                >
                  Login
                </Link>
              )}
              {user ? (
                ""
              ) : (
                <NavLink
                  className="py-3 ps-px md:px-2 font-medium text-white/80 hover:text-white"
                  to="/register"
                >
                  Register
                </NavLink>
              )}
              {user ? (
                <Link to="/profile" className="cursor-pointer" title="profile">
                  <img
                    className="h-7 w-7 rounded-full"
                    src={`${
                      user?.photoURL ||
                      "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png"
                    }`}
                    alt="profile"
                    title={`${user?.displayName || "Not Found"}`}
                  />
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
