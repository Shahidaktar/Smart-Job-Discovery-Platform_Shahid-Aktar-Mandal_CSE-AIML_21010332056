import {
  Dialog,
  DialogPanel,
  Menu,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  BriefcaseIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import Layout from "./Layout";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../redux/store";

interface AdminProps {
  children: JSX.Element | JSX.Element[];
}

const AdminLayout = ({ children }: AdminProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.userReducer);
  return (
    <Layout>
      <div className="bg-white">
        <div>
          <Transition show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <TransitionChild
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </TransitionChild>

              <div className="fixed inset-0 z-40 flex">
                <TransitionChild
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <DialogPanel className="relative flex w-full  max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    <div className="flex px-4 pb-2 pt-5 space-x-4">
                      <button
                        type="button"
                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                      {user?.role === "admin" ? (
                        <>
                          <div className="flex items-center space-x-1">
                            <NavLink
                              to="/admin/user"
                              className={({ isActive }) =>
                                isActive
                                  ? "bg-blue-100 flex gap-4 items-center p-4 rounded-lg justify-start text-blue-600 w-full"
                                  : "flex gap-4 items-center p-4 rounded-lg justify-start w-full"
                              }
                            >
                              <UserIcon
                                className="h-4 w-4 text-gray-900"
                                aria-hidden="true"
                              />
                              User
                            </NavLink>
                          </div>
                          <div className="flex items-center space-x-1">
                            <NavLink
                              to="/admin/job"
                              className={({ isActive }) =>
                                isActive
                                  ? "bg-blue-100 flex gap-4 items-center p-4 rounded-lg justify-start text-blue-600 w-full"
                                  : "flex gap-4 items-center p-4 rounded-lg justify-start w-full"
                              }
                            >
                              <BriefcaseIcon
                                className="h-4 w-4 text-gray-900"
                                aria-hidden="true"
                              />
                              Job
                            </NavLink>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <NavLink
                            to="/admin/applications"
                            className={({ isActive }) =>
                              isActive
                                ? "bg-blue-100 flex gap-4 items-center p-4 rounded-lg justify-start text-blue-600 w-full"
                                : "flex gap-4 items-center p-4 rounded-lg justify-start w-full"
                            }
                          >
                            <UserGroupIcon
                              className="h-4 w-4 text-gray-900"
                              aria-hidden="true"
                            />
                            Applicants
                          </NavLink>
                        </div>
                      )}
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Dialog>
          </Transition>

          <main className=" max-w-7xl px-1 sm:px-2 lg:px-2">
            <div className="flex items-baseline justify-between  border-gray-200 pb-6 ">
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  ></Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-1 mt-2 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <Squares2X2Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="p-2 ">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 ">
                <div className="space-y-6 py-1 hidden lg:block px-1">
                  {user?.role === "admin" ? (
                    <>
                      <SideLink
                        link="/admin/user"
                        label="User"
                        icon={<UserIcon className="h-6 w-6 text-gray-900" />}
                      />
                      <SideLink
                        link="/admin/job"
                        label="Job"
                        icon={
                          <BriefcaseIcon className="h-6 w-6 text-gray-900" />
                        }
                      />
                    </>
                  ) : (
                    <SideLink
                      link="/admin/applications"
                      label="Applicants"
                      icon={<UserGroupIcon className="h-6 w-6 text-gray-900" />}
                    />
                  )}
                </div>

                <div className="lg:col-span-3">{children}</div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLayout;

const SideLink = ({ link, label, icon }: any) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? "bg-blue-100 flex gap-4 items-center p-4 rounded-lg justify-start text-blue-600"
          : "flex gap-4 items-center p-4 rounded-lg justify-start"
      }
    >
      {icon}
      <p className="text-lg font-semibold max-lg:hidden">{label}</p>
    </NavLink>
  );
};
