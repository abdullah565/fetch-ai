import React, { Fragment, useState, useEffect } from "react";
import Header from "../../shared/Header/Header";
import "./sustainability.scss";
import PrimaryButton from "../../shared/Buttons/PrimaryButton/PrimaryButton";
import BottomNav from "../../shared/BottomNav/BottomNav";
import { useStoreActions, useStoreState } from "easy-peasy";
import ReactHtmlParser from "react-html-parser";

const Sustainability = () => {
  const { singleSupplierData, sustainabilityTabsData } = useStoreState(
    (state) => state.suppliers
  );
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const { fetchSingleSupplier, setSuppliersTabs } = useStoreActions(
    (actions) => actions.suppliers
  );

  let currentSupplierID = window.location.search.split("=");
  currentSupplierID = currentSupplierID[currentSupplierID.length - 1];

  useEffect(() => {
    if (currentSupplierID) {
      fetchSingleSupplier(
        `/ingredients/supplier_response_detail/${currentSupplierID}`
      );
    }
    setSuppliersTabs(0);

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header
        isTransparent={false}
        onlyBackBtn={true}
        isBackArrow={true}
        isTitle={true}
        title={singleSupplierData.name}
      />
      <main
        style={{
          paddingTop:
            document.querySelector(".fa-header") &&
            document.querySelector(".fa-header").offsetHeight,
        }}
        className="fa-pt-80 fa-pb-120 fa-px-24 fa-menu-global-wrapper"
      >
        <div className="fa-sustainability-bio">
          <div className="fa-sustainability-bio-short">
            {ReactHtmlParser(singleSupplierData.bio)}
          </div>
          {/* {singleSupplierData.info_url && (
              <a
                className="fa-sustainability-bio-link"
                href={singleSupplierData.info_url}
              >
                {singleSupplierData.info_url}
              </a>
            )} */}

          <img src={singleSupplierData.image_url} alt="logo" />
        </div>
        {singleSupplierData.certificates && (
          <div className="fa-sustainability-certificates">
            {singleSupplierData.certificates.length > 0 && <p>Certificates </p>}
            {singleSupplierData.certificates.length > 0 && (
              <ul>
                {singleSupplierData.certificates.map((item, index) => (
                  <li key={index}>
                    <img src={item.image_url} alt="Certificates" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="fa-sustainability-tabs">
          <span
            style={{
              left: `${currentTabIndex * 33.33}%`,
            }}
          ></span>
          <ul>
            {sustainabilityTabsData.map((item, index) => (
              <li
                className={item.isActive ? "active" : ""}
                onClick={() => {
                  setCurrentTabIndex(index);
                  setSuppliersTabs(index);
                }}
                key={item.id}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="fa-tabs-details">
          <div>
            {sustainabilityTabsData.map((item) => (
              <Fragment key={item.id}>
                {item.isActive && ReactHtmlParser(item.desc)}
              </Fragment>
            ))}
          </div>
        </div>
        <PrimaryButton
          type="button"
          size="btn-lg"
          text="Explore Technology"
          rounded={true}
          outlined={false}
          btnBG="fa-btn-green"
          spacingClasses="fa-mt-16"
          additionalClass="btn-block is-shadow"
          hasIcon={false}
          icon=""
          reverse={false}
          isLink={true}
          href="/tech-screens"
        />
        <BottomNav activeTab="Sustainability" />
      </main>
    </>
  );
};

export default Sustainability;
