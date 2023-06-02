import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { useContext } from "react";
// import { UserContext } from "../../userContext";
const PrivateRoute = () => {
  // const {token, isLoggedIn} = useContext(UserContext)
  const authToken = Cookies.get("token");
  return (
    // token && isLoggedIn ? <Outlet /> : <Navigate to="/login" />
    authToken ? <Outlet /> : <Navigate to="/login" />
  );
};
export default PrivateRoute;
