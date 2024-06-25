import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoutes = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

ProtectedRoutes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default ProtectedRoutes;
