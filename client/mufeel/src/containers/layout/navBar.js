import React, { useState } from "react";
import PropTypes from "prop-types";
import NavigationBar from "../../components/layout/navigationBar";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";

/**
 * @author
 * @function Navbar
 **/

const Navbar = ({ auth, logoutUser }) => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    logoutUser();
  };
  const closeMobileMenu = () => {
    setClick(false);
  };

  return (
    <NavigationBar
      auth={auth.isAuthenticated}
      handleClick={handleClick}
      handleLogOut={handleLogOut}
      closeMobileMenu={closeMobileMenu}
      click={click}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
