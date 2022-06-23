import React from "react";
import ListingItem from "../ListingItem/ListingItem";
import Drinks from "../../assets/images/drinks.png";
// import Food from "../../assets/images/food.png";
import "./listing.scss";
import { useStoreState } from "easy-peasy";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

const Listing = ({ itemLink }) => {
  const { menuOptionsList } = useStoreState((state) => state.menu);
  const { isAppLoading } = useStoreState((state) => state.loading);

  return (
    <div className="fa-px-24">
      <div className="fa-listing-wrapper">
        {isAppLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          menuOptionsList.map((item, i) => (
            <ListingItem
              link={
                itemLink === "/product-details"
                  ? `${itemLink}?item=${item.id}`
                  : `${itemLink}?name=${item.name}`
              }
              img={Drinks}
              title={item.name}
              key={item.id}
            />
          ))
        )}
        {!isAppLoading && menuOptionsList.length < 1 && (
          <h5 className="fa-no-items-text">
            No items available at the moment!
          </h5>
        )}
      </div>
    </div>
  );
};

export default Listing;
