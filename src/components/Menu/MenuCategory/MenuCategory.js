import React, { useEffect } from "react";
import BottomNav from "../../../shared/BottomNav/BottomNav";
import Header from "../../../shared/Header/Header";

import { useStoreActions, useStoreState } from "easy-peasy";
import ListingItem from "../../../shared/ListingItem/ListingItem";

const MenuCategory = () => {
  const { fetchMenuOptionsList } = useStoreActions((actions) => actions.menu);
  const { isAppLoading } = useStoreState((state) => state.loading);
  const { filteredMenuCategoriesList, currentVenue } = useStoreState(
    (state) => state.menu
  );

  // let currentHeadTitle = window.location.hash.replace("#", "");
  // currentHeadTitle = currentHeadTitle.replace(/%20/g, " ");

  let currentOptionID = window.location.search.split("=");
  currentOptionID = currentOptionID[currentOptionID.length - 1];

  useEffect(() => {
    if (currentVenue === "" && filteredMenuCategoriesList.length < 1) {
      const getVenuFromLocalStorage = localStorage.getItem("Venue");
      fetchMenuOptionsList(
        `/venue_menu_response_list?${getVenuFromLocalStorage}`
      );
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header
        isTransparent={false}
        onlyBackBtn={false}
        isBackArrow={true}
        isTitle={false}
        title=""
      />
      <main className="fa-mt-80 fa-pb-230 fa-menu-global-wrapper">
        <div className="fa-px-24">
          <div className="fa-listing-wrapper">
            {filteredMenuCategoriesList.length > 0 &&
              filteredMenuCategoriesList.map(
                (menuCategory, index) =>
                  menuCategory.menu_options.id === Number(currentOptionID) && (
                    <ListingItem
                      link={`/menu-items?item=${menuCategory.id}`}
                      img={menuCategory.image_url}
                      title={menuCategory.name}
                      key={index}
                      headerTitle={menuCategory.menu_options.name}
                    />
                  )
              )}
            {!isAppLoading && filteredMenuCategoriesList.length < 1 && (
              <h5 className="fa-no-items-text">
                No items available at the moment!
              </h5>
            )}
          </div>
        </div>
      </main>
      <BottomNav activeTab="menu" />
    </>
  );
};

export default MenuCategory;
