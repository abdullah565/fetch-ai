import React, { useEffect } from "react";
import { Pin } from "../../assets/SVGsImportables/SVGs";
import Header from "../../shared/Header/Header";
import "./suppliers.scss";
import { Link } from "react-router-dom";
import BottomNav from "../../shared/BottomNav/BottomNav";
import SuppliersMap from "../../shared/SuppliersMap/SuppliersMap";
import { Offline } from "react-detect-offline";
import OfflineToaser from "../../shared/OfflineToaser/OfflineToaser";

import { useStoreActions, useStoreState } from "easy-peasy";
import SkeletonCard from "../../shared/SkeletonCard/SkeletonCard";

import "react-lazy-load-image-component/src/effects/blur.css";

// Core modules imports are same as usual
import { Navigation, Pagination } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

// Styles must use direct files imports
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module

const Suppliers = () => {
  const { fetchSuppliers, setActiveSupplierData, setCurrentLatLng } =
    useStoreActions((actions) => actions.suppliers);
  const { suppliersData } = useStoreState((state) => state.suppliers);
  const { isAppLoading } = useStoreState((state) => state.loading);

  useEffect(() => {
    fetchSuppliers(`/ingredients/supplier_response_list`);

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header onlyBackBtn={true} isTransparent={true} isBackArrow={true} />
      <main>
        <Offline>
          <OfflineToaser />
        </Offline>
        <div className="fa-supplier-map-wrapper">
          <SuppliersMap />
        </div>
        <div className="fa-suppliers-wrapper">
          <div className="fa-suppliers-content">
            <h2>Suppliers</h2>
            <p>
              Explore the suppliers and the impact they brining to food and
              sustainability through their supply chain
            </p>

            <Swiper
              spaceBetween={16}
              hashNavigation={{
                watchState: true,
              }}
              pagination={{
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
                renderBullet: (index, className) => {
                  return `<span class=${className} id=bullet-${index}>${index}</span>`;
                },
              }}
              slidesPerView={1.5}
              navigation={false}
              modules={[Pagination, Navigation]}
              className="fa-suppliers-list"
            >
              {isAppLoading ? (
                <>
                  <SwiperSlide>
                    <SkeletonCard />
                  </SwiperSlide>
                  <SwiperSlide>
                    <SkeletonCard />
                  </SwiperSlide>
                </>
              ) : (
                suppliersData.map((item, index) => (
                  <SwiperSlide
                    className={`fa-suppliers-slide ${
                      item.isActive ? "active" : ""
                    }`}
                    key={item.id}
                    data-hash={`slide${index}`}
                  >
                    <div
                      id={`card-${index}`}
                      className={`fa-suppliers-item`}
                      onClick={() => {
                        setActiveSupplierData(index);
                        setCurrentLatLng({
                          lat: Number(item.latitude),
                          lng: Number(item.longitude),
                        });
                        document.querySelector(`#bullet-${index}`).click();
                      }}
                    >
                      <Pin color="#01829B" />
                      <h5>{item.name}</h5>
                      <p>{item.location}</p>
                      <div className="fa-suppliers-logo-link">
                        <img
                          width="36px"
                          src={item.image_url}
                          alt="supplier Logo"
                          effect="blur"
                        />
                        <Link to={`/sustainability?supplier=${item.id}`}>
                          Explore Sustainability
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
            <div className="swiper-pagination-wrapper">
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
        <BottomNav activeTab="Sustainability" />
      </main>
    </>
  );
};

export default Suppliers;
