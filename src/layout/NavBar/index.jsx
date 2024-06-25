import { useState } from "react";
import {
  logoImg,
  mapPinIcon,
  WishlistIcon,
  cartIcon,

} from "../../assets/images/imageUrls";

import "./styles/style.scss"
import CategoryModal from "./Sections/categoryModal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUer } from "../../store/thunkFuctions";
const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const routes = [
    { to: "/login", name: "login", auth: false },
    { to: "/register", name: "register", auth: false },
    { to: "", name: "logout", auth: true },
  ];
  const isAuth = useSelector(state => state.user?.isAuth)
  const handleLogout = () => {
    dispatch(logoutUer())
    navigate("/")
  }

  return (
    <>
      <div className="NavBarSection">
        <div className="NavBarContainer">
          <div className="NavAuthItems">
            {routes.map(({to,name,auth}) => {
              if(isAuth !== auth) return null
              if(name === "logout"){
                return <span key={name} className="registerBtn">
                  <Link
                    className="linkBtn"
                    onClick={handleLogout}
                  >
                          {name}
                      </Link></span>
                } else {
                return <span key={name} className="registerBtn">
                  <Link to={to} >
                    {name} |
                  </Link>
                  </span>
                }
              })
            }
            <span>|</span>
            <span className="customerService">고객센터 ▼</span>
          </div>

          <div className="NavMain">
            <div className="NavHeader">
              <img src={logoImg} className="logoImg" />
              <div className="NavTitleMarketKurly">마켓컬리</div>

              <div className="NavTitleBeautyKurly">뷰티컬리</div>
            </div>

            <div className="NavSearch">
              <input
                type="text"
                className="SearchBox"
                placeholder="검색어를 입력해주세요"
              />
              <button className="magnifyingGlassIcon"></button>
            </div>

            <div className="NavIcons">
              <img src={mapPinIcon} alt="" />
              <img src={WishlistIcon} alt="" />
              <img src={cartIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="NavCategoryItems">
          <div
            className="categorySection"
            onMouseEnter={() => setIsCategoryModal(true)}
            onMouseLeave={() => setIsCategoryModal(false)}
          >
            <span className="categoryImg"></span>
            <span className="categoryText">카테고리</span>
          </div>
          <div className="categoryLinks">
            <p>신상품</p>
            <p>베스트</p>
            <p>알뜰쇼핑</p>
            <p>특가/혜택</p>
          </div>
          <div className="SpecialCategory">
            <span className="SpecialCategoryText">샛별·하루</span> 배송안내
          </div>
        </div>

        {isCategoryModal && (
          <div
            className="categoryModal"
            onMouseEnter={() => setIsCategoryModal(true)}
            onMouseLeave={() => setIsCategoryModal(false)}
          >
            <CategoryModal />
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar