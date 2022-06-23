import React from "react";
import GoogleMapReact from "google-map-react";
import { FaMapMarker } from "react-icons/fa";
import "./map.scss";
import { useStoreState, useStoreActions } from "easy-peasy";

import "react-lazy-load-image-component/src/effects/blur.css";

const SuppliersMap = () => {
  const { setActiveSupplierData, setCurrentLatLng } = useStoreActions(
    (actions) => actions.suppliers
  );
  const { suppliersData, currentLatLng } = useStoreState(
    (state) => state.suppliers
  );

  const scrollToSupplierCardHandler = (index) => {
    // const supplierCardWidth =
    //   document.querySelector(".fa-suppliers-item").offsetWidth;
    // document.querySelector(".fa-suppliers-list").scrollLeft =
    //   supplierCardWidth * index;

    document.querySelector(`#bullet-${index}`).click();
  };

  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDQhdoLfO3oI0PSadnAhKzSb80nAAS4czU" }}
        center={currentLatLng}
        defaultZoom={5}
        margin={[50, 50, 50, 50]}
        options={{
          fullscreenControl: false,
          zoomControl: false,
        }}
      >
        {suppliersData.map((item, index) => (
          <div
            className={`fa-supplier-marker ${item.isActive ? "activePin" : ""}`}
            lat={item.latitude}
            lng={item.longitude}
            key={item.id}
            // style={{ zIndex: item.isActive ? 10 : -1 }}
            onClick={() => {
              setActiveSupplierData(index);
              setCurrentLatLng({
                lat: Number(item.latitude),
                lng: Number(item.longitude),
              });
              scrollToSupplierCardHandler(index);
            }}
          >
            <FaMapMarker
              size="48px"
              color={item.isActive ? "#f89c26" : "#ffffff"}
            />
            <img width="24px" height="24px" src={item.image_url} alt="" />
          </div>
        ))}
      </GoogleMapReact>
    </>
  );
};

export default SuppliersMap;
