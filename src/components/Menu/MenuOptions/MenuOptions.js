import React, { useEffect } from "react";
import BottomNav from "../../../shared/BottomNav/BottomNav";
import Header from "../../../shared/Header/Header";

import { useStoreActions, useStoreState } from "easy-peasy";
import ListingItem from "../../../shared/ListingItem/ListingItem";

const MenuOptions = () => {
  const { fetchMenuOptionsList } = useStoreActions((actions) => actions.menu);
  const { isAppLoading } = useStoreState((state) => state.loading);
  const { filteredMenuOptionsList, currentVenue, menuOptionsList } =
    useStoreState((state) => state.menu);

  useEffect(() => {
    if (currentVenue === "" || menuOptionsList.length < 1) {
      const getVenuFromLocalStorage = localStorage.getItem("Venue");
      fetchMenuOptionsList(
        `/venue_menu_response_list?${getVenuFromLocalStorage}`
      );
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header
        isTransparent={false}
        onlyBackBtn={false}
        isBackArrow={false}
        isTitle={false}
        title="Menu"
      />
      <main className="fa-mt-80 fa-pb-230 fa-menu-global-wrapper">
        <div className="fa-px-24">
          <div className="fa-listing-wrapper">
            {filteredMenuOptionsList.length > 0 &&
              filteredMenuOptionsList.map((menuOptions, index) => (
                <ListingItem
                  link={`/menu-category?category=${menuOptions.id}`}
                  img={menuOptions.image_url}
                  title={menuOptions.name}
                  key={index}
                />
              ))}
            {!isAppLoading && filteredMenuOptionsList.length < 1 && (
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

export default MenuOptions;
