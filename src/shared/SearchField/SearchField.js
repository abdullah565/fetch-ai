import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useStoreActions, useStoreState } from "easy-peasy";

const SearchField = () => {
  const { fetchMenuItemList, setMenuItemList } = useStoreActions(
    (actions) => actions.menu
  );
  const { menuItemList, currentVenue } = useStoreState((state) => state.menu);

  const [queryString, setQueryString] = React.useState("");
  const [isQueryString, setIsQueryString] = React.useState(false);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isQueryString) {
        fetchItemsHandler();
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line
  }, [queryString]);

  React.useEffect(() => {
    if (menuItemList.length > 0) {
      setMenuItemList([]);
    }

    // eslint-disable-next-line
  }, []);

  const fetchItemsHandler = () => {
    setMenuItemList([]);
    if (queryString.trim() !== "") {
      fetchMenuItemList(
        `search_menu_item?${currentVenue}&search_name=${queryString}`
      );
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search Food, drinks, food items"
        autoFocus
        value={queryString}
        onChange={(e) => {
          setIsQueryString(true);
          setQueryString(e.target.value);
        }}
      />
      <span>
        <IoSearchOutline color=" #F89C26" />
      </span>
    </>
  );
};

export default SearchField;
