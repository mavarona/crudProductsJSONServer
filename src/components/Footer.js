import React from "react";
import PropTypes from "prop-types";

const Footer = ({ data }) => {
  return <p className="mt-4 p2 text-center">{data}</p>;
};

Footer.propTypes = {
  data: PropTypes.string.isRequired
};

export default Footer;
