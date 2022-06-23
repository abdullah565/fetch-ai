import React from "react";
import "./skeletonCard.scss";

const SkeletonCard = () => {
  return (
    <div className="fa-skeleton-card">
      <span className="skeleton"></span>
      <span className="skeleton"></span>
    </div>
  );
};

export default SkeletonCard;
