import React from "react";
import { IoChevronBack, IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import SearchField from "../SearchField/SearchField";
import "./header.scss";
import { useStoreState } from "easy-peasy";

const Header = ({
  isTransparent,
  onlyBackBtn,
  isBackArrow,
  isSearch,
  isTitle,
  title,
}) => {
  const navigate = useNavigate();
  const { menuItemList, currentHeaderTitle } = useStoreState(
    (state) => state.menu
  );
  const { isAppLoading } = useStoreState((state) => state.loading);

  return (
    <header className={`fa-header ${isTransparent ? "fa-transparent" : ""}`}>
      <div className="fa-header-content">
        <>
          {isBackArrow && (
            <PrimaryButton
              type="button"
              size="fa-icon-btn-sm"
              text=""
              rounded={true}
              outlined={false}
              btnBG="fa-btn-mid-gray"
              spacingClasses="fa-mr-16"
              additionalClass="fa-icon-btn relative"
              hasIcon={true}
              icon={<IoChevronBack color="#202021" />}
              reverse={false}
              isLink={false}
              onClickHandler={() => navigate(-1)}
            />
          )}
          {isSearch && (
            <>
              <div className="fa-sarch-wrapper">
                <SearchField />
              </div>
              <div className="fa-search-list">
                <ul>
                  {menuItemList.length > 0 &&
                    menuItemList[0].menu_item.map((item, index) => (
                      <li key={index}>
                        <Link to={`/product-details?item=${item.id}`}>
                          {" "}
                          {item.name}
                        </Link>
                      </li>
                    ))}
                </ul>
                {!isAppLoading && menuItemList.length < 1 && (
                  <h5 className="fa-no-items-text">No results found!</h5>
                )}
              </div>
            </>
          )}
          {isTitle && (
            <div className="fa-header-title">
              <h4>{title ? title : "Menu"}</h4>
            </div>
          )}
          {!onlyBackBtn && (
            <>
              <div className="fa-header-title">
                <h4>{currentHeaderTitle ? currentHeaderTitle : "Menu"}</h4>
              </div>
              <div className="fa-header-search-btn">
                <PrimaryButton
                  type="button"
                  size="fa-icon-btn"
                  text=""
                  rounded={true}
                  outlined={false}
                  btnBG="fa-btn-light-gray"
                  spacingClasses=""
                  additionalClass="fa-icon-btn"
                  hasIcon={true}
                  icon={<IoSearchOutline color="#8B8B8B" />}
                  reverse={false}
                  isLink={true}
                  href="/search"
                />
              </div>
            </>
          )}
        </>
      </div>
    </header>
  );
};

export default Header;
