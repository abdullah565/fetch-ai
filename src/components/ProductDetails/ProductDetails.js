import React, { useEffect } from "react";
import BottomNav from "../../shared/BottomNav/BottomNav";
import Header from "../../shared/Header/Header";
import ProductDetailsBottom from "./ProductDetailsBottom/ProductDetailsBottom";
import ProductDetailsUpper from "./ProductDetailsUpper/ProductDetailsUpper";

import { useStoreActions, useStoreState } from "easy-peasy";

const ProductDetails = () => {
  const { fetchMenuItemDetails } = useStoreActions((actions) => actions.menu);
  const { menuItemDetails } = useStoreState((state) => state.menu);
  const { isAppLoading } = useStoreState((state) => state.loading);

  let currentParam = window.location.search.split("=");
  currentParam = currentParam[currentParam.length - 1];

  useEffect(() => {
    if (currentParam !== "") {
      fetchMenuItemDetails(`/recipe/response_list/${currentParam}`);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header isTransparent={true} onlyBackBtn={true} isBackArrow={true} />
      <main className="fa-pb-80">
        <ProductDetailsUpper />
        <ProductDetailsBottom currentParam={currentParam} />
        {!isAppLoading && menuItemDetails.length < 1 && (
          <h5 className="fa-no-items-text">No Data found!</h5>
        )}
      </main>
      <BottomNav activeTab="menu" />
    </>
  );
};

export default ProductDetails;
