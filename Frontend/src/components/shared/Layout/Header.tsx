import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { HeartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { Fragment } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { User } from "../../../types/types";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="wrapper flex items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/home" className="w-auto">
            <img
              src="/logo.png"
              width={75}
              height={75}
              alt="logo"
              className="hidden md:block"
            />
          </Link>
          <Link to="/home" className="w-auto">
            <img
              src="/logo.png"
              width={65}
              height={65}
              alt="logo"
              className="flex md:hidden mr-3"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8 ml-10">
            <Link
              to="/home"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all relative group py-4 text-lg tracking-wide"
            >
              Jobs
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/posts"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all relative group py-4 text-lg tracking-wide"
            >
              Posts
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </nav>

          <nav className="flex items-center justify-center gap-6 md:hidden mr-16">
            <Link
              to="/home"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all relative group py-4 text-lg tracking-wide text-center"
            >
              Jobs
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/posts"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all relative group py-4 text-lg tracking-wide text-center"
            >
              Posts
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </nav>
        </div>

        {user?._id ? (
          <>
            <div className="flex items-center gap-4">
              <Link
                to="/favorite"
                className="relative rounded-full p-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <HeartIcon className="h-7 w-7" aria-hidden="true" />
              </Link>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="relative rounded-full p-1 text-gray-600 hover:text-gray-900 transition-colors">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="h-7 w-7" aria-hidden="true" />
                  </MenuButton>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <MenuItem>
                        <Link
                          to="/upload-resume"
                          className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          Profile
                        </Link>
                      </MenuItem>
                      {(user?.role === "admin" ||
                        user?.role === "recruiter") && (
                        <MenuItem>
                          <Link
                            to={
                              user.role === "admin"
                                ? "/admin/user"
                                : "/admin/applications"
                            }
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            Dashboard
                          </Link>
                        </MenuItem>
                      )}

                      <MenuItem>
                        <Link
                          to="/applies"
                          className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          My Applications
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={logoutHandler}
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                        >
                          Sign out
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
