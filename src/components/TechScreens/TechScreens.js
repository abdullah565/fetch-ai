import React, { useState } from "react";
import "./techScreen.scss";

// Core modules imports are same as usual
import { Navigation, Pagination } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

// Styles must use direct files imports
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module
import Header from "../../shared/Header/Header";

import slide1 from "../../assets/images/tech-screens/slide-1.png";
import slide2 from "../../assets/images/tech-screens/slide-2.png";
import slide3 from "../../assets/images/tech-screens/slide-3.png";
import slide4 from "../../assets/images/tech-screens/slide-4.png";

import { RightArrow } from "../../assets/SVGsImportables/SVGs";

const TechScreens = () => {
  const techScreensData = [
    {
      id: 0,
      img: slide1,
      title: "Fetch.ai",
      desc: "Fetch.ai technology transfers supply chains to the metaverse. Fetch.ai solutions build upon blockchain and AI technology to provide greater trust, transparency and sustainable supply chains.",
    },
    {
      id: 1,
      img: slide2,
      title: "Digital Twins",
      desc: "Each component of the supply chain has its own agent - what we call ‘digital twins.’ When your commands are selected, your digital twin does the work for you.",
    },
    {
      id: 2,
      img: slide3,
      title: "Negotiations",
      desc: "Agents can negotiate with one another, collect sustainability data (e.g. CO2, product origin, quality), and track and verify the entire supply chain autonomously without human intervention.",
    },
    {
      id: 3,
      img: slide4,
      title: "More",
      desc: "Check out our website for more information on Fetch.ai",
    },
  ];
  const [reachEnd, setReachEnd] = useState(false);

  const visitFetchBtnHandler = (swiper) => {
    if (swiper.activeIndex === techScreensData.length - 1) {
      setReachEnd(true);
    } else {
      setReachEnd(false);
    }
  };

  return (
    <>
      <Header isTransparent={false} onlyBackBtn={true} isBackArrow={true} />
      <main className="fa-pt-60" id="fa-tech-screens-wrapper">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: ".prev",
            nextEl: ".next",
          }}
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={(swiper) => visitFetchBtnHandler(swiper)}
        >
          {techScreensData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="fa-tech-screen-content">
                <div className="fa-tech-screen-img">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="fa-tech-screen-text">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="prev"></div>

        {reachEnd ? (
          <div className="fa-px-24">
            <a
              id="fa-btn"
              href="https://fetch.ai/"
              className="fa-btn-link btn d-inline-flex align-items-center btn-block is-shadow btn-lg fa-btn-green fa-btn-rounded"
            >
              Visit Fetch.ai
            </a>
          </div>
        ) : (
          <div className="fa-tech-screens-next-btn">
            <div className="next">
              <span>Explore More</span>
              <span>
                <RightArrow color="#64A32C" />
              </span>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default TechScreens;
