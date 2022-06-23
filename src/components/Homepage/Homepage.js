import React, { useEffect } from "react";
import "./homepage.scss";
import SplashBG from "../../assets/images/splash.svg";
// import Chef from "../../assets/images/liquid-chef.svg";
import Chef from "../../assets/images/liquid-chef.png";
// import Logo from "../../assets/images/logo.svg";
// import Logo from "../../assets/images/fetchai_logo.webp";
import Logo from "../../assets/images/Fetch logo_White.png";
// import Logo from "../../assets/images/logo_fetchai.png";
import PrimaryButton from "../../shared/Buttons/PrimaryButton/PrimaryButton";

import { useStoreActions, useStoreState } from "easy-peasy";

const Homepage = () => {
  const { fetchMainImage } = useStoreActions((actions) => actions.menu);
  const { homepageImage } = useStoreState((state) => state.menu);
  const { isAppLoading } = useStoreState((state) => state.loading);

  const venueParam = window.location.search
    .split("&")
    .filter((item) => item.includes("venue"));

  useEffect(() => {
    if (venueParam) {
      fetchMainImage(`/venue_image${venueParam}`);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="fa-splash-wrapper">
      <div className="fa-splash-content">
        {!isAppLoading && (
          <img src={homepageImage ? homepageImage : SplashBG} alt="Fetch ai" />
        )}

        <div className="homepage-bg-image">
          <div className="fa-splash-head">
            <img src={Chef} alt="Liquid chef" />
            <img src={Logo} alt="Fetch ai Logo" />
          </div>
          <div className="fa-splash-text">
            <h1 className="fa-mb-24">Sustainability Made Easy</h1>
            <p>Welcome to the future of sustainable supply chains</p>
          </div>
          <div className="fa-splash-btns">
            <PrimaryButton
              type="button"
              size="btn-lg"
              text="Explore Menu"
              rounded={true}
              outlined={false}
              btnBG="fa-btn-white"
              spacingClasses="fa-mb-16"
              additionalClass="btn-block"
              hasIcon={false}
              reverse={false}
              isLink={true}
              href={`/menu-options`}
            />
            <PrimaryButton
              type="button"
              size="btn-lg"
              text="Explore Sustainability"
              rounded={true}
              outlined={false}
              btnBG="fa-btn-blue"
              spacingClasses="fa-mb-16"
              additionalClass="btn-block"
              hasIcon={false}
              reverse={false}
              isLink={true}
              href="/suppliers"
            />
            <PrimaryButton
              type="button"
              size="btn-lg"
              text="Explore Technology"
              rounded={true}
              outlined={false}
              btnBG="fa-btn-green"
              spacingClasses=""
              additionalClass="btn-block"
              hasIcon={false}
              reverse={false}
              isLink={true}
              href="/tech-screens"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
