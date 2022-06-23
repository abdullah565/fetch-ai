import React, { useState, useEffect } from "react";
import { Close, Pin } from "../../assets/SVGsImportables/SVGs";
import BottomNav from "../../shared/BottomNav/BottomNav";
import PrimaryButton from "../../shared/Buttons/PrimaryButton/PrimaryButton";
import Header from "../../shared/Header/Header";
import "./supplyChain.scss";
import { useSwipeable } from "react-swipeable";
import SupplyChainMap from "../../shared/SupplyChainMap/SupplyChainMap";
import { Offline } from "react-detect-offline";
import OfflineToaser from "../../shared/OfflineToaser/OfflineToaser";

import { useStoreState, useStoreActions } from "easy-peasy";

const SupplyChain = () => {
  const {
    fetchMenuItemDetails,
    fetchIngredientSupplyChain,
    setActiveIngredientTabData,
    setMapPathEmpty,
    setIsMainIngredientVisible,
    setCurrentIngredientIcon,
  } = useStoreActions((actions) => actions.menu);
  const {
    menuItemDetails,
    ingredientFullSupplyChain,
    ingredientsTabs,
    ingredientMapPathLatLng,
    isMainIngredientVisible,
    currentIngredientsSupplier,
  } = useStoreState((state) => state.menu);

  const [isSupplyChain, setIsSupplyChain] = useState(false);
  const [isOpenedFull, setIsOpenedFull] = useState(false);

  const myRef = React.useRef();

  const refPassthrough = (el) => {
    handlers.ref(el);

    myRef.current = el;
  };
  let currentParam = window.location.search.split("=");
  currentParam = currentParam[currentParam.length - 1];
  useEffect(() => {
    if (currentParam !== "") {
      fetchMenuItemDetails(`/recipe/response_list/${currentParam}`);
    }
    setIsMainIngredientVisible(true);
    // eslint-disable-next-line
  }, []);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      if (isSupplyChain) {
        setIsOpenedFull(true);
      } else {
        if (isMainIngredientVisible) {
          fetchIngredientSupplyChain({
            URL: `/ingredients/supply_chain_response_detail/${ingredientsTabs[0].id}/`,
            supplyChainInfo: {
              origin: ingredientsTabs[0].origin,
              end_use: ingredientsTabs[0].end_use,
              supplier: ingredientsTabs[0].supplier,
              second_origin: ingredientsTabs[0].second_origin,
            },
            isExtendedSupplyChain: ingredientsTabs[0].is_extended_supply_chain,
          });
          setCurrentIngredientIcon(ingredientsTabs[0].icon_url);
          setIsMainIngredientVisible(false);
          setActiveIngredientTabData({
            index: 0,
            toCloseSupplyChain: false,
          });
        }
        setIsSupplyChain(true);
      }
    },
    onSwipedDown: () => {
      if (isOpenedFull) {
        setIsOpenedFull(false);
      } else {
        setIsSupplyChain(false);
      }
    },
  });

  const [supplyChainToggle, setSupplyChainToggle] = useState(true);

  const updateFlightPathHandler = (itemID, index) => {
    if (itemID) {
      fetchIngredientSupplyChain({
        URL: `/ingredients/supply_chain_response_detail/${itemID}/`,
        supplyChainInfo: {
          origin: ingredientsTabs[index].origin,
          end_use: ingredientsTabs[index].end_use,
          supplier: ingredientsTabs[index].supplier,
          second_origin: ingredientsTabs[index].second_origin,
        },
        isExtendedSupplyChain: ingredientsTabs[index].is_extended_supply_chain,
      });
    }
    setIsSupplyChain(true);
    setActiveIngredientTabData({
      index: index,
      toCloseSupplyChain: false,
    });
    setIsMainIngredientVisible(false);
    // const updatedLatLng = {
    //   lat: ingredientMapPathLatLng.length > 0 && ingredientMapPathLatLng[0].lat,
    //   lng: ingredientMapPathLatLng.length > 0 && ingredientMapPathLatLng[0].lng,
    // };
    // setCurrentLatLng(updatedLatLng);
  };

  useEffect(() => {
    setSupplyChainToggle(false);

    setTimeout(() => {
      setSupplyChainToggle(true);
    }, 10);
  }, [ingredientMapPathLatLng]);

  return (
    <>
      <Header onlyBackBtn={true} isTransparent={true} isBackArrow={true} />
      <main
        className={`fa-supplychain-global ${
          isSupplyChain ? "fa-supplychian-half" : ""
        } ${isOpenedFull ? "fa-supplychian-full" : ""}`}
      >
        <Offline>
          <OfflineToaser />
        </Offline>
        <div className="fa-map-wrapper">
          {supplyChainToggle && menuItemDetails.length > 0 && (
            <SupplyChainMap
              isSupplyChainMap={true}
              flightPathHandler={updateFlightPathHandler}
            />
          )}
        </div>
        <div className={`fa-supplychain-wrapper`}>
          <div {...handlers} ref={refPassthrough}>
            <div className="fa-gray-bar"></div>
            {isOpenedFull && (
              <button
                className="fa-supply-close-btn"
                onClick={() => {
                  setIsOpenedFull(false);
                  setActiveIngredientTabData({
                    index: 0,
                    toCloseSupplyChain: true,
                  });
                  setIsMainIngredientVisible(true);
                  setIsSupplyChain(false);
                  setMapPathEmpty();
                }}
              >
                <Close color="#202021" />
              </button>
            )}
            {menuItemDetails.length > 0 && (
              <>
                <h2>{menuItemDetails[0].menu_item.name}</h2>
                <span className="fa-footprint">
                  CO<sub>2</sub> Footprint (kgCO<sub>2</sub>e) -
                  <strong> {menuItemDetails[0].footprint.toFixed(2)}</strong>
                </span>
                {/* <p className="fa-supplychain-desc">
                  {menuItemDetails[0].menu_item.description}
                </p> */}
              </>
            )}
          </div>
          <div className="fa-supply-chain-tabs">
            <ul>
              {ingredientsTabs.length > 0 &&
                ingredientsTabs.map((item, index) => (
                  <li
                    className={item.activeTab ? "active" : ""}
                    onClick={() => {
                      if (item.activeTab) {
                        setIsSupplyChain(false);
                        setIsOpenedFull(false);
                        setActiveIngredientTabData({
                          index: index,
                          toCloseSupplyChain: true,
                        });
                        setIsMainIngredientVisible(true);
                        setMapPathEmpty();
                      } else {
                        setCurrentIngredientIcon(item.icon_url);

                        fetchIngredientSupplyChain({
                          URL: `/ingredients/supply_chain_response_detail/${item.id}/`,
                          supplyChainInfo: {
                            origin: item.origin,
                            end_use: item.end_use,
                            supplier: item.supplier,
                            second_origin: item.second_origin,
                          },
                          isExtendedSupplyChain: item.is_extended_supply_chain,
                        });
                        setIsMainIngredientVisible(false);
                        setActiveIngredientTabData({
                          index: index,
                          toCloseSupplyChain: false,
                        });
                        setIsSupplyChain(true);
                      }
                    }}
                    key={item.id}
                  >
                    <span>{item.name}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="fa-supplychain-content">
            <ul>
              {ingredientFullSupplyChain.length > 0 &&
                ingredientFullSupplyChain.map((item, index) => (
                  <li key={index}>
                    <span>
                      <Pin color="#01829b" />
                    </span>
                    <h5>{item.name}</h5>
                    <p>{item.desc}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <PrimaryButton
          type="button"
          size="btn-lg"
          text="Explore Sustainability"
          rounded={true}
          outlined={false}
          btnBG="fa-btn-green"
          spacingClasses=""
          additionalClass={`btn-block is-shadow ${
            isMainIngredientVisible ? "isDisabled" : ""
          }`}
          hasIcon={false}
          icon=""
          reverse={false}
          isLink={true}
          href={`/sustainability?supplier=${currentIngredientsSupplier}`}
        />
        <BottomNav activeTab="Sustainability" />
      </main>
    </>
  );
};

export default SupplyChain;
