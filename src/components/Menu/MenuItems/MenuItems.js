import React, { useEffect } from "react";
import BottomNav from "../../../shared/BottomNav/BottomNav";
import Header from "../../../shared/Header/Header";

import { useStoreActions, useStoreState } from "easy-peasy";
import ListingItem from "../../../shared/ListingItem/ListingItem";

const MenuItems = () => {
  const { fetchMenuOptionsList } = useStoreActions((actions) => actions.menu);
  const { menuOptionsList, currentVenue } = useStoreState(
    (state) => state.menu
  );
  const { isAppLoading } = useStoreState((state) => state.loading);

  let currentCategoryID = window.location.search.split("=");
  currentCategoryID = currentCategoryID[currentCategoryID.length - 1];

  // let currentHeadTitle = window.location.hash.replace("#", "");
  // currentHeadTitle = currentHeadTitle.replace(/%20/g, " ");

  useEffect(() => {
    if (currentVenue === "" && menuOptionsList.length < 1) {
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
            {menuOptionsList.length > 0 &&
              menuOptionsList[0].menu_item.map(
                (menuItem, index) =>
                  menuItem.menu_category.id === Number(currentCategoryID) && (
                    <ListingItem
                      link={`/product-details?item=${menuItem.id}`}
                      img={menuItem.image_url}
                      title={menuItem.name}
                      key={index}
                      headerTitle={menuItem.menu_category.name}
                    />
                  )
              )}
            {!isAppLoading && menuOptionsList.length < 1 && (
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

export default MenuItems;
