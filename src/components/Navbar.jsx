import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

const routes = [
  { name: "Home", href: "#", isActive: true },
];

const NavMenu = ({ routes }) => (
  <ul className="flex justify-center items-center h-full">
    {routes.map((route, i) => (
      <li key={i}>
        <a
          className={`px-4 ${
            route.isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
          }`}
          href={route.href}
        >
          {route.name}
        </a>
      </li>
    ))}
  </ul>
);

NavMenu.propTypes = {
  routes: PropTypes.array.isRequired,
};

const Navbar = () => {
  const { logInGoogle, user, logOut } = useAuth();
  return (
    <div className="py-4 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative">
      <nav className="max-w-7xl mx-auto">
        <div className="container px-4">
          <div className="flex items-center justify-between">
            <a className="font-black text-3xl" href="#!">
              TaskFlow
            </a>
            <NavMenu routes={routes} />
            {user?.email ? (
              <button
                onClick={() => logOut()}
                className="border border-black hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black rounded-lg px-4 py-1.5"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={logInGoogle}
                className="border border-black hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black rounded-lg px-4 py-1.5"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
