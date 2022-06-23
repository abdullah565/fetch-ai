import React from "react";
import Header from "../Header/Header";

const SearchPage = () => {
  return (
    <>
      <Header
        isTransparent={false}
        onlyBackBtn={true}
        isBackArrow={true}
        isSearch={true}
      />
    </>
  );
};

export default SearchPage;
