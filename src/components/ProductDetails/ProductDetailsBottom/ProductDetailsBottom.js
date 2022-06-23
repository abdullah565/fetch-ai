import React, { Fragment, useState, useEffect } from "react";
import PrimaryButton from "../../../shared/Buttons/PrimaryButton/PrimaryButton";
import "./productDetailsBottom.scss";

import { useStoreState } from "easy-peasy";

const ProductDetailsBottom = ({ currentParam }) => {
  const { menuItemDetails } = useStoreState((state) => state.menu);
  const [suppliers, setSuppliers] = useState([]);
  const [origins, setOrigins] = useState([]);

  useEffect(() => {
    if (menuItemDetails.length > 0) {
      filterSupplierEntries();
      filterOriginsEntries();
    }
  }, [menuItemDetails]);

  const filterSupplierEntries = () => {
    menuItemDetails[0].ingredients.map((ingredient) => {
      if (!suppliers.includes(ingredient.supplier.name)) {
        suppliers.push(ingredient.supplier.name);
      }
    });
  };
  const filterOriginsEntries = () => {
    menuItemDetails[0].ingredients.map((ingredient) => {
      if (!origins.includes(ingredient.origin.name)) {
        origins.push(ingredient.origin.name);
      }
    });
  };

  return (
    menuItemDetails.length > 0 && (
      <div className="fa-product-details-desc">
        <div>
          <div className="fa-product-details-ingredients fa-pd-content">
            <h2>Individual Ingredients</h2>
            <p>
              {menuItemDetails[0].ingredients.map((ingredient, index) => (
                <Fragment key={index}>
                  {ingredient.name}
                  {index === menuItemDetails[0].ingredients.length - 1
                    ? ""
                    : ", "}
                </Fragment>
              ))}
            </p>
          </div>
          <div className="fa-product-details-suppliers fa-pd-content">
            <h2>Suppliers</h2>
            <p>
              {suppliers &&
                suppliers.map((supplier, index) => (
                  <Fragment key={index}>
                    {supplier}
                    {index === suppliers.length - 1 ? "" : ", "}
                  </Fragment>
                ))}
            </p>
          </div>
          <div className="fa-product-details-origin fa-pd-content">
            <h2>Origin of Ingredients</h2>
            <p>
              {origins &&
                origins.map((origin, index) => (
                  <Fragment key={index}>
                    {origin}
                    {index === origins.length - 1 ? "" : ", "}
                  </Fragment>
                ))}
            </p>
          </div>
        </div>

        <PrimaryButton
          type="button"
          size="btn-lg"
          text="Explore Supply Chain"
          rounded={true}
          outlined={false}
          btnBG="fa-btn-green"
          spacingClasses=""
          additionalClass="btn-block is-shadow"
          hasIcon={false}
          icon=""
          reverse={false}
          isLink={true}
          href={`/supply-chain?item=${currentParam}`}
        />
      </div>
    )
  );
};

export default ProductDetailsBottom;
