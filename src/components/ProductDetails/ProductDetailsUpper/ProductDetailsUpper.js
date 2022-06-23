import React from "react";
import "./productDetailsUpper.scss";

import { useStoreState } from "easy-peasy";

import "react-lazy-load-image-component/src/effects/blur.css";

const ProductDetailsUpper = () => {
  const { menuItemDetails } = useStoreState((state) => state.menu);

  return (
    menuItemDetails.length > 0 && (
      <div className="fa-product-details-upper">
        <div className="fa-product-details-upper-img">
          <img
            width="100%"
            src={menuItemDetails[0].menu_item.image_url}
            alt={menuItemDetails[0].menu_item.name}
          />
        </div>
        <div className="fa-product-details-upper-text">
          <h1>{menuItemDetails[0].menu_item.name}</h1>
          <strong>
            CO<sub>2</sub> Footprint (kgCO<sub>2</sub>e) -{" "}
            {menuItemDetails[0].footprint.toFixed(2)}
          </strong>
          <p>{menuItemDetails[0].menu_item.description}</p>
          <div className="fa-product-details-tags">
            {menuItemDetails[0].ingredients[0].allergies.map(
              (allergy, index) => (
                <img
                  src={allergy.image_url}
                  alt="product verification"
                  key={index}
                />
              )
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetailsUpper;
