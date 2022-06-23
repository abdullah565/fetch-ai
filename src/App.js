import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import MenuOptions from "./components/Menu/MenuOptions/MenuOptions";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Suppliers from "./components/Suppliers/Suppliers";
import SupplyChain from "./components/SupplyChain/SupplyChain";
import Sustainability from "./components/Sustainability/Sustainability";
import TechScreens from "./components/TechScreens/TechScreens";
import SearchPage from "./shared/SearchPage/SearchPage";
import { useStoreState, useStoreActions } from "easy-peasy";
import AppLoader from "./shared/AppLoader/AppLoader";
import AppNotification from "./shared/AppNotification/AppNotification";
import MenuCategory from "./components/Menu/MenuCategory/MenuCategory";
import MenuItems from "./components/Menu/MenuItems/MenuItems";

const App = () => {
  const { isAppLoading } = useStoreState((state) => state.loading);
  const { setCurrentVenue } = useStoreActions((actions) => actions.menu);
  const { isNotifier } = useStoreState((state) => state.notification);

  const getCurrentPath = window.location.pathname;

  useEffect(() => {
    if (window.location.pathname === "/supply-chain") {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }, [getCurrentPath]);

  // getting & setting the venue
  useEffect(() => {
    let getInitialVenue = window.location.search.replace("?", "");
    getInitialVenue = getInitialVenue.replace(/%20/g, " ");
    const checkVenueFromLS = localStorage.getItem("Venue");

    if (window.location.pathname === "/") {
      if (
        (checkVenueFromLS === null && getInitialVenue.includes("venue")) ===
          true ||
        (checkVenueFromLS !== null && getInitialVenue.includes("venue")) ===
          true
      ) {
        localStorage.setItem("Venue", getInitialVenue);
        setCurrentVenue(getInitialVenue);
      }
    } else {
      setCurrentVenue(checkVenueFromLS);
    }
  }, []);

  return (
    <>
      {isAppLoading && <AppLoader />}
      {isNotifier && <AppNotification />}

      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route exact path="/menu-options" element={<MenuOptions />}></Route>
        <Route exact path="/menu-category" element={<MenuCategory />}></Route>
        <Route exact path="/menu-items" element={<MenuItems />}></Route>
        <Route
          exact
          path="/product-details"
          element={<ProductDetails />}
        ></Route>
        <Route exact path="/tech-screens" element={<TechScreens />}></Route>
        <Route exact path="/search" element={<SearchPage />}></Route>
        <Route
          exact
          path="/sustainability"
          element={<Sustainability />}
        ></Route>
        <Route exact path="/suppliers" element={<Suppliers />}></Route>
        <Route exact path="/supply-chain" element={<SupplyChain />}></Route>
      </Routes>
    </>
  );
};

export default App;
