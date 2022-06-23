import React from "react";
import { Link } from "react-router-dom";
import "./primaryButton.scss";

const PrimaryButton = ({
  size,
  text,
  rounded,
  outlined,
  btnBG,
  spacingClasses,
  type,
  additionalClass,
  hasIcon,
  reverse,
  icon,
  isLink,
  href,
  disabled,
  onClickHandler,
}) => {
  return (
    <>
      {isLink ? (
        <Link
          to={href}
          type={type}
          id="fa-btn"
          className={`fa-btn-link btn d-inline-flex align-items-center ${
            reverse ? "flex-row-reverse" : ""
          } ${additionalClass} ${size} ${btnBG} ${spacingClasses} ${
            outlined ? "fa-btn-outlined" : ""
          } ${rounded ? "fa-btn-rounded" : ""}`}
        >
          {hasIcon && (
            <span className={reverse ? "fa-ml-8" : "fa-mr-8"}>
              {icon !== "" && icon}
            </span>
          )}

          <span>{text}</span>
        </Link>
      ) : (
        <button
          type={type}
          id="fa-btn"
          disabled={disabled}
          onClick={onClickHandler}
          className={`btn d-inline-flex align-items-center ${
            reverse ? "flex-row-reverse" : ""
          } ${additionalClass} ${size} ${btnBG} ${spacingClasses} ${
            outlined ? "fa-btn-outlined" : ""
          } ${rounded ? "fa-btn-rounded" : ""}`}
        >
          {hasIcon && (
            <span className={reverse ? "fa-ml-8" : "fa-mr-8"}>
              {icon !== "" && icon}
            </span>
          )}

          <span>{text}</span>
        </button>
      )}
    </>
  );
};

export default PrimaryButton;
