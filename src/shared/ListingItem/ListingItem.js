import { useStoreActions } from "easy-peasy";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./listingItem.scss";

const ListingItem = ({ img, title, link, headerTitle }) => {
  const { setHeaderTitle } = useStoreActions((actions) => actions.menu);

  useEffect(() => {
    setHeaderTitle(headerTitle);
  }, []);
  return (
    <div className="fa-list-item fa-mb-24">
      <Link to={link}>
        <div className="fa-list-item-content">
          <img src={img} alt={title} />
          <div className="fa-list-item-text">
            <h5>{title} </h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
