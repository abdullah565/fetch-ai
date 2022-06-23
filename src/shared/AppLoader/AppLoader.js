import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "./appLoader.scss";

const AppLoader = () => {
  return (
    <div className="fa-loader-wrapper">
      <Loader type="Oval" color="#F89C26" height={100} width={100} />
    </div>
  );
};

export default AppLoader;
