import { Tooltip } from "antd";
import useAuth from "../hooks/useAuth";

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
            {user?.email ? (
              <div className="flex justify-center items-center gap-2">
                <Tooltip title={user.displayName} placement="bottom">
                  <img
                    src={user.photoURL}
                    alt=""
                    className="h-10 rounded-full cursor-pointer"
                  />
                </Tooltip>
                <button
                  onClick={() => logOut()}
                  className="border border-black hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black rounded-lg px-4 py-1.5"
                >
                  Logout
                </button>
              </div>
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
