import { RootState } from "../../../redux/store";
import Loader from "../../Loader";

import Header from "./Header";
import { useSelector } from "react-redux";
interface props {
  children: JSX.Element | JSX.Element[];
}
const Layout = ({ children }: props) => {
  const { user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );
  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen">
      <Header user={user} />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
