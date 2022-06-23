import React from "react";
import GoogleMapReact from "google-map-react";
import "../SuppliersMap/map.scss";

import { useStoreActions, useStoreState } from "easy-peasy";

const SupplyChainMap = ({ flightPathHandler }) => {
  const {
    menuItemDetails,
    ingredientMapPathLatLng,
    ingredientMapPathLatLngSecond_origin,
    isMainIngredientVisible,
    currentIngredientIcon,
    ingredientMarkersPaths,
  } = useStoreState((state) => state.menu);
  const { setCurrentIngredientIcon } = useStoreActions(
    (actions) => actions.menu
  );

  const coordinates = {
    lat:
      ingredientMapPathLatLng.length > 0
        ? ingredientMapPathLatLng[0].lat
        : Number(menuItemDetails[0].ingredients[0].origin.latitude),
    lng:
      ingredientMapPathLatLng.length > 0
        ? ingredientMapPathLatLng[0].lng
        : Number(menuItemDetails[0].ingredients[0].origin.longitude),
  };

  const handleGoogleMapApi = (google) => {
    if (ingredientMapPathLatLngSecond_origin.length > 0) {
      var flightPath0 = new google.maps.Polyline({
        path: ingredientMapPathLatLngSecond_origin,
        geodesic: true,
        strokeColor: "#F89C26",
        strokeOpacity: 1,
        strokeWeight: 3,
      });
      flightPath0.setMap(google.map);
    }

    var flightPath = new google.maps.Polyline({
      path: ingredientMapPathLatLng,
      geodesic: true,
      strokeColor: "#F89C26",
      strokeOpacity: 1,
      strokeWeight: 3,
    });

    flightPath.setMap(google.map);
  };

  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDQhdoLfO3oI0PSadnAhKzSb80nAAS4czU" }}
        center={coordinates}
        defaultZoom={5}
        minZoom={5}
        margin={[50, 50, 50, 50]}
        options={{
          fullscreenControl: false,
          zoomControl: false,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={!isMainIngredientVisible && handleGoogleMapApi}
      >
        {menuItemDetails.length > 0 && isMainIngredientVisible
          ? menuItemDetails[0].ingredients.map((item, index) => {
              return (
                <div
                  className={`fa-supplychain-marker clickable`}
                  lat={Number(item.origin.latitude)}
                  lng={Number(item.origin.longitude)}
                  key={item.id}
                  onClick={() => {
                    setCurrentIngredientIcon(item.icon_url);
                    flightPathHandler(item.id, index);
                  }}
                >
                  <img src={item.icon_url} alt="" />
                </div>
              );
            })
          : ingredientMarkersPaths.map((item, index) => (
              <div
                className="fa-supplychain-marker"
                lat={item.lat}
                lng={item.lng}
                key={index}
              >
                <img src={currentIngredientIcon} alt="" />
              </div>
            ))}
      </GoogleMapReact>
    </>
  );
};

export default SupplyChainMap;
